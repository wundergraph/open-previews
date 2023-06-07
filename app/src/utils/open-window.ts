export function openWindow(url: string, winName: string, w: number, h: number) {
  const left = screen.width ? (screen.width - w) / 2 : 0;
  const top = screen.height ? (screen.height - h) / 2 : 0;
  const settings =
    "height=" +
    h +
    ",width=" +
    w +
    ",top=" +
    top +
    ",left=" +
    left +
    ",resizable";
  return window.open(url, winName, settings);
}
