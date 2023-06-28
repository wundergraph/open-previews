import { DISCUSSION_OPEN_IN_PREVIEW_TEXT } from "./constants/constants";

export const getUrlFromCommentText = (comment: string): string | undefined => {
  const previewlinkRegex = new RegExp(
    `\\[${DISCUSSION_OPEN_IN_PREVIEW_TEXT}]\\(([^)]+)\\)`
  );
  const match = previewlinkRegex.exec(comment);
  if (match && match[1]) {
    return match[1];
  }
  return undefined;
};
