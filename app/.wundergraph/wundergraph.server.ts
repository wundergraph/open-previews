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
    return await verifyToken(user.customClaims?.token);
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
        console.log("mutatingPostAuthentication", user, token);
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
