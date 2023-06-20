import { rangy } from "./rangy";

export type SelectionRange = string | undefined;

export type PositionData = {
  path: Array<PathStep | string>;
  x: number;
  y: number;
  selectionRange?: SelectionRange;
};

export type PathStep = {
  name: string;
  index: number;
  id: string;
  class: string;
  text?: string;
};

export const pathBuilder = (event: MouseEvent): PositionData => {
  let path: Array<PathStep | string> = [];
  let node = event.target as HTMLElement;

  while (node !== document.body) {
    let index = 1;
    let sibling = node.previousElementSibling;

    while (sibling) {
      if (sibling.nodeName === node.nodeName) {
        index++;
      }
      sibling = sibling.previousElementSibling;
    }

    path.unshift({
      name: node.nodeName,
      index: index,
      id: node.id,
      class: node.className,
      text: node.textContent?.substring(0, 50),
    });

    node = node.parentNode as HTMLElement;
  }

  path.unshift("body");

  // @ts-expect-error
  const rect = event.target?.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  const data: PositionData = {
    path: path,
    x,
    y,
  };

  const selection = rangy.getSelection();
  let serializedSelection: string;

  if (selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    // Check if any text is selected before setting selectionRange
    if (!range.collapsed) {
      serializedSelection = rangy.serializeSelection(selection, true);
      data.selectionRange = serializedSelection;
    }
  }

  return data;
};
