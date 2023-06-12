import * as React from "react";
import { createPortal } from "react-dom";
import { Toolbar } from "./components/toolbar";
import { Selections } from "./components/selections";
import { Config, OpenPreviewConfig } from "./providers/config";
import { themeClass } from "./theme";
import {
  ActiveCommentPin,
  CommentPinHandle,
} from "./components/active-comment-pin";
import { useEffect, useRef, useState } from "react";
import { addClickListener } from "./utils";
import { LiveHighlighter } from "./components/live-highlighter";

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

  const activePinRef = useRef<CommentPinHandle | null>(null);

  const [, setRandom] = useState<number>();

  useEffect(() => {
    const unsubscribe = addClickListener(activePinRef.current);
    return () => {
      unsubscribe();
    };
  }, [activePinRef.current]);

  useEffect(() => {
    const rerender = () => setRandom(Math.random());

    /**
     * Re-render once to access the activePinRef
     */
    setTimeout(() => {
      rerender();
    }, 500);

    window.addEventListener("resize", rerender);
    window.addEventListener("scroll", rerender);

    return () => {
      window.removeEventListener("resize", rerender);
      window.removeEventListener("scroll", rerender);
    };
  }, []);

  return (
    <ShadowRoot>
      <Config value={{ categoryId, repository }}>
        <div className={themeClass}>
          <Selections />
          <Toolbar />
          <ActiveCommentPin ref={activePinRef} />
          <LiveHighlighter commentHandler={activePinRef} />
        </div>
      </Config>
    </ShadowRoot>
  );
}

export default App;
