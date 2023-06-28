import {
  AuthorizationError,
  createOperation,
  z,
} from "../generated/wundergraph.factory";

export default createOperation.query({
  handler: async ({ operations, clientRequest, context }) => {
    const { accessToken } = await context.getTokenFromRequest(clientRequest);

    if (!accessToken) {
      throw new AuthorizationError();
    }

    const { data } = await operations
      .withHeaders({
        "X-Github-Token": `Bearer ${accessToken}`, // we post on the user's behalf.
      })
      .query({
        operationName: "internal/Viewer",
      });

    return data;
  },
});
