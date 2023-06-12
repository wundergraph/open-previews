import { createOperation, z } from "../../generated/wundergraph.factory";

export default createOperation.query({
  input: z.object({
    url: z.string(),
    repository: z.string(),
  }),
  handler: async ({ input, clientRequest, operations, context }) => {
    const accessToken = await context.getTokenFromRequest(clientRequest);

    const result = await operations
      .withHeaders({
        Authorization: `Bearer ${accessToken}`,
      })
      .query({
        operationName: "internal/Search",
        input: {
          query: `${input.url} in:title repo:${input.repository}`,
        },
      });

    return result.data?.search?.nodes?.[0];
  },
});
