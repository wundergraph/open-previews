import fs from "node:fs";
import path from "node:path";

const injectCSS = (file, dist) => {
  try {
    const styles = fs.readFileSync(`${dist}/style.css`).toString().trim();
    const replaced = styles
      .replace("\\1f43c", "🐼")
      .replace(":where(:root,:host)", ":host")
      .replace(/\\/g, "\\\\")
      .replace(/"/g, '\\"');

    const scriptPath = `${dist}/${file}`;
    const scriptContents = fs.readFileSync(scriptPath).toString();

    fs.writeFileSync(
      scriptPath,
      scriptContents.replace("__STYLES__", replaced)
    );
  } catch (e) {
    console.warn("Could not inject CSS into", file, e.message);
  }
};

export const injectCSSPlugin = ({
  dist = path.resolve(__dirname, "../dist"),
}: {
  dist?: string;
} = {}) => ({
  name: "inject-css-plugin", // the name of your custom plugin. Could be anything.
  closeBundle: async () => {
    injectCSS("index.cjs", dist);
    injectCSS("index.js", dist);
  },
});
