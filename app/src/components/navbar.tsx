import { useStore } from "@nanostores/react";
import { $commentMode, toggleCommentMode } from "~/utils/state/commentMode";
import { LoginIcon } from "./icons/login";
import { DndContext, PointerSensor, useDraggable } from "@dnd-kit/core";

import {
  ToolbarButton,
  ToolbarIconButton,
  Toolbar as ToolbarRoot,
  ToolbarSeparator,
  ToolbarToggleGroup,
  ToolbarToggleItem,
} from "./ui/toolbar";

import { CommentIcon } from "./icons/comment";
import { XIcon } from "./icons/x";
import React, { FC, MutableRefObject } from "react";
import { useAuth } from "~/lib/auth";

import { css } from "../../styled-system/css";
import { HamburgerIcon } from "./icons/hamburger";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuArrow,
  DropdownMenuIcon,
} from "./ui/menu";
import { Avatar } from "./ui/avatar";
import { Stack } from "../../styled-system/jsx";
import { Link, Text } from "./ui/layout";
import { EyeCloseIcon } from "./icons/eye-close";
import { BranchIcon } from "./icons/branch";
import { LogoutIcon } from "./icons/logout";
import { toggleDiscussionsOverlayMode } from "~/utils/state/discussionsOverlayMode";
import { InboxIcon } from "./icons/inbox";
import { $openPreviewConfig } from "~/utils/state/openPreviewConfig";
import { UserDisplayDetails } from "./comment-thread";
import { useUser } from "~/hooks/use-user";
import { SESSION_STORAGE_WIDGET_ACTIVE } from "~/utils/constants/constants";
import { removeOpenPreviewsForSession } from "~/utils/state/rootElementReference";

const NavbarPositioner = (props) => {
  const { x, y, ...rest } = props;
  const { attributes, listeners, isDragging, transform, setNodeRef } =
    useDraggable({
      id: "open-previews-navbar",
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

export interface NavbarProps {
  userDetails: UserDisplayDetails;
}

export const Navbar: FC<NavbarProps> = ({ userDetails }) => {
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
      <NavbarPositioner x={x} y={y}>
        <ToolbarRoot gap="4px">
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
              <ToolbarIconButton
                onClick={() => toggleDiscussionsOverlayMode()}
                aria-label="All Discussions"
              >
                <InboxIcon />
              </ToolbarIconButton>
              <ToolbarSeparator />
              <ToolbarIconButton onClick={() => logout()}>
                <Avatar
                  src={userDetails.profilePicURL}
                  name={userDetails.username}
                  size="md"
                />
              </ToolbarIconButton>
            </>
          ) : (
            <ToolbarButton onClick={() => login()} p="0 12px">
              <LoginIcon className={css({ marginRight: "4px" })} /> Log in to
              comment
            </ToolbarButton>
          )}
          <ToolbarSeparator />
          <HamburgerMenu />
        </ToolbarRoot>
      </NavbarPositioner>
    </DndContext>
  );
};

const HamburgerMenu = () => {
  const { logout } = useAuth();
  const { data: user } = useUser();

  const config = useStore($openPreviewConfig);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <ToolbarIconButton>
          <HamburgerIcon />
        </ToolbarIconButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="top">
        <DropdownMenuArrow />
        {user ? (
          <>
            <DropdownMenuItem
              onClick={() =>
                window.open(`https://github.com/${config.repository}`, "_blank")
              }
            >
              <DropdownMenuIcon>
                <BranchIcon />
              </DropdownMenuIcon>
              View repository
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                removeOpenPreviewsForSession();
              }}
            >
              <DropdownMenuIcon>
                <EyeCloseIcon />
              </DropdownMenuIcon>
              Hide this session
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => logout()}>
              <DropdownMenuIcon>
                <LogoutIcon />
              </DropdownMenuIcon>
              Log out
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <Stack p="4px">
              <Text fontWeight="bold">Open previews</Text>
              <Text color="fg.muted">
                Add commenting functionality and collaborate with your team on
                any page.
              </Text>
              <Link href="https://openpreviews.com" target="_blank noopener">
                Learn more
              </Link>
            </Stack>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                // @ts-expect-error
                root?.current ? root.current?.unMount() : root?.remove();
                sessionStorage.setItem(SESSION_STORAGE_WIDGET_ACTIVE, "false");
              }}
            >
              <DropdownMenuIcon>
                <EyeCloseIcon />
              </DropdownMenuIcon>
              Hide this session
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
