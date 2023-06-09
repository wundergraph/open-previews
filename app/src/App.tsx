import * as React from "react";
import { createPortal } from "react-dom";
import { Toolbar } from "./components/toolbar";
import { Selections } from "./components/selections";
import { Config, OpenPreviewConfig } from "./providers/config";
import { themeClass } from "./theme";

const styles = "__STYLES__";

function ShadowRoot(props: { children: React.ReactNode }) {
  const rootRef = React.useRef<HTMLElement>();

  const [root, setRoot] = React.useState<ShadowRoot | null>(null);

  React.useLayoutEffect(() => {
    if (!rootRef.current) {
      rootRef.current = document.createElement("open-previews");
      rootRef.current.classList.add("open-preview-control");
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
  const { categoryId = "39587787", repository = "Pagebakers/cloud-starter" } =
    props;

  return (
    <ShadowRoot>
      <Config value={{ categoryId, repository }}>
        <div className={themeClass}>
          <Selections />
          <Toolbar />
        </div>
      </Config>
    </ShadowRoot>
  );
}

export default App;
