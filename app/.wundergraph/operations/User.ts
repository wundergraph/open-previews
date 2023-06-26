import { createOperation } from "../generated/wundergraph.factory";

/**
 * Returns the user claims if the token is valid.
 */
export default createOperation.query({
  handler: async ({ clientRequest, context }) => {
    try {
      const { name, email, profilePicture } = await context.getTokenFromRequest(
        clientRequest
      );
      return {
        name,
        email,
        profilePicture,
      };
    } catch (e) {
      console.error(e);
    }

    return null;
  },
});
