import { PathStep } from "./pathBuilder";

export const findElementFromPath = (
  path: Array<PathStep | string>
): HTMLElement | null => {
  let node: HTMLElement | null = document.body;

  for (let i = 1; i < path.length; i++) {
    let step = path[i] as PathStep;
    let index = 0;

    for (let childNode of Array.from(node.children)) {
      if (childNode.nodeName === step.name) {
        index++;
      }

      if (
        index === step.index &&
        childNode.id === step.id &&
        childNode.className === step.class &&
        childNode.textContent?.startsWith(step.text ?? "")
      ) {
        node = childNode as HTMLElement;
        break;
      }
    }
  }

  return node;
};
