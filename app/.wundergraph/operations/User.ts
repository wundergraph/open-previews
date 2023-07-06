import { createOperation } from "../generated/wundergraph.factory";

/**
 * Returns the user claims if the token is valid.
 */
export default createOperation.query({
  handler: async ({ clientRequest, context }) => {
    try {
      const { username, name, email, avatar } =
        await context.getTokenFromRequest(clientRequest);
      return {
        username,
        name,
        email,
        avatar,
      };
    } catch (e) {
      console.error(e);
    }

    return null;
  },
});
