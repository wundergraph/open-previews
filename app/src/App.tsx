import * as React from "react";
import { createPortal } from "react-dom";
import { Toolbar } from "./components/toolbar";
import { Selections } from "./components/selections";
import { Config, OpenPreviewConfig } from "./providers/config";
import { themeClass } from "./theme";
import { useUser } from "./hooks/use-user";

const styles = "__STYLES__";

function ShadowRoot(props: { children: React.ReactNode }) {
  const rootRef = React.useRef<HTMLElement>();

  const [root, setRoot] = React.useState<ShadowRoot | null>(null);

  React.useLayoutEffect(() => {
    if (!rootRef.current) {
      rootRef.current = document.createElement("open-previews");
      document.body.appendChild(rootRef.current);

      const sheet = new CSSStyleSheet();
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

function App(props: OpenPreviewConfig) {
  const user = useUser();

  console.log(user);

  return (
    <ShadowRoot>
      <Config value={props}>
        {
          <div className={themeClass}>
            {user.data ? <Selections /> : null}
            <Toolbar />
          </div>
        }
      </Config>
    </ShadowRoot>
  );
}

export default App;
