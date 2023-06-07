import React from "react";
import { useQuery } from "~/lib/wundergraph";
import { useConfig } from "~/providers/config";
import { addClickListener } from "~/utils";

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

  React.useEffect(() => {
    const unsubscribe = addClickListener();
    return () => {
      unsubscribe();
    };
  }, []);

  return null;
};
