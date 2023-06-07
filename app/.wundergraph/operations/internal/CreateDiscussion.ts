import { createOperation, z } from "../../generated/wundergraph.factory";

export default createOperation.mutation({
  input: z.object({
    url: z.string(),
    categoryId: z.string(),
    repo: z.string(),
    body: z.string().optional(),
  }),
  handler: async ({ input, graph, operations, user, context }) => {
    const accessToken = await context.getToken(user);
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    const [owner, name] = input.repo.split("/");

    // const repository = await graph
    //   .withHeaders(headers)
    //   .from("github")
    //   .query("repository")
    //   .where({
    //     owner,
    //     name,
    //   })
    //   .select("id", "name", "url")
    //   .exec();
    const { data, error: repositoryError } = await operations.query({
      operationName: "internal/Repository",
      input: {
        owner,
        name,
      },
    });
    console.log("REPO", data?.repository);
    if (!data?.repository || repositoryError) {
      throw new Error("Repository not found", repositoryError);
    }

    // const result = await graph
    //   .withHeaders(headers)
    //   .from("github")
    //   .mutate("createDiscussion")
    //   .where({
    //     input: {
    //       title: input.url,
    //       repositoryId: repository.id as string,
    //       body: `## ${input.url}\n\n${input.body}`,
    //       categoryId: input.categoryId,
    //     },
    //   })
    //   .select("discussion.id")
    //   .exec();

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
