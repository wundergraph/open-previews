import { createOperation, z } from "../../generated/wundergraph.factory";

export default createOperation.mutation({
  input: z.object({
    url: z.string(),
    categoryId: z.string(),
    repository: z.string(),
    body: z.string().optional(),
  }),
  handler: async ({ input, operations }) => {
    // We execute with our private access token,
    // This doesn't need to be the user's access token,
    // unless we run into rate limits.
    const headers = {
      "X-Github-Token": `Bearer ${process.env.GITHUB_TOKEN}`,
    };
    const [owner, name] = input.repository.split("/");

    const client = operations.withHeaders(headers);

    const { data, error: repositoryError } = await client.query({
      operationName: "internal/Repository",
      input: {
        owner,
        name,
      },
    });

    if (!data?.repository || repositoryError) {
      throw new Error("Repository not found", repositoryError);
    }

    const { data: discussion, error } = await client.mutate({
      operationName: "internal/Create",
      input: {
        input: {
          title: input.url,
          repositoryId: data.repository.id as string,
          body: `## ${input.url}\n\n${input.body}`,
          categoryId: input.categoryId,
        },
      },
    });

    if (error) {
      throw error;
    }

    return discussion;
  },
});
