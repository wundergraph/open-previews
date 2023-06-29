import { CommentsDataType } from "./selections";
import { FC } from "react";
import { cleanCommentText } from "~/utils/cleanCommentText";
import { getUrlFromCommentText } from "~/utils/getUrlFromCommentText";
import { DISCUSSION_RESOLVED_STATE } from "~/utils/constants/constants";
import { Box, Flex, Stack, styled } from "../../styled-system/jsx";
import { Avatar } from "./ui/avatar";
import { Button, IconButton } from "./ui/button";
import { CheckIcon } from "./icons/check";
import { Text } from "./ui/layout";

const TAGS = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
);

const DiscussionsContainer = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
    position: "fixed",
    top: "40px",
    right: "40px",
    maxWidth: "400px",
    maxHeight: "80vh",
    borderRadius: "4px",
    minWidth: "320px",
    backgroundColor: "bg.surface",
    backdropFilter: "blur(20px)",
    border: "1px solid",
    borderColor: "border.default",
    boxShadow:
      "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
    animationDuration: "400ms",
    animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
    willChange: "transform, opacity",
    fontSize: "sm",
    _focusVisible: { outline: "none" },
    "&[data-state=open]": {
      opacity: 1,
      transform: "translateY(0)",
      '&[data-side="top"]': { animationName: "slideDownAndFade" },
      '&[data-side="right"]': { animationName: "slideLeftAndFade" },
      '&[data-side="bottom"]': { animationName: "slideUpAndFade" },
      '&[data-side="left"]': { animationName: "slideRightAndFade" },
    },
  },
});

const Header = styled("div", {
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: "1px solid",
    borderColor: "border.default",
    p: "8px 12px",
  },
});

const Title = styled("h2", {
  base: {
    fontSize: "sm",
    fontWeight: "medium",
  },
});

export interface AllDiscussionsProps {
  comments: CommentsDataType["comments"];
}

export const AllDiscussions: FC<AllDiscussionsProps> = ({ comments }) => {
  return (
    <DiscussionsContainer>
      <Header>
        <Title>Comments</Title>
      </Header>
      <Box overflow="auto" flex="1">
        {comments?.map((comment) => {
          const url = getUrlFromCommentText(comment.body);
          let pathname: string | undefined;
          try {
            let urlObject = new URL(url ?? "");
            pathname = urlObject.pathname;
          } catch {
            // do nothing
          }

          const isResolved = comment.body.includes(DISCUSSION_RESOLVED_STATE);

          return (
            <Box
              key={comment.id}
              borderBottom="1px solid"
              borderColor="border.default"
            >
              <Stack py="8px" px="12px" direction="row" alignItems="center">
                <Avatar
                  src={comment?.author?.avatarUrl}
                  name={comment?.author?.login}
                  size="sm"
                />
                <Text fontWeight="medium">{comment?.author?.login}</Text>

                <Stack direction="row" flex="1" justifyContent="flex-end">
                  {!isResolved ? (
                    <IconButton aria-label="Resolve">
                      <CheckIcon />
                    </IconButton>
                  ) : (
                    <IconButton aria-label="Un-resolve">
                      <CheckIcon />
                    </IconButton>
                  )}
                </Stack>
              </Stack>

              <Flex
                pb="8px"
                px="12px"
                gap="4px"
                flexDir="column"
                alignItems="flex-start"
              >
                <p>{cleanCommentText(comment.body)}</p>

                <Stack
                  border="1px solid"
                  borderColor="border.default"
                  p="4px"
                  mb="4px"
                  rounded="4px"
                  w="full"
                  boxShadow="xs"
                >
                  <p>{pathname}</p>
                </Stack>

                <Button
                  onClick={() => url && (window.location.href = url)}
                  size="md"
                >
                  View
                </Button>
              </Flex>
            </Box>
          );
        })}
      </Box>
    </DiscussionsContainer>
  );
};
