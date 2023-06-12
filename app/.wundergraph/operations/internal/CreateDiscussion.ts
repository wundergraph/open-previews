import { createOperation, z } from "../../generated/wundergraph.factory";

export default createOperation.mutation({
  input: z.object({
    url: z.string(),
    categoryId: z.string(),
    repository: z.string(),
    body: z.string().optional(),
  }),
  handler: async ({ input, operations, clientRequest, context }) => {
    const { accessToken } = await context.getTokenFromRequest(clientRequest);
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    const [owner, name] = input.repository.split("/");

    const { data, error: repositoryError } = await operations.query({
      operationName: "internal/Repository",
      input: {
        owner,
        name,
      },
    });

    if (!data?.repository || repositoryError) {
      throw new Error("Repository not found", repositoryError);
    }

    const { data: discussion, error } = await operations
      .withHeaders(headers)
      .mutate({
        operationName: "internal/Create",
        input: {
          input: {
            title: input.url,
            repositoryId: data.repository.id as string,
            body: `## ${input.url}\n\n${input.body}`,
            categoryId: "DIC_kwDOI3kT2M4CXA_L", //input.categoryId,
          },
        },
      });

    if (error) {
      throw error;
    }

    return discussion;
  },
});
