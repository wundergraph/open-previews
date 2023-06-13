import { createOperation } from "../generated/wundergraph.factory";

export default createOperation.query({
  handler: async ({ clientRequest, context }) => {
    try {
      const { name, email } = await context.getTokenFromRequest(clientRequest);
      return {
        name,
        email,
      };
    } catch (e) {
      console.error(e);
    }

    return null;
  },
});
