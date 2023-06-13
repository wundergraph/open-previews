import { createOperation, z } from "../generated/wundergraph.factory";

export default createOperation.query({
  input: z.object({
    url: z.string(),
    repository: z.string(),
    categoryId: z.string(),
  }),
  handler: async ({ input, operations, clientRequest, context }) => {
    const { accessToken } = await context.getTokenFromRequest(clientRequest);

    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const { data, error } = await operations.withHeaders(headers).query({
      operationName: "internal/SearchDiscussions",
      input: {
        url: input.url,
        repository: input.repository,
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
            repository: input.repository,
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
