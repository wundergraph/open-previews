import * as React from "react";
import { createPortal } from "react-dom";
import { useAuth, useQuery, useUser } from "./lib/wundergraph";
import { addClickListener } from "./utils";
import { Toolbar } from "./components/toolbar";
import { Button } from "./components/layout";

const styles = "__STYLES__";

function ShadowRoot(props: { children: React.ReactNode }) {
  const rootRef = React.useRef<HTMLElement>();

  const [root, setRoot] = React.useState<ShadowRoot | null>(null);

  React.useLayoutEffect(() => {
    if (!rootRef.current) {
      rootRef.current = document.createElement("open-previews");
      document.body.appendChild(rootRef.current);

      const sheet = new CSSStyleSheet();
      console.log(styles);
      sheet.replaceSync(styles);

      const root = rootRef.current.attachShadow({ mode: "open" });

      root.adoptedStyleSheets = [sheet];

      setRoot(root);
    }
  }, []);

  if (root) {
    return createPortal(props.children, root);
  }

  return null;
}

function App() {
  const { logout } = useAuth();
  const { data: user } = useUser();

  React.useEffect(() => {
    const unsubscribe = addClickListener();
    return () => {
      unsubscribe();
    };
  }, []);

  const signIn = () => {
    const redirect_uri = `http://localhost:3000`;
    openWindow(
      `http://localhost:9991/auth/cookie/authorize/github?redirect_uri=${redirect_uri}`,
      "mozillaWindow",
      800,
      600
    );
  };

  return (
    <ShadowRoot>
      <Toolbar>
        {user ? (
          <div>
            {user.email}

            <Button onClick={() => logout()}>Logout</Button>
          </div>
        ) : (
          <Button onClick={() => signIn()}>Sign in</Button>
        )}
      </Toolbar>
    </ShadowRoot>
  );
}

export function openWindow(url: string, winName: string, w: number, h: number) {
  const left = screen.width ? (screen.width - w) / 2 : 0;
  const top = screen.height ? (screen.height - h) / 2 : 0;
  const settings =
    "height=" +
    h +
    ",width=" +
    w +
    ",top=" +
    top +
    ",left=" +
    left +
    ",resizable";
  return window.open(url, winName, settings);
}

export default App;
