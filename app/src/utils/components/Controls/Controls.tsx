import React from "react";
import { Draggable } from "../../../components/Draggable";
import { useStore } from "@nanostores/react";
import { $commentMode, toggleCommentMode } from "../../state/commentMode";

export const Controls: React.FC = () => {
  const isCommentModeOn = useStore($commentMode);

  return (
    <Draggable>
      <button onClick={toggleCommentMode}>
        {isCommentModeOn ? "cancel" : "add comment!"}
      </button>
    </Draggable>
  );
};
