import React from "react";

export const useClipboard = (text: string) => {
  const [copied, setCopied] = React.useState(false);
  const [value, setValue] = React.useState(text);

  const copy = React.useCallback((value: string) => {
    const el = document.createElement("textarea");
    el.value = value;
    el.setAttribute("readonly", "");
    el.style.position = "absolute";
    el.style.left = "-9999px";
    document.body.appendChild(el);
    const selection = document.getSelection();
    const selected =
      selection && selection.rangeCount > 0 ? selection.getRangeAt(0) : false;
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    if (selected) {
      selection?.removeAllRanges();
      selection?.addRange(selected);
    }
  }, []);

  React.useEffect(() => {
    if (copied) {
      copy(value);
      const to = setTimeout(setCopied, 1000, false);
      return () => clearTimeout(to);
    }
  }, [copied, value]);

  return {
    copied,
    value,
    setValue,
    onCopy: () => setCopied(true),
  };
};
