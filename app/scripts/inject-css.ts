import fs from "node:fs";
import path from "node:path";

const dist = path.resolve(__dirname, "../dist");

const injectCSS = (file) => {
  try {
    const styles = fs.readFileSync(`${dist}/style.css`).toString().trim();

    const scriptPath = `${dist}/${file}`;
    const scriptContents = fs.readFileSync(scriptPath).toString();
    fs.writeFileSync(
      scriptPath,
      scriptContents.replace("__STYLES__", styles.replace("\\1f43c", "🐼"))
    );
  } catch {
    console.warn("Could not inject CSS into", file);
  }
};

export const injectCSSPlugin = () => ({
  name: "inject-css-plugin", // the name of your custom plugin. Could be anything.
  closeBundle: async () => {
    injectCSS("index.cjs");
    injectCSS("index.js");
  },
});
