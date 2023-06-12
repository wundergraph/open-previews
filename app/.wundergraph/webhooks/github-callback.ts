import { createWebhook } from "../generated/wundergraph.webhooks";

export default createWebhook({
  async handler(event) {
    return {
      statusCode: 200,
      headers: {
        "content-type": "text/html",
      },
      body: html({
        state: event.query.state,
        origin: event.query.origin || "*",
      }),
    };
  },
});

const html = (body) => `<!DOCTYPE html>
<html lang="en">
  <body>
    <script type="text/javascript">
      fetch("/operations/Token").then((response) => response.json()).then((response) => {
        window.addEventListener("message", (event) => {
          if (event.data.id === "openpreviews.callback" && event.data.state === "${body.state}") {
            event.source.postMessage({
              id: "openpreviews.success",
              token: response.data
            }, event.origin)
          } else {
            event.source.postMessage({
              id: "openpreviews.failed"
            }, event.origin)
          }
        })
        
        window.opener.postMessage({id: "openpreviews.init"}, "${body.origin}") // get origin from callback
      })
    </script>
</body>
</html>`;
