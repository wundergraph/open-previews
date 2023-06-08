import { createRoot } from "react-dom/client";
import { SelectionRange } from "./pathBuilder";
import { rangy } from "./rangy";
import { CommentBox } from "../components/comment-box";

const highlightClassApplier = rangy.createClassApplier("highlight");

function W(e, t) {
  console.log(t, t.startOffset, t.endOffset);
  if (!t) return [];
  if (t.startOffset === t.endOffset) return [];
  try {
    let o = document.createRange(),
      n = document.querySelector(t.startContainerNodeId)?.childNodes[
        t.startContainerTextNodeIndex
      ],
      i = document.querySelector(t.endContainerNodeId)?.childNodes[
        t.endContainerTextNodeIndex
      ];
    o.setStart(n, t.startOffset), o.setEnd(i, t.endOffset);
    let r = e.getBoundingClientRect();
    return Array.from(o.getClientRects()).map((d) => {
      let p = e?.offsetTop + (d.top - r.top);
      return { ...d.toJSON(), top: p };
    });
  } catch {
    return [];
  }
}

var ze = (e) => {
  let t: any[] = [];
  for (; e; ) {
    let o = e.nodeName.toLowerCase(),
      n = e.id ? `#${e.id}` : "",
      i = "";
    e.className &&
      typeof e.className == "string" &&
      (i = `.${e.className
        .trim()
        .replace(/\s+/g, ".")
        .replace(/[:*+?^${}()|[\]\\]/gi, "\\$&")}`),
      t.unshift({ element: e, selector: o + n }),
      (e = e.parentNode !== document ? e.parentNode : !1);
  }
  return t;
};
var je = (e, t = !0) => {
  let o = e,
    n = 1;
  for (; o.previousElementSibling !== null; )
    (!t || o.previousElementSibling.nodeName === e.nodeName) && n++,
      (o = o.previousElementSibling);
  return n;
};
var Je = (e, t) => {
    let o = t === "" ? e : `${t} > ${e}`;
    return document.querySelectorAll(o).length > 1;
  },
  Ve = (e) => {
    let t: any[] = [];
    return (
      e.forEach((o) => {
        Je(o.selector, t.join(" > ")) &&
          (o.selector += `:nth-of-type(${je(o.element)})`),
          t.push(o.selector);
      }),
      t.join(" > ")
    );
  };
function K(e) {
  if (e instanceof HTMLElement) return Ve(ze(e));
}

function w() {
  let y = window.getSelection();
  if (y?.type === "Range")
    try {
      let g = y?.getRangeAt(0),
        b = y?.toString(),
        f = Array.from(g.getClientRects()),
        v = K(y.anchorNode?.parentElement),
        T = K(y.focusNode?.parentElement),
        x = Array.from(y.anchorNode?.parentElement?.childNodes || []).findIndex(
          (A) =>
            A.nodeType === Node.TEXT_NODE && y && A.isEqualNode(y.anchorNode)
        ),
        k = Array.from(y.focusNode?.parentElement?.childNodes || []).findIndex(
          (A) =>
            A.nodeType === Node.TEXT_NODE && y && A.isEqualNode(y.focusNode)
        );
      console.log({
        selectedText: b,
        selection: {
          endOffset: y.focusOffset,
          startOffset: y.anchorOffset,
          endContainerNodeId: T,
          startContainerNodeId: v,
          startContainerTextNodeIndex: x,
          endContainerTextNodeIndex: k,
        },
      });
    } catch {
      return;
    }
}

export const addFloatingUI = (
  element: HTMLElement,
  coords: { x: number; y: number },
  selectionRange?: SelectionRange
): void => {
  const range = window.getSelection()?.getRangeAt(0);
  var node = range?.startContainer;

  const rects = W(node, range);

  console.log("rects", rects);

  const dummyElement = document.createElement("div");
  dummyElement.style.position = "fixed";

  // Function to update the position of the dummy element
  const updatePosition = () => {
    const rect = element.getBoundingClientRect();
    dummyElement.style.left = `${rect.left + coords.x}px`;
    dummyElement.style.top = `${rect.top + coords.y}px`;
  };

  updatePosition();
  document.body.appendChild(dummyElement);

  // Listen to resize and scroll events
  window.addEventListener("resize", updatePosition);
  window.addEventListener("scroll", updatePosition);

  // if (selectionRange) {
  //   const range = rangy.deserializeRange(selectionRange);
  //   console.log({ range });
  //   highlightClassApplier.applyToRange(range);
  // }

  // if (selectionRange?.selectedText) {
  //   const before = element.textContent?.substring(0, selectionRange.start!);
  //   const selected = element.textContent?.substring(
  //     selectionRange.start!,
  //     selectionRange.end!
  //   );
  //   const after = element.textContent?.substring(selectionRange.end!);

  //   // Clear the element's existing content
  //   element.textContent = "";

  //   // Create a new text node for the text before the selection
  //   element.appendChild(document.createTextNode(before || ""));

  //   // Create a new span element for the selected text
  //   const span = document.createElement("span");
  //   span.className = "highlight";
  //   span.textContent = selected ?? "";
  //   element.appendChild(span);

  //   // Create a new text node for the text after the selection
  //   element.appendChild(document.createTextNode(after || ""));
  // }

  createRoot(dummyElement).render(<CommentBox />);
};
