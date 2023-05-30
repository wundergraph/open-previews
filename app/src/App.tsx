import * as React from "react";
import { createPortal } from "react-dom";
import { useQuery } from "./lib/wundergraph";
import styles from "./index.css?inline";

const Dragons: React.FC = () => {
  const { data, error, isLoading } = useQuery({
    operationName: "Dragons",
  });
  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {JSON.stringify(error, null, 2)}</p>}
      {data && (
        <div>
          <p>{JSON.stringify(data, null, 2)}</p>
        </div>
      )}
    </div>
  );
};

function App() {
  return (
    <ShadowRoot>
      <div className="container">
        <Dragons />
        <style type="text/css">{styles}</style>
      </div>
    </ShadowRoot>
  );
}

export default App;

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
