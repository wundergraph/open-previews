import { CONTROL_ELEMENT_CLASS } from "./constants/constants";

// Code to check if the clicked element is part of Open Preview controls
export const isControlElement = (
  element: HTMLElement | EventTarget | null
): boolean => {
  // If element is null, we've reached the top of the DOM tree without finding the class
  if (!element) {
    return false;
  }

  // Check if element has the class
  // @ts-expect-error
  if (element.classList?.contains(CONTROL_ELEMENT_CLASS)) {
    return true;
  }

  // If not, continue checking up the DOM tree
  // @ts-expect-error
  return isControlElement(element.parentElement);
};
