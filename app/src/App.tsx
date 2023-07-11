import * as React from "react";
import { createPortal } from "react-dom";
import { useStore } from "@nanostores/react";

import { Navbar } from "./components/navbar";
import { Selections } from "./components/selections";
import { ActiveCommentPin } from "./components/active-comment-pin";
import { useEffect, useState } from "react";
import { addClickListener } from "./utils";
import { LiveHighlighter } from "./components/live-highlighter";
import { useUser } from "./hooks/use-user";
import {
  $activeCommentPin,
  PinDetailsActive,
  PinDetailsState,
} from "./stores/active-pin";
import { useMutation, useQuery } from "./lib/wundergraph";
import { useConfig } from "./stores/config";
import "./main.css";
import { AllDiscussions } from "./components/all-discussions";
import { $discussionsOverlayMode } from "./stores/discussions-overlay-mode";
import { useWidgetActive } from "./stores/widget-active";
import { Box } from "../styled-system/jsx";

const styles = `__STYLES__`;

function ShadowRoot(props: { children: React.ReactNode }) {
  const rootRef = React.useRef<Element>();

  const [root, setRoot] = React.useState<ShadowRoot | null>(null);

  const isActive = useWidgetActive();

  React.useLayoutEffect(() => {
    if (!rootRef.current && isActive) {
      let el = document.getElementsByTagName("open-previews")[0];

      if (!el) {
        el = document.createElement("open-previews");
        document.body.appendChild(el);
      }

      rootRef.current = el;

      const sheet = new CSSStyleSheet();
      sheet.replaceSync(styles.replace("\\", "\\\\"));

      const root = rootRef.current.attachShadow({ mode: "open" });

      root.adoptedStyleSheets = [sheet];

      setRoot(root);
    } else if (rootRef.current && !isActive) {
      console.log("REMOVE", rootRef.current);
      document.body.removeChild(rootRef.current!);
      rootRef.current = undefined;
    }
  }, [isActive]);

  if (root) {
    return createPortal(props.children, root);
  }

  return null;
}

const isActivePin = (props: PinDetailsState): props is PinDetailsActive => {
  if ("element" in props && props?.element && props?.coords) {
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
  const user = useUser();

  const pinDetails = useStore($activeCommentPin);

  const discussionsOverlayMode = useStore($discussionsOverlayMode);

  useEffect(() => {
    const unsubscribe = addClickListener();
    return () => {
      unsubscribe();
    };
  }, []);

  const config = useConfig();

  const { data, mutate } = useQuery({
    operationName: "Comments",
    input: {
      repository: config.repository,
      categoryId: config.categoryId,
      url: window.location.hostname,
    },
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
    if (isActivePin(pinDetails)) {
      createComment({
        body: comment ?? "",
        discussionId: data?.id,
        meta: {
          href: window.location.href,
          path: JSON.stringify(pinDetails.targetElement?.path ?? "{}"),
          x: pinDetails.coords.x,
          y: pinDetails.coords.y,
          resolved: false,
          selection: pinDetails.selectionRange,
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

  return (
    <ShadowRoot>
      <Box id="open-previews-container" color="fg.default">
        {data?.comments && discussionsOverlayMode ? (
          <AllDiscussions comments={data?.comments} />
        ) : null}
        {user.data ? (
          <Selections
            data={data}
            onResolve={resolveComment}
            onReply={createNewReply}
            user={user.data}
          />
        ) : null}
        <Navbar />
        {user.data && isActivePin(pinDetails) ? (
          <ActiveCommentPin
            pinDetails={pinDetails}
            defaultOpen
            onResolve={resolveComment}
            onSubmit={createNewThread}
            onReply={createNewReply}
            user={user.data}
          />
        ) : null}
        {user.data ? <LiveHighlighter /> : null}
      </Box>
    </ShadowRoot>
  );
}

export default App;
