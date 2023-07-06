# Open Previews

Add commenting functionality to your staging and preview environments,
no matter where they are hosted. Easy to set up and fully open source.

- Open source ❤️
- No database needed. Comments are stored in Github Discussions. ✌️
- Easy to set up. Just add a single script tag to your app. 🚀
- Can be self hosted or simply deploy to WunderGraph Cloud. 🌩️

> Open Previews is still under development, watch this repo or [sign up for early access](https://openpreviews.com) to stay up to date.

## How it works

Open Previews can be added using a single script tag. Once the script is loaded, it will load the comments from Github Discussions. If no existing discussion is found, a new one will be created. Users can authorize the Open Previews app to allow posting comments on their behalf. Once authorized, users can post comments and react to existing comments.

## The tech

- [WunderGraph](https://wundergraph.com) - Backend and integration framework
- [Vite](https://vitejs.dev) - Frontend
- [React](https://reactjs.org) - The UI Library
- [Github Discussions](https://docs.github.com/en/discussions) - Comment storage
