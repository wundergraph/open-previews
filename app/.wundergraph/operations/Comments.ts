import { createOperation, z } from "../generated/wundergraph.factory";

export default createOperation.query({
  input: z.object({
    url: z.string(),
    repo: z.string(),
    categoryId: z.string(),
  }),
  handler: async ({ input, operations, user, context }) => {
    const accessToken = await context.getToken(user);

    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const { data, error } = await operations.withHeaders(headers).query({
      operationName: "internal/SearchDiscussions",
      input: {
        url: input.url,
        repo: input.repo,
      },
    });

    let discussion;
    if (!data || error) {
      discussion = await operations
        .withHeaders({
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        })
        .mutate({
          operationName: "internal/CreateDiscussion",
          input: {
            url: input.url,
            repo: input.repo,
            categoryId: input.categoryId,
            body: `## ${input.url}\n\n`,
          },
        });
      return {
        id: discussion.data?.createDiscussion?.id,
        comments: [],
      };
    }

    return {
      id: data.id,
      comments: data.comments?.nodes,
    };
  },
});
