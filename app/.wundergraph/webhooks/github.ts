import { createWebhook } from "../generated/wundergraph.webhooks";

export default createWebhook({
  async handler(event, context) {
    console.log("event", event);

    return {
      statusCode: 200,
    };
  },
});
