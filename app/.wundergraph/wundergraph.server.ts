import { configureWunderGraphServer } from "@wundergraph/sdk/server";
import { encodeUserToken, decodeUserToken } from "./lib/tokens";
import { User } from "@wundergraph/sdk/client";

class RequestContext {
  getToken = async (user?: User) => {
    console.log("getToken", user?.customClaims?.token);
    return user && (await decodeUserToken(user?.customClaims?.token));
  };
}

export default configureWunderGraphServer<RequestContext>(() => ({
  hooks: {
    authentication: {
      mutatingPostAuthentication: async ({ user }) => {
        console.log("mutatingPostAuthentication", user);
        return {
          user: {
            ...user,
            customClaims: {
              token: await encodeUserToken(user),
            },
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
