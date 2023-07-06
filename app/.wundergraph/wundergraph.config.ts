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
        // We forward `X-Github-Token` to the `Authorization` header.
        .addClientRequestHeader("Authorization", "X-Github-Token")
        .addStaticHeader("X-Github-Next-Global-ID", "1")
    );
  },
});

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
        new EnvironmentVariable("REDIRECT_URI_REGEX"),
      ],
    },
  },
});
