import { createOperation } from "../generated/wundergraph.factory";

export default createOperation.query({
  handler: async ({ user }) => {
    return user?.customClaims?.token;
  },
});
