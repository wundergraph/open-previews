import { createOperation, z } from "../generated/wundergraph.factory";
import { constructComment } from "../lib/constructComment";

export default createOperation.mutation({
  input: z.object({
    commentId: z.string(),
    body: z.string(),
    meta: z
      .object({
        href: z.string(),
        path: z.string(),
        x: z.number(),
        y: z.number(),
        resolved: z.boolean(),
        selection: z.string().optional(),
      })
      .optional(),
  }),
  handler: async ({ input, operations, clientRequest, context }) => {
    const { accessToken } = await context.getTokenFromRequest(clientRequest);

    const timestamp = Date.now();

    const body = input.meta
      ? constructComment({
          body: input.body,
          meta: {
            ...input.meta,
            timestamp,
          },
        })
      : input.body;

    const result = await operations
      .withHeaders({
        Authorization: `Bearer ${accessToken}`,
      })
      .mutate({
        operationName: "internal/UpdateComment",
        input: {
          commentId: input.commentId,
          body,
        },
      });

    return result;
  },
});
