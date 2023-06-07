export const createHighlightDivs = (range: any): HTMLDivElement[] => {
  const rects = Array.from(range.nativeRange.getClientRects());
  const highlightDivs = rects.map((rect: any) => {
    const div = document.createElement("div");
    div.classList.add("highlight");
    div.style.position = "absolute";
    div.style.left = `${rect.left + window.scrollX}px`;
    div.style.top = `${rect.top + window.scrollY}px`;
    div.style.width = `${rect.width}px`;
    div.style.height = `${rect.height}px`;
    div.style.backgroundColor = "yellow";
    div.style.opacity = "0.5";
    div.style.pointerEvents = "none";
    return div;
  });

  highlightDivs.forEach((div) => document.body.appendChild(div));

  return highlightDivs;
};
