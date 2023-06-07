import { createWebhook } from "../generated/wundergraph.webhooks";

export default createWebhook({
  async handler(event, context) {
    return {
      statusCode: 200,
      headers: {
        "content-type": "text/html",
      },
      body: html(JSON.stringify(event.query)),
    };
  },
});

const html = (body) => `<!DOCTYPE html>
<html lang="en">
  <body>
    ${body}
</body>
</html>`;
