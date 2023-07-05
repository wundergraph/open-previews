import * as React from "react";
import { createPortal } from "react-dom";
import { Navbar } from "./components/navbar";
import { Selections } from "./components/selections";
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
import "./main.css";
import { AllDiscussions } from "./components/all-discussions";
import { $discussionsOverlayMode } from "./utils/state/discussionsOverlayMode";
import { $rootElementReference } from "./utils/state/rootElementReference";

const styles = `__STYLES__`;

export interface ShadowRootHandler {
  unMount: () => unknown;
}

const ShadowRoot = React.forwardRef<
  ShadowRootHandler,
  { children: React.ReactNode }
>((props, ref) => {
  const rootRef = React.useRef<HTMLElement>();

  const [root, setRoot] = React.useState<ShadowRoot | null>(null);

  React.useImperativeHandle(ref, () => ({
    unMount: () => rootRef.current?.remove(),
  }));

  React.useLayoutEffect(() => {
    if (!rootRef.current) {
      rootRef.current = document.createElement("open-previews");
      rootRef.current.classList.add(CONTROL_ELEMENT_CLASS);
      document.body.appendChild(rootRef.current);

      const sheet = new CSSStyleSheet();
      sheet.replaceSync(styles.replace("'\\", "\\\\"));

      const root = rootRef.current.attachShadow({ mode: "open" });

      root.adoptedStyleSheets = [sheet];

      setRoot(root);
    }
  }, []);

  if (root) {
    return createPortal(props.children, root);
  }

  return null;
});

const pinDetailsTypeGuard = (props: PinDetails | {}): props is PinDetails => {
  // @ts-expect-error
  if (props?.element && props?.coords) {
    return true;
  }
  return false;
};

export interface NewCommentArgs {
  comment: string;
}

export interface NewReplyArgs {
  comment: string;
  replyToId: string;
}

export interface ResolveCommentArgs {
  comment: string;
  id: string;
}

function App() {
  const rootRef = React.useRef<ShadowRootHandler | null>(null);

  const user = useUser();

  const [dimension, setDimension] = useState<number>(
    window.innerHeight + window.innerWidth
  );

  const pinDetails = useStore($activeCommentPin);

  const discussionsOverlayMode = useStore($discussionsOverlayMode);

  const { isOpen, ...otherProps } = pinDetails;

  useEffect(() => {
    const unsubscribe = addClickListener();

    if (rootRef.current) $rootElementReference.set(rootRef);

    return () => {
      unsubscribe();
    };
  }, []);

  const config = useStore($openPreviewConfig);

  const { data, mutate } = useQuery({
    operationName: "Comments",
    input: {
      repository: config.repository,
      categoryId: config.categoryId,
      url: window.location.hostname,
    },
    enabled: !!user.data,
  });

  const { data: viewer } = useQuery({
    operationName: "Viewer",
    enabled: !!user.data,
  });

  const { trigger: createComment } = useMutation({
    operationName: "CreateComment",
  });

  const { trigger: updateComment } = useMutation({
    operationName: "UpdateComment",
  });

  const resolveComment = ({ comment, id }: ResolveCommentArgs) => {
    updateComment({
      body: comment,
      commentId: id,
    }).then(() => {
      mutate();
    });
  };

  const createNewThread = ({ comment }: NewCommentArgs) => {
    if (pinDetailsTypeGuard(otherProps)) {
      createComment({
        body: comment ?? "",
        discussionId: data?.id,
        meta: {
          href: window.location.href,
          path: JSON.stringify(otherProps.targetElement?.path ?? "{}"),
          x: otherProps.coords.x,
          y: otherProps.coords.y,
          resolved: false,
          selection: otherProps.selectionRange,
        },
      }).then(() => {
        mutate();
      });
    }
  };

  const createNewReply = ({ comment, replyToId }: NewReplyArgs) => {
    createComment({
      body: comment ?? "",
      discussionId: data?.id,
      replyToId,
    }).then(() => {
      mutate();
    });
  };

  useEffect(() => {
    const rerender = () =>
      setDimension(
        window.innerHeight + window.innerWidth + window.scrollX + window.scrollY
      );

    window.addEventListener("resize", rerender);
    window.addEventListener("scroll", rerender);

    return () => {
      window.removeEventListener("resize", rerender);
      window.removeEventListener("scroll", rerender);
    };
  }, []);

  const userDetails = {
    username: viewer?.github_viewer?.login ?? "",
    profilePicURL: viewer?.github_viewer?.avatarUrl ?? "",
    userProfileLink: viewer?.github_viewer?.url ?? "",
  };

  return (
    <ShadowRoot ref={rootRef}>
      <div id="open-previews-container">
        {data?.comments && discussionsOverlayMode ? (
          <AllDiscussions comments={data?.comments} />
        ) : null}
        {user.data ? (
          <Selections
            data={data}
            dimension={dimension}
            onResolve={resolveComment}
            onReply={createNewReply}
            userDetails={userDetails}
          />
        ) : null}
        <Navbar userDetails={userDetails} />
        {pinDetailsTypeGuard(otherProps) ? (
          <ActiveCommentPin
            pinDetails={otherProps}
            defaultOpen
            onResolve={resolveComment}
            dimension={dimension}
            onSubmit={createNewThread}
            onReply={createNewReply}
            userDetails={userDetails}
          />
        ) : null}
        {user.data ? <LiveHighlighter /> : null}
      </div>
    </ShadowRoot>
  );
}

export default App;
