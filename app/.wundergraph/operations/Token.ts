import { createOperation } from "../generated/wundergraph.factory";
import { encodeUserToken } from "../lib/tokens";

export default createOperation.query({
  handler: async ({ user, context }) => {
    const { accessToken, name, email } = await context.getTokenFromUser(user);
    console.log("accessToken", accessToken);
    const token = encodeUserToken({
      rawAccessToken: accessToken,
      name,
      email,
    });

    return token;
  },
});
