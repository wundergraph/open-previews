# Development instructions

## Development requirements

- Github App
- Github Personal Access Token

## Installation

1. Clone this repository
2. Run `pnpm install`
3. Copy `app/.env.example` to `app/.env`, we will get the values in the following steps.

## Github App

Create a new Github App in your organization. This will allow users to authorize access to post comments on their behalve.

1. Go to `Developer settings` -> `Github apps` in your personal account or organization and create a new Github App.
2. Enter a name, eg `My Comments`
3. Enter a Homepage URL, eg `https://my-comments.com`
4. Enter a callback URL, eg for development `http://localhost:9991/auth/cookie/callback/github`
5. Uncheck `Expire user authorization tokens`, refresh tokens are not supported yet
6. Create the app.

After creating the app, copy the `App ID` and `Client ID` and paste it into the `.env` file.
Create a new secret and paste the `Client Secret` into the `.env` file.

## Github Personal Access Token

Head to your [Github settings](https://github.com/settings/apps) and create a new (classic) personal access token and select the following permissions:
 
 - `repo`

This token is needed to access the Github GraphQL API. Copy the token and paste it into the `.env` file.

## Run the app

Run `pnpm dev:app` to start the WunderGraph app and Vite build process. Open `http://localhost:9991` in your browser and you should see the WunderGraph app running.

Once you have the app running, you can start the website to test the comment functionality by running `pnpm dev:web`. Open `http://localhost:3000` in your browser and you should see the website running.

# Production instructions

## Production requirements

- Github App
- Github Personal Access Token
- CDN to host widget.js
- WunderGraph Cloud account

### WunderGraph Cloud

If you haven't cloned the repository yet, you can clone and create a new WunderGraph project here:

https://cloud.wundergraph.com/new/clone?repositoryUrl=https%3A%2F%2Fgithub.com%2Fwundergraph%2Fopen-previews

Otherwise head to https://cloud.wundergraph.com/wundergraph/new to create a new project and select the repository you have cloned.

After creating the project, head to the `Settings` to configure your environment variables. Use the values from the steps above or create a new Github App and Personal Access Token for production. 

- `GITHUB_APP_ID`: The Github App ID 
- `GITHUB_CLIENT_ID`: The Github App Client ID
- `GITHUB_CLIENT_SECRET`: The Github App Client Secret
- `GITHUB_TOKEN`: The Github Personal Access Token
- `JWT_SECRET`: A random string to sign the JWT tokens

After updating the environment variables, head to the `Deployments` tab and create a new deployment by clicking `Redeploy`. After the deployment has finished, your app should be available at `https://<deployment-name>.wundergraph.dev`.

### Github App

Make sure you update the `Callback url` to point to your production environment, eg `open-previews.wundergraph.dev`.

### Widget

The widget is a javascript file that can be hosted on any CDN. The build requires the following environment variables:

- `WG_NODE_URL`: The WunderGraph Node URL, eg `https://open-previews.wundergraph.dev`
- `GITHUB_APP_ID`: The Github App ID 
- `GITHUB_CLIENT_ID`: The Github App Client ID
- `GITHUB_CLIENT_SECRET`: The Github App Client Secret
- `GITHUB_TOKEN`: The Github Personal Access Token
- `JWT_SECRET`: A random string to sign the JWT tokens

1. Run `pnpm build` to build the widget
2. Copy `widget/dist/widget.js` to your CDN