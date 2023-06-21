import { createOperation, z } from "../generated/wundergraph.factory";

export default createOperation.mutation({
  input: z.object({
    discussionId: z.string(),
    replyToId: z.string().optional(),
    body: z.string(),
    meta: z.object({
      path: z.string(),
      x: z.number(),
      y: z.number(),
      resolved: z.boolean().optional(),
      selection: z.string().optional(),
    }),
  }),
  handler: async ({ input, operations, clientRequest, context }) => {
    const { accessToken } = await context.getTokenFromRequest(clientRequest);

    const jsonMeta = JSON.stringify(input.meta);

    const encodedJsonMeta = encodeURIComponent(jsonMeta);

    const body = `${input.body} <div data-comment-meta="${encodedJsonMeta}" />`;

    const result = await operations
      .withHeaders({
        Authorization: `Bearer ${accessToken}`,
      })
      .mutate({
        operationName: "internal/Comment",
        input: {
          discussionId: input.discussionId,
          body,
          replyToId: input.replyToId,
        },
      });

    return result;
  },
});
