import { createOperation } from "../generated/wundergraph.factory";
import { encodeUserToken } from "../lib/tokens";

/**
 * Return the user's token on the callback URL.
 * The Token is exchanged for the query state.
 */
export default createOperation.query({
  handler: async ({ user, context }) => {
    const { accessToken, name, email } = await context.getTokenFromUser(user);

    const token = encodeUserToken({
      rawAccessToken: accessToken,
      name,
      email,
    });

    return token;
  },
});
