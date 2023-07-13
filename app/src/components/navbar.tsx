import { useStore } from "@nanostores/react";
import { $commentMode, toggleCommentMode } from "~/stores/comment-mode";
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
import React, { FC, useEffect } from "react";
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
import { Box, Flex, Stack } from "../../styled-system/jsx";
import { Text } from "./ui/layout";
import { Link } from "./ui/link";
import { EyeCloseIcon } from "./icons/eye-close";
import { BranchIcon } from "./icons/branch";
import { LogoutIcon } from "./icons/logout";
import { toggleDiscussionsOverlayMode } from "~/stores/discussions-overlay-mode";
import { InboxIcon } from "./icons/inbox";
import { $openPreviewConfig } from "~/stores/config";
import { useUser } from "~/hooks/use-user";
import { disableWidget } from "~/stores/widget-active";

const NavbarPositioner = (props) => {
  const { x, y, ...rest } = props;
  const { attributes, listeners, transform, setNodeRef, node } = useDraggable({
    id: "open-previews-navbar",
  });

  return (
    <Box
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      _focusVisible={{
        outline: 'none',
        position: "relative",
        boxShadow: "0 0 0 2px token(colors.pink.500)",
      }}
      style={
        {
          position: "fixed",
          zIndex: "20000",
          left: x,
          top: y,
          bottom: y ? undefined : '40px',
          "--translate-x": `${(transform?.x ?? 0)}px`,
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

export const Navbar: FC = () => {
  const { login, logout } = useAuth();
  const { data: user } = useUser();
  const navbarRef = React.useRef<HTMLDivElement>(null);
  const isCommentModeOn = useStore($commentMode);

  const startRef = React.useRef<{x: number; y: number} | null>(null);
  const [coordinates, setCoordinates] = React.useState<{ x: number; y: number } | undefined>();

  useEffect(() => {
    const handleResize = () => {
      if (navbarRef.current && coordinates) {
        const { x, y } = navbarRef.current.getBoundingClientRect();
        setCoordinates({ x, y });
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [])

  return (
    <DndContext
      onDragStart={() => {
        const rect = navbarRef.current?.getBoundingClientRect();
        if (rect) {
          startRef.current = {x: rect.x, y: rect.y}
        }
      }}
      onDragEnd={({ delta }) => {
        setCoordinates((coordinates) => {
          const { x, y } = coordinates || startRef.current || { x: 0, y: 0 };
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
      <Flex
        position="fixed"
        pointerEvents="none"
        justifyContent="center"
        alignItems="flex-end"
        top="0"
        left="0"
        w="100vw"
        h="100vh"
        zIndex="20000"
      >
        <NavbarPositioner {...coordinates}>
          <ToolbarRoot gap="4px" ref={navbarRef} pointerEvents="all">
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
                  <Avatar src={user.avatar} name={user.username} size="md" />
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
      </Flex>
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
            <DropdownMenuItem onClick={() => disableWidget()}>
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
            <Stack p="4px" gap="2px">
              <Text fontWeight="bold">Open previews</Text>
              <Text color="fg.muted" fontSize='xs'>
                Collect feedback from your entire team. Comment on content, components and pages.
              </Text>
              <Link href="https://openpreviews.com" target="_blank noopener" fontSize="xs" _hover={{textDecoration: 'underline'}}>
                Learn more
              </Link>
            </Stack>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => disableWidget()}>
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
