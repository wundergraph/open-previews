import { createWebhook } from "../generated/wundergraph.webhooks";

export default createWebhook({
  async handler(event, context) {
    return {
      statusCode: 200,
    };
  },
});
