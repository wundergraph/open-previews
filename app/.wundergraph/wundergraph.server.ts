import {
  ClientRequest,
  configureWunderGraphServer,
} from "@wundergraph/sdk/server";
import { encodeUserToken, verifyToken } from "./lib/tokens";
import { AuthorizationError, User } from "@wundergraph/sdk/client";

class RequestContext {
  getTokenFromUser = async (user?: User) => {
    if (!user?.customClaims?.token) {
      throw new AuthorizationError();
    }
    return await verifyToken(user.customClaims?.token, true); // we refresh it
  };
  getTokenFromRequest = async (clientRequest: ClientRequest) => {
    const token = clientRequest.headers.get("x-session-token");
    if (!token) {
      throw new AuthorizationError();
    }
    return await verifyToken(token);
  };
}

export default configureWunderGraphServer(() => ({
  hooks: {
    authentication: {
      mutatingPostAuthentication: async ({ user }) => {
        const token = await encodeUserToken(user);
        return {
          user: {
            ...user,
            customClaims: {
              token,
            },
          },
          headers: {
            "x-session-token": token,
          },
          status: "ok",
        };
      },
      // we don't use this at the moment.
      revalidate: async ({ user }) => {
        try {
          const token = await verifyToken(user.customClaims?.token, true); // we refresh it
          return {
            status: "ok",
            user: {
              ...user,
              customClaims: {
                ...user.customClaims,
                token,
              },
            },
          };
        } catch (e) {
          return {
            status: "deny",
            message: "Token is invalid",
          };
        }
      },
    },
  },
  queries: {},
  mutations: {},
  context: {
    request: {
      create: async () => new RequestContext(),
    },
  },
}));
