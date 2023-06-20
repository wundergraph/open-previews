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
import { CONTROL_ELEMENT_CLASS } from "./utils/constants/constants";
import { useUser } from "./hooks/use-user";
import { useStore } from "@nanostores/react";
import { $activeCommentPin, PinDetails } from "./utils/state/activeCommentPin";

const styles = "__STYLES__";

function ShadowRoot(props: { children: React.ReactNode }) {
  const rootRef = React.useRef<HTMLElement>();

  const [root, setRoot] = React.useState<ShadowRoot | null>(null);

  React.useLayoutEffect(() => {
    if (!rootRef.current) {
      rootRef.current = document.createElement("open-previews");
      rootRef.current.classList.add(CONTROL_ELEMENT_CLASS);
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

const pinDetailsTypeGuard = (props: PinDetails | {}): props is PinDetails => {
  // @ts-expect-error
  if (props?.element && props?.coords) {
    return true;
  }
  return false;
};

function App(props: OpenPreviewConfig) {
  const user = useUser();

  const [, setRandom] = useState<number>();

  const pinDetails = useStore($activeCommentPin);

  const { commentText, isOpen, ...otherProps } = pinDetails;

  useEffect(() => {
    const unsubscribe = addClickListener();
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const rerender = () => setRandom(Math.random());

    window.addEventListener("resize", rerender);
    window.addEventListener("scroll", rerender);

    return () => {
      window.removeEventListener("resize", rerender);
      window.removeEventListener("scroll", rerender);
    };
  }, []);

  return (
    <ShadowRoot>
      <Config value={props}>
        <div className={themeClass}>
          {user.data ? <Selections /> : null}
          <Toolbar />
          <ActiveCommentPin
            pinDetails={
              pinDetailsTypeGuard(otherProps) ? otherProps : undefined
            }
          />
          <LiveHighlighter />
        </div>
      </Config>
    </ShadowRoot>
  );
}

export default App;
