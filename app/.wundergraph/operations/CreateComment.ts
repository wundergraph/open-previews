import { createOperation, z } from "../generated/wundergraph.factory";

export default createOperation.mutation({
  input: z.object({
    discussionId: z.string(),
    replyToId: z.string().optional(),
    body: z.string(),
    meta: z.object({}),
  }),
  handler: async ({ input, graph, operations, user, context }) => {
    const accessToken = await context.getToken(user);

    const body = `<div data-comment-meta="${input.meta}" />`;

    const result = await operations
      .withHeaders({
        Authorization: `Bearer ${accessToken}`,
      })
      .mutate({
        operationName: "internal/Comment",
        input: {
          discussionId: input.discussionId,
          body: input.body,
        },
      });

    return result;
  },
});
