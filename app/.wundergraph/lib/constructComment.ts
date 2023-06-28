import {
  DISCUSSION_OPEN_IN_PREVIEW_TEXT,
  DISCUSSION_PENDING_STATE,
  DISCUSSION_RESOLVED_STATE,
} from "../../src/utils/constants/constants";

export const constructComment = ({
  body,
  meta,
}: {
  meta: {
    timestamp: number;
    x: number;
    y: number;
    path: string;
    href: string;
    resolved?: boolean | undefined;
    selection?: string | undefined;
  };
  body: string;
}) => {
  const jsonMeta = JSON.stringify(meta);

  const encodedJsonMeta = encodeURIComponent(jsonMeta);

  return `${body}

${
  meta.resolved ? DISCUSSION_RESOLVED_STATE : DISCUSSION_PENDING_STATE
} | [${DISCUSSION_OPEN_IN_PREVIEW_TEXT}](${meta.href}#${
    meta.timestamp
  }) <div data-comment-meta="${encodedJsonMeta}" />`;
};
