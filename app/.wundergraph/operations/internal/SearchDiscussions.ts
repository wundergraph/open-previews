import { createOperation, z } from "../../generated/wundergraph.factory";

export default createOperation.query({
  input: z.object({
    url: z.string(),
    repository: z.string(),
  }),
  handler: async ({ input, operations }) => {
    const result = await operations
      .withHeaders({
        "X-Github-Token": `Bearer ${process.env.GITHUB_TOKEN}`,
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
