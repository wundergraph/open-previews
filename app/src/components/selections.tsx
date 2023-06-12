import { useStore } from "@nanostores/react";
import { useMutation, useQuery } from "~/lib/wundergraph";
import { useConfig } from "~/providers/config";
import { $activeSelections } from "~/utils/state/activeSelections";
import { ActiveCommentPin } from "./active-comment-pin";
import { findElementFromPath } from "~/utils/findElementFromPath";

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

  const createComment = useMutation({
    operationName: "CreateComment",
  });

  const activeSelections = useStore($activeSelections);

  const selectionsArray = Object.keys(activeSelections).map((each) => {
    return {
      ...activeSelections[each],
      timeStamp: each,
    };
  });

  return (
    <>
      {selectionsArray.map((each) => {
        const clickedElement = findElementFromPath(each.path) as HTMLElement;

        return (
          <ActiveCommentPin
            pinDetails={{
              element: clickedElement,
              coords: { x: each.x, y: each.y },
              selectionRange: each.selectionRange,
            }}
            onSubmit={() => null}
          />
        );
      })}
    </>
  );
};
