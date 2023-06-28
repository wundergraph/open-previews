import { useStore } from "@nanostores/react";
import { $commentMode, toggleCommentMode } from "~/utils/state/commentMode";
import { LoginIcon } from "./icons/login";
import { DndContext, PointerSensor, useDraggable } from "@dnd-kit/core";

import {
  ToolbarButton,
  Toolbar as ToolbarRoot,
  ToolbarSeparator,
  ToolbarToggleGroup,
  ToolbarToggleItem,
} from "./ui/toolbar";

import { CommentIcon } from "./icons/comment";
import { XIcon } from "./icons/x";
import React from "react";
import { useUser } from "~/hooks/use-user";
import { useAuth } from "~/lib/auth";

import { css } from "../../styled-system/css";

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
          zIndex: "20000",
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
  const { login, logout } = useAuth();
  const { data: user } = useUser();
  const isCommentModeOn = useStore($commentMode);

  const [{ x, y }, setCoordinates] = React.useState<{ x: number; y: number }>({
    x: window.innerWidth * 0.5 - 50,
    y: window.innerHeight - 80,
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
        <ToolbarRoot>
          {user ? (
            <>
              <ToolbarToggleGroup
                type="single"
                value={isCommentModeOn ? "comments-on" : undefined}
              >
                <ToolbarToggleItem
                  value="comments-on"
                  onClick={toggleCommentMode}
                >
                  {isCommentModeOn ? <XIcon /> : <CommentIcon />}
                </ToolbarToggleItem>
              </ToolbarToggleGroup>
              <ToolbarSeparator />
              <ToolbarButton onClick={() => logout()}>
                <LoginIcon />
              </ToolbarButton>
            </>
          ) : (
            <ToolbarButton onClick={() => login()}>
              <LoginIcon className={css({ marginRight: "4px" })} /> Log in to
              comment
            </ToolbarButton>
          )}
        </ToolbarRoot>
      </ToolbarPositioner>
    </DndContext>
  );
};
