import { OperationError, ResponseError } from "@wundergraph/sdk/client";
import { createOperation, z } from "../generated/wundergraph.factory";

export class NotFoundError extends OperationError {
  statusCode = 404;
  message = "Repository not found";
}

/**
 * Returns the categories for a repository.
 */
export default createOperation.query({
  input: z.object({
    repo: z.string().regex(/^[a-zA-Z0-9-]+\/[a-zA-Z0-9-]+$/),
  }),
  errors: [NotFoundError],
  handler: async ({ input, operations }) => {
    const [owner, name] = input.repo.split("/");
    const result = await operations
      .withHeaders({
        "x-github-token": `Bearer ${process.env.GITHUB_TOKEN}`,
      })
      .query({
        operationName: "internal/Categories",
        input: {
          owner,
          name,
        },
      });

    if (result.error instanceof ResponseError) {
      const error = result.error.errors?.[0];
      if (error?.message.match(/Could not resolve to a Repository/)) {
        throw new NotFoundError();
      }

      throw new ResponseError({
        statusCode: 400,
        message: error?.message || "Unknown error",
      });
    }

    return result.data?.repository?.discussionCategories?.nodes || [];
  },
});
