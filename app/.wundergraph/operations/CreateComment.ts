import { DISCUSSION_OPEN_IN_PREVIEW_TEXT } from "../../src/utils/constants/constants";
import {
  AuthorizationError,
  createOperation,
  z,
} from "../generated/wundergraph.factory";

export default createOperation.mutation({
  input: z.object({
    discussionId: z.string(),
    replyToId: z.string().optional(),
    body: z.string(),
    meta: z
      .object({
        href: z.string(),
        path: z.string(),
        x: z.number(),
        y: z.number(),
        resolved: z.boolean().optional(),
        selection: z.string().optional(),
      })
      .optional(),
  }),
  handler: async ({ input, operations, clientRequest, context }) => {
    const { accessToken } = await context.getTokenFromRequest(clientRequest);

    if (!accessToken) {
      throw new AuthorizationError();
    }

    const timestamp = Date.now();

    const meta = {
      ...(input.meta ?? {}),
      timestamp,
    };

    const jsonMeta = JSON.stringify(meta ?? {});

    const encodedJsonMeta = encodeURIComponent(jsonMeta);

    const body = input.meta
      ? `${input.body} [${DISCUSSION_OPEN_IN_PREVIEW_TEXT}](${input.meta.href}#${timestamp}) <div data-comment-meta="${encodedJsonMeta}" />`
      : input.body;

    const result = await operations
      .withHeaders({
        "X-Github-Token": `Bearer ${accessToken}`, // we post on the user's behalf.
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
