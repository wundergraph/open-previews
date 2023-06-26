import {
  EnvironmentVariable,
  authProviders,
  configureWunderGraphApplication,
  cors,
  introspect,
  templates,
} from "@wundergraph/sdk";
import server from "./wundergraph.server";
import operations from "./wundergraph.operations";

const github = introspect.graphql({
  apiNamespace: "github",
  url: "https://api.github.com/graphql",
  introspection: {
    headers(builder) {
      return builder.addStaticHeader(
        "Authorization",
        `Bearer ${process.env.GITHUB_TOKEN}`
      );
    },
  },
  headers(builder) {
    return (
      builder
        .addClientRequestHeader("Authorization", "X-Github-Token")
        // .addStaticHeader("Authorization", `Bearer ${process.env.GITHUB_TOKEN}`) // temporary
        .addStaticHeader("X-Github-Next-Global-ID", "1")
    );
  },
});

// configureWunderGraph emits the configuration
configureWunderGraphApplication({
  apis: [github],
  server,
  operations,
  generate: {
    codeGenerators: [
      {
        templates: [templates.typescript.client],
        path: "../src/generated",
      },
    ],
  },
  cors: {
    ...cors.allowAll,
    allowedOrigins:
      process.env.NODE_ENV === "production" ? ["https://*"] : ["http://*"],
    /**
     * Please configure CORS carefully to make sure that your users are protected.
     * Allowing all origins is usually the worst possible configuration.
     *
     * @docs https://docs.wundergraph.com/docs/wundergraph-config-ts-reference/configure-cors
     */
    // allowedOrigins: process.env.NODE_ENV === 'production' ? ['http://your.app'] : ['http://localhost:3000'],
  },
  authentication: {
    cookieBased: {
      providers: [
        authProviders.github({
          id: "github",
          clientId: new EnvironmentVariable("GITHUB_CLIENT_ID"),
          clientSecret: new EnvironmentVariable("GITHUB_CLIENT_SECRET"),
        }),
      ],
      authorizedRedirectUriRegexes: [
        "http://localhost:3000*",
        "http://localhost:9991*",
        "https://wg-cloud.eu.ngrok.io*",
        "https://wg-web.eu.ngrok.io*",
      ],
    },
  },
  security: {
    enableGraphQLEndpoint: process.env.NODE_ENV !== "production",
  },
});
