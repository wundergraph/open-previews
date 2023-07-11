# Open Previews

Add commenting functionality to your staging and preview environments,
no matter where they are hosted. Easy to set up and fully open source.

- Open source ❤️
- No database needed. Comments are stored in Github Discussions. ✌️
- Easy to set up. Just add a single script tag to your app. 🚀
- Can be self hosted or simply deploy to WunderGraph Cloud. 🌩️

## How it works

Open Previews can be added using a single script tag. Once the script is loaded, it will load the comments from Github Discussions. If no existing discussion is found, a new one will be created. Users can authorize the Open Previews app to allow posting comments on their behalf. Once authorized, users can post comments and react to existing comments.

The hosted version of Open Previews is available for free during beta

## Installation

Check out the [Installation instructions](./INSTALLATION.md) to get started.

## Deploy your own

- [Deploy to WunderGraph Cloud](./DEPLOYMENT.md)

## The tech

- [WunderGraph](https://wundergraph.com) - Backend and integration framework
- [Vite](https://vitejs.dev) - Frontend
- [PandaCSS](https://panda-css.com) - CSS Framework
- [Radix UI](https://radix-ui.com) - The UI Library
- [Github Discussions](https://docs.github.com/en/discussions) - Comment storage
