import { styled } from "@macaron-css/react";
import { style } from "@macaron-css/core";
import { useStore } from "@nanostores/react";
import { $commentMode, toggleCommentMode } from "~/utils/state/commentMode";
import { LoginIcon } from "./icons/login";
import { DndContext, PointerSensor, useDraggable } from "@dnd-kit/core";

import * as ToolbarPrimitive from "@radix-ui/react-toolbar";
import { theme } from "~/theme";
import { CommentIcon } from "./icons/comment";
import { XIcon } from "./icons/x";
import React from "react";
import { useUser } from "~/hooks/use-user";
import { useAuth } from "~/lib/auth";

const ToolbarRoot = styled(ToolbarPrimitive.Root, {
  base: {
    display: "flex",
    padding: "8px",
    minWidth: "max-content",
    borderRadius: 25,
    backgroundColor: theme.color.grayDarkA.grayA8,
    backgroundBlendMode: "color-burn",
    backdropFilter: "blur(20px)",
    zIndex: 10000,
  },
});

const itemStyles = {
  flex: "0 0 auto",
  color: "white",
  backgroundColor: "transparent",
  border: 0,
  height: 32,
  minWidth: 32,
  padding: "0 4px",
  borderRadius: 25,
  display: "inline-flex",
  fontSize: 14,
  lineHeight: 1,
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  transition: "all 0.2s ease",
};

const ToolbarToggleItem = styled(ToolbarPrimitive.ToggleItem, {
  base: {
    ...itemStyles,
    ":hover": { backgroundColor: theme.color.grayDark.gray9 },
    ":focus": {
      position: "relative",
      boxShadow: `0 0 0 2px ${theme.color.pink.pink8}`,
    },
    selectors: {
      "&[data-state=on]": { backgroundColor: theme.color.grayDark.gray10 },
    },
  },
});

const ToolbarSeparator = styled(ToolbarPrimitive.Separator, {
  base: {
    width: 1,
    backgroundColor: theme.color.grayDark.gray9,
    margin: "0 8px",
  },
});

const ToolbarLink = styled(ToolbarPrimitive.Link, {
  base: {
    ...itemStyles,
    backgroundColor: "transparent",
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    ":hover": { backgroundColor: theme.color.grayDark.gray9 },
    ":focus-visible": {
      position: "relative",
      boxShadow: `0 0 0 2px ${theme.color.pink.pink5}`,
    },
  },
});

const ToolbarButton = styled(ToolbarPrimitive.Button, {
  base: {
    ...itemStyles,
    ":hover": { backgroundColor: theme.color.grayDark.gray9 },
    ":focus-visible": {
      position: "relative",
      boxShadow: `0 0 0 2px ${theme.color.pink.pink5}`,
    },
  },
});

const ToolbarPositioner = (props) => {
  const { x, y, ...rest } = props;
  const { attributes, listeners, isDragging, transform, setNodeRef } =
    useDraggable({
      id: "open-previews-toolbar",
    });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={
        {
          position: "fixed",
          zIndex: theme.zIndex.base,
          left: x,
          top: y,
          "--translate-x": `${transform?.x ?? 0}px`,
          "--translate-y": `${transform?.y ?? 0}px`,
          transform:
            "translate3d(var(--translate-x, 0), var(--translate-y, 0), 0)",
          userSelect: "none",
        } as React.CSSProperties
      }
      {...rest}
    />
  );
};

export const Toolbar = () => {
  const { token, login, logout } = useAuth();
  const { data: user } = useUser({
    enabled: !!token,
  });
  const isCommentModeOn = useStore($commentMode);

  const [{ x, y }, setCoordinates] = React.useState<{ x: number; y: number }>({
    x: window.innerWidth * 0.5 - 50,
    y: window.innerHeight - 100,
  });

  return (
    <DndContext
      onDragEnd={({ delta }) => {
        setCoordinates(({ x, y }) => {
          return {
            x: x + delta.x,
            y: y + delta.y,
          };
        });
      }}
      sensors={[
        {
          sensor: PointerSensor,
          options: {
            preventDefaultEvents: true,
            activationConstraint: {
              distance: 5,
            },
          },
        },
      ]}
    >
      <ToolbarPositioner x={x} y={y}>
        <ToolbarRoot role="toolbar">
          {user ? (
            <>
              <ToolbarPrimitive.ToggleGroup
                type="single"
                value={isCommentModeOn ? "comments-on" : undefined}
              >
                <ToolbarToggleItem
                  value="comments-on"
                  onClick={toggleCommentMode}
                >
                  {isCommentModeOn ? <XIcon /> : <CommentIcon />}
                </ToolbarToggleItem>
              </ToolbarPrimitive.ToggleGroup>
              <ToolbarSeparator />
              <ToolbarButton onClick={() => logout()}>
                <LoginIcon />
              </ToolbarButton>
            </>
          ) : (
            <ToolbarButton onClick={() => login()}>
              <LoginIcon className={style({ marginRight: "4px" })} /> Log in to
              comment
            </ToolbarButton>
          )}
        </ToolbarRoot>
      </ToolbarPositioner>
    </DndContext>
  );
};
