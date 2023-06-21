import * as React from "react";
import { createPortal } from "react-dom";
import { Toolbar } from "./components/toolbar";
import { Selections } from "./components/selections";
import { themeClass } from "./theme";
import { ActiveCommentPin } from "./components/active-comment-pin";
import { useEffect, useState } from "react";
import { addClickListener } from "./utils";
import { LiveHighlighter } from "./components/live-highlighter";
import { CONTROL_ELEMENT_CLASS } from "./utils/constants/constants";
import { useUser } from "./hooks/use-user";
import { useStore } from "@nanostores/react";
import { $activeCommentPin, PinDetails } from "./utils/state/activeCommentPin";
import { useMutation, useQuery } from "./lib/wundergraph";
import { $openPreviewConfig } from "./utils/state/openPreviewConfig";

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

function App() {
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

  const config = useStore($openPreviewConfig);

  const { data } = useQuery({
    operationName: "Comments",
    input: {
      repository: config.repository,
      categoryId: config.categoryId,
      url: window.location.hostname,
    },
  });

  const { trigger } = useMutation({
    operationName: "CreateComment",
  });

  const createNewThread = (formData: FormData) => {
    const comment = formData.get("comment") as string;
    if (pinDetailsTypeGuard(otherProps)) {
      trigger({
        body: comment ?? "",
        discussionId: data?.id,
        meta: {
          path: JSON.stringify(otherProps.targetElement?.path ?? "{}"),
          x: otherProps.coords.x,
          y: otherProps.coords.y,
          resolved: false,
          selection: otherProps.selectionRange,
        },
      });
    }
  };

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
      <div className={themeClass}>
        {user.data ? <Selections data={data} /> : null}
        <Toolbar />
        {pinDetailsTypeGuard(otherProps) ? (
          <ActiveCommentPin
            pinDetails={otherProps}
            defaultOpen
            onSubmit={createNewThread}
          />
        ) : null}
        <LiveHighlighter />
      </div>
    </ShadowRoot>
  );
}

export default App;
