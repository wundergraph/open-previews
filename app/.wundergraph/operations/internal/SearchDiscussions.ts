import { createOperation, z } from "../../generated/wundergraph.factory";

export default createOperation.query({
  input: z.object({
    url: z.string(),
    repo: z.string(),
  }),
  handler: async ({ input, graph, operations, user, context }) => {
    const accessToken = await context.getToken(user);

    // we can't use the ORM here since we need to select unions on sub fields.
    // const result = await graph
    //   .withHeaders({
    //     Authorization: `Bearer ${accessToken}`,
    //   })
    //   .from("github")
    //   .query("search")
    //   .where({
    //     type: "DISCUSSION",
    //     query: `test in:title repo:${input.repo}}`,
    //     first: 0,
    //   })
    //   // .select("discussionCount")
    //   .on('', () => {

    //   })
    //   .exec();

    const result = await operations
      .withHeaders({
        Authorization: `Bearer ${accessToken}`,
      })
      .query({
        operationName: "internal/Search",
        input: {
          query: `${input.url} in:title repo:${input.repo}`,
        },
      });

    return result.data?.search?.nodes?.[0];
  },
});
