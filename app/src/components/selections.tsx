import React from "react";
import { useMutation, useQuery } from "~/lib/wundergraph";
import { useConfig } from "~/providers/config";
import { addClickListener } from "~/utils";
import { CommentBox } from "./comment-box";

export const Selections = () => {
  const config = useConfig();

  const comments = useQuery({
    operationName: "Comments",
    input: {
      repo: config.repository,
      categoryId: config.categoryId,
      url: window.location.hostname,
    },
  });

  console.log("comments", comments.data);

  const createComment = useMutation({
    operationName: "CreateComment",
  });

  // React.useEffect(() => {
  //   const unsubscribe = addClickListener();
  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);

  const [selection, setSelection] = React.useState({});

  return (
    <>
      {/* {selection && (
        <CommentBox
          onSubmit={(values) => {
            return createComment.trigger({
              discussionId: comments.data?.id,
              meta: {
                x: 100,
                y: 200,
                href: window.location.href,
              },
              body: "Test comment",
            });
          }}
        />
      )} */}
    </>
  );
};
