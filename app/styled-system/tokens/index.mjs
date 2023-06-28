const tokens = {
  "borders.none": {
    "value": "none",
    "variable": "var(--op-borders-none)"
  },
  "easings.default": {
    "value": "cubic-bezier(0.4, 0, 0.2, 1)",
    "variable": "var(--op-easings-default)"
  },
  "easings.linear": {
    "value": "linear",
    "variable": "var(--op-easings-linear)"
  },
  "easings.in": {
    "value": "cubic-bezier(0.4, 0, 1, 1)",
    "variable": "var(--op-easings-in)"
  },
  "easings.out": {
    "value": "cubic-bezier(0, 0, 0.2, 1)",
    "variable": "var(--op-easings-out)"
  },
  "easings.in-out": {
    "value": "cubic-bezier(0.4, 0, 0.2, 1)",
    "variable": "var(--op-easings-in-out)"
  },
  "durations.fastest": {
    "value": "50ms",
    "variable": "var(--op-durations-fastest)"
  },
  "durations.faster": {
    "value": "100ms",
    "variable": "var(--op-durations-faster)"
  },
  "durations.fast": {
    "value": "150ms",
    "variable": "var(--op-durations-fast)"
  },
  "durations.normal": {
    "value": "200ms",
    "variable": "var(--op-durations-normal)"
  },
  "durations.slow": {
    "value": "300ms",
    "variable": "var(--op-durations-slow)"
  },
  "durations.slower": {
    "value": "400ms",
    "variable": "var(--op-durations-slower)"
  },
  "durations.slowest": {
    "value": "500ms",
    "variable": "var(--op-durations-slowest)"
  },
  "radii.xs": {
    "value": "0.125rem",
    "variable": "var(--op-radii-xs)"
  },
  "radii.sm": {
    "value": "0.25rem",
    "variable": "var(--op-radii-sm)"
  },
  "radii.md": {
    "value": "0.375rem",
    "variable": "var(--op-radii-md)"
  },
  "radii.lg": {
    "value": "0.5rem",
    "variable": "var(--op-radii-lg)"
  },
  "radii.xl": {
    "value": "0.75rem",
    "variable": "var(--op-radii-xl)"
  },
  "radii.2xl": {
    "value": "1rem",
    "variable": "var(--op-radii-2xl)"
  },
  "radii.3xl": {
    "value": "1.5rem",
    "variable": "var(--op-radii-3xl)"
  },
  "radii.full": {
    "value": "9999px",
    "variable": "var(--op-radii-full)"
  },
  "fontWeights.thin": {
    "value": "100",
    "variable": "var(--op-font-weights-thin)"
  },
  "fontWeights.extralight": {
    "value": "200",
    "variable": "var(--op-font-weights-extralight)"
  },
  "fontWeights.light": {
    "value": "300",
    "variable": "var(--op-font-weights-light)"
  },
  "fontWeights.normal": {
    "value": "400",
    "variable": "var(--op-font-weights-normal)"
  },
  "fontWeights.medium": {
    "value": "500",
    "variable": "var(--op-font-weights-medium)"
  },
  "fontWeights.semibold": {
    "value": "600",
    "variable": "var(--op-font-weights-semibold)"
  },
  "fontWeights.bold": {
    "value": "700",
    "variable": "var(--op-font-weights-bold)"
  },
  "fontWeights.extrabold": {
    "value": "800",
    "variable": "var(--op-font-weights-extrabold)"
  },
  "fontWeights.black": {
    "value": "900",
    "variable": "var(--op-font-weights-black)"
  },
  "lineHeights.none": {
    "value": "1",
    "variable": "var(--op-line-heights-none)"
  },
  "lineHeights.tight": {
    "value": "1.25",
    "variable": "var(--op-line-heights-tight)"
  },
  "lineHeights.snug": {
    "value": "1.375",
    "variable": "var(--op-line-heights-snug)"
  },
  "lineHeights.normal": {
    "value": "1.5",
    "variable": "var(--op-line-heights-normal)"
  },
  "lineHeights.relaxed": {
    "value": "1.625",
    "variable": "var(--op-line-heights-relaxed)"
  },
  "lineHeights.loose": {
    "value": "2",
    "variable": "var(--op-line-heights-loose)"
  },
  "fonts.sans": {
    "value": "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\"",
    "variable": "var(--op-fonts-sans)"
  },
  "fonts.serif": {
    "value": "ui-serif, Georgia, Cambria, \"Times New Roman\", Times, serif",
    "variable": "var(--op-fonts-serif)"
  },
  "fonts.mono": {
    "value": "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace",
    "variable": "var(--op-fonts-mono)"
  },
  "letterSpacings.tighter": {
    "value": "-0.05em",
    "variable": "var(--op-letter-spacings-tighter)"
  },
  "letterSpacings.tight": {
    "value": "-0.025em",
    "variable": "var(--op-letter-spacings-tight)"
  },
  "letterSpacings.normal": {
    "value": "0em",
    "variable": "var(--op-letter-spacings-normal)"
  },
  "letterSpacings.wide": {
    "value": "0.025em",
    "variable": "var(--op-letter-spacings-wide)"
  },
  "letterSpacings.wider": {
    "value": "0.05em",
    "variable": "var(--op-letter-spacings-wider)"
  },
  "letterSpacings.widest": {
    "value": "0.1em",
    "variable": "var(--op-letter-spacings-widest)"
  },
  "fontSizes.2xs": {
    "value": "0.5rem",
    "variable": "var(--op-font-sizes-2xs)"
  },
  "fontSizes.xs": {
    "value": "0.75rem",
    "variable": "var(--op-font-sizes-xs)"
  },
  "fontSizes.sm": {
    "value": "0.875rem",
    "variable": "var(--op-font-sizes-sm)"
  },
  "fontSizes.md": {
    "value": "1rem",
    "variable": "var(--op-font-sizes-md)"
  },
  "fontSizes.lg": {
    "value": "1.125rem",
    "variable": "var(--op-font-sizes-lg)"
  },
  "fontSizes.xl": {
    "value": "1.25rem",
    "variable": "var(--op-font-sizes-xl)"
  },
  "fontSizes.2xl": {
    "value": "1.5rem",
    "variable": "var(--op-font-sizes-2xl)"
  },
  "fontSizes.3xl": {
    "value": "1.875rem",
    "variable": "var(--op-font-sizes-3xl)"
  },
  "fontSizes.4xl": {
    "value": "2.25rem",
    "variable": "var(--op-font-sizes-4xl)"
  },
  "fontSizes.5xl": {
    "value": "3rem",
    "variable": "var(--op-font-sizes-5xl)"
  },
  "fontSizes.6xl": {
    "value": "3.75rem",
    "variable": "var(--op-font-sizes-6xl)"
  },
  "fontSizes.7xl": {
    "value": "4.5rem",
    "variable": "var(--op-font-sizes-7xl)"
  },
  "fontSizes.8xl": {
    "value": "6rem",
    "variable": "var(--op-font-sizes-8xl)"
  },
  "fontSizes.9xl": {
    "value": "8rem",
    "variable": "var(--op-font-sizes-9xl)"
  },
  "shadows.xs": {
    "value": "var(--op-shadows-xs)",
    "variable": "var(--op-shadows-xs)"
  },
  "shadows.sm": {
    "value": "var(--op-shadows-sm)",
    "variable": "var(--op-shadows-sm)"
  },
  "shadows.md": {
    "value": "var(--op-shadows-md)",
    "variable": "var(--op-shadows-md)"
  },
  "shadows.lg": {
    "value": "var(--op-shadows-lg)",
    "variable": "var(--op-shadows-lg)"
  },
  "shadows.xl": {
    "value": "var(--op-shadows-xl)",
    "variable": "var(--op-shadows-xl)"
  },
  "shadows.2xl": {
    "value": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    "variable": "var(--op-shadows-2xl)"
  },
  "shadows.inner": {
    "value": "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
    "variable": "var(--op-shadows-inner)"
  },
  "colors.current": {
    "value": "currentColor",
    "variable": "var(--op-colors-current)"
  },
  "colors.black": {
    "value": "#000",
    "variable": "var(--op-colors-black)"
  },
  "colors.white": {
    "value": "#fff",
    "variable": "var(--op-colors-white)"
  },
  "colors.transparent": {
    "value": "rgb(0 0 0 / 0)",
    "variable": "var(--op-colors-transparent)"
  },
  "colors.rose.50": {
    "value": "#fff1f2",
    "variable": "var(--op-colors-rose-50)"
  },
  "colors.rose.100": {
    "value": "#ffe4e6",
    "variable": "var(--op-colors-rose-100)"
  },
  "colors.rose.200": {
    "value": "#fecdd3",
    "variable": "var(--op-colors-rose-200)"
  },
  "colors.rose.300": {
    "value": "#fda4af",
    "variable": "var(--op-colors-rose-300)"
  },
  "colors.rose.400": {
    "value": "#fb7185",
    "variable": "var(--op-colors-rose-400)"
  },
  "colors.rose.500": {
    "value": "#f43f5e",
    "variable": "var(--op-colors-rose-500)"
  },
  "colors.rose.600": {
    "value": "#e11d48",
    "variable": "var(--op-colors-rose-600)"
  },
  "colors.rose.700": {
    "value": "#be123c",
    "variable": "var(--op-colors-rose-700)"
  },
  "colors.rose.800": {
    "value": "#9f1239",
    "variable": "var(--op-colors-rose-800)"
  },
  "colors.rose.900": {
    "value": "#881337",
    "variable": "var(--op-colors-rose-900)"
  },
  "colors.pink.50": {
    "value": "#fdf2f8",
    "variable": "var(--op-colors-pink-50)"
  },
  "colors.pink.100": {
    "value": "#fce7f3",
    "variable": "var(--op-colors-pink-100)"
  },
  "colors.pink.200": {
    "value": "#fbcfe8",
    "variable": "var(--op-colors-pink-200)"
  },
  "colors.pink.300": {
    "value": "#f9a8d4",
    "variable": "var(--op-colors-pink-300)"
  },
  "colors.pink.400": {
    "value": "#f472b6",
    "variable": "var(--op-colors-pink-400)"
  },
  "colors.pink.500": {
    "value": "#ec4899",
    "variable": "var(--op-colors-pink-500)"
  },
  "colors.pink.600": {
    "value": "#db2777",
    "variable": "var(--op-colors-pink-600)"
  },
  "colors.pink.700": {
    "value": "#be185d",
    "variable": "var(--op-colors-pink-700)"
  },
  "colors.pink.800": {
    "value": "#9d174d",
    "variable": "var(--op-colors-pink-800)"
  },
  "colors.pink.900": {
    "value": "#831843",
    "variable": "var(--op-colors-pink-900)"
  },
  "colors.fuchsia.50": {
    "value": "#fdf4ff",
    "variable": "var(--op-colors-fuchsia-50)"
  },
  "colors.fuchsia.100": {
    "value": "#fae8ff",
    "variable": "var(--op-colors-fuchsia-100)"
  },
  "colors.fuchsia.200": {
    "value": "#f5d0fe",
    "variable": "var(--op-colors-fuchsia-200)"
  },
  "colors.fuchsia.300": {
    "value": "#f0abfc",
    "variable": "var(--op-colors-fuchsia-300)"
  },
  "colors.fuchsia.400": {
    "value": "#e879f9",
    "variable": "var(--op-colors-fuchsia-400)"
  },
  "colors.fuchsia.500": {
    "value": "#d946ef",
    "variable": "var(--op-colors-fuchsia-500)"
  },
  "colors.fuchsia.600": {
    "value": "#c026d3",
    "variable": "var(--op-colors-fuchsia-600)"
  },
  "colors.fuchsia.700": {
    "value": "#a21caf",
    "variable": "var(--op-colors-fuchsia-700)"
  },
  "colors.fuchsia.800": {
    "value": "#86198f",
    "variable": "var(--op-colors-fuchsia-800)"
  },
  "colors.fuchsia.900": {
    "value": "#701a75",
    "variable": "var(--op-colors-fuchsia-900)"
  },
  "colors.purple.50": {
    "value": "#f5f3ff",
    "variable": "var(--op-colors-purple-50)"
  },
  "colors.purple.100": {
    "value": "#ede9fe",
    "variable": "var(--op-colors-purple-100)"
  },
  "colors.purple.200": {
    "value": "#ddd6fe",
    "variable": "var(--op-colors-purple-200)"
  },
  "colors.purple.300": {
    "value": "#c4b5fd",
    "variable": "var(--op-colors-purple-300)"
  },
  "colors.purple.400": {
    "value": "#a78bfa",
    "variable": "var(--op-colors-purple-400)"
  },
  "colors.purple.500": {
    "value": "#8b5cf6",
    "variable": "var(--op-colors-purple-500)"
  },
  "colors.purple.600": {
    "value": "#7c3aed",
    "variable": "var(--op-colors-purple-600)"
  },
  "colors.purple.700": {
    "value": "#6d28d9",
    "variable": "var(--op-colors-purple-700)"
  },
  "colors.purple.800": {
    "value": "#5b21b6",
    "variable": "var(--op-colors-purple-800)"
  },
  "colors.purple.900": {
    "value": "#4c1d95",
    "variable": "var(--op-colors-purple-900)"
  },
  "colors.indigo.50": {
    "value": "#eef2ff",
    "variable": "var(--op-colors-indigo-50)"
  },
  "colors.indigo.100": {
    "value": "#e0e7ff",
    "variable": "var(--op-colors-indigo-100)"
  },
  "colors.indigo.200": {
    "value": "#c7d2fe",
    "variable": "var(--op-colors-indigo-200)"
  },
  "colors.indigo.300": {
    "value": "#a5b4fc",
    "variable": "var(--op-colors-indigo-300)"
  },
  "colors.indigo.400": {
    "value": "#818cf8",
    "variable": "var(--op-colors-indigo-400)"
  },
  "colors.indigo.500": {
    "value": "#6366f1",
    "variable": "var(--op-colors-indigo-500)"
  },
  "colors.indigo.600": {
    "value": "#4f46e5",
    "variable": "var(--op-colors-indigo-600)"
  },
  "colors.indigo.700": {
    "value": "#4338ca",
    "variable": "var(--op-colors-indigo-700)"
  },
  "colors.indigo.800": {
    "value": "#3730a3",
    "variable": "var(--op-colors-indigo-800)"
  },
  "colors.indigo.900": {
    "value": "#312e81",
    "variable": "var(--op-colors-indigo-900)"
  },
  "colors.blue.50": {
    "value": "#eff6ff",
    "variable": "var(--op-colors-blue-50)"
  },
  "colors.blue.100": {
    "value": "#dbeafe",
    "variable": "var(--op-colors-blue-100)"
  },
  "colors.blue.200": {
    "value": "#bfdbfe",
    "variable": "var(--op-colors-blue-200)"
  },
  "colors.blue.300": {
    "value": "#93c5fd",
    "variable": "var(--op-colors-blue-300)"
  },
  "colors.blue.400": {
    "value": "#60a5fa",
    "variable": "var(--op-colors-blue-400)"
  },
  "colors.blue.500": {
    "value": "#3b82f6",
    "variable": "var(--op-colors-blue-500)"
  },
  "colors.blue.600": {
    "value": "#2563eb",
    "variable": "var(--op-colors-blue-600)"
  },
  "colors.blue.700": {
    "value": "#1d4ed8",
    "variable": "var(--op-colors-blue-700)"
  },
  "colors.blue.800": {
    "value": "#1e40af",
    "variable": "var(--op-colors-blue-800)"
  },
  "colors.blue.900": {
    "value": "#1e3a8a",
    "variable": "var(--op-colors-blue-900)"
  },
  "colors.sky.50": {
    "value": "#f0f9ff",
    "variable": "var(--op-colors-sky-50)"
  },
  "colors.sky.100": {
    "value": "#e0f2fe",
    "variable": "var(--op-colors-sky-100)"
  },
  "colors.sky.200": {
    "value": "#bae6fd",
    "variable": "var(--op-colors-sky-200)"
  },
  "colors.sky.300": {
    "value": "#7dd3fc",
    "variable": "var(--op-colors-sky-300)"
  },
  "colors.sky.400": {
    "value": "#38bdf8",
    "variable": "var(--op-colors-sky-400)"
  },
  "colors.sky.500": {
    "value": "#0ea5e9",
    "variable": "var(--op-colors-sky-500)"
  },
  "colors.sky.600": {
    "value": "#0284c7",
    "variable": "var(--op-colors-sky-600)"
  },
  "colors.sky.700": {
    "value": "#0369a1",
    "variable": "var(--op-colors-sky-700)"
  },
  "colors.sky.800": {
    "value": "#075985",
    "variable": "var(--op-colors-sky-800)"
  },
  "colors.sky.900": {
    "value": "#0c4a6e",
    "variable": "var(--op-colors-sky-900)"
  },
  "colors.cyan.50": {
    "value": "#ecfeff",
    "variable": "var(--op-colors-cyan-50)"
  },
  "colors.cyan.100": {
    "value": "#cffafe",
    "variable": "var(--op-colors-cyan-100)"
  },
  "colors.cyan.200": {
    "value": "#a5f3fc",
    "variable": "var(--op-colors-cyan-200)"
  },
  "colors.cyan.300": {
    "value": "#67e8f9",
    "variable": "var(--op-colors-cyan-300)"
  },
  "colors.cyan.400": {
    "value": "#22d3ee",
    "variable": "var(--op-colors-cyan-400)"
  },
  "colors.cyan.500": {
    "value": "#06b6d4",
    "variable": "var(--op-colors-cyan-500)"
  },
  "colors.cyan.600": {
    "value": "#0891b2",
    "variable": "var(--op-colors-cyan-600)"
  },
  "colors.cyan.700": {
    "value": "#0e7490",
    "variable": "var(--op-colors-cyan-700)"
  },
  "colors.cyan.800": {
    "value": "#155e75",
    "variable": "var(--op-colors-cyan-800)"
  },
  "colors.cyan.900": {
    "value": "#164e63",
    "variable": "var(--op-colors-cyan-900)"
  },
  "colors.teal.50": {
    "value": "#f0fdfa",
    "variable": "var(--op-colors-teal-50)"
  },
  "colors.teal.100": {
    "value": "#ccfbf1",
    "variable": "var(--op-colors-teal-100)"
  },
  "colors.teal.200": {
    "value": "#99f6e4",
    "variable": "var(--op-colors-teal-200)"
  },
  "colors.teal.300": {
    "value": "#5eead4",
    "variable": "var(--op-colors-teal-300)"
  },
  "colors.teal.400": {
    "value": "#2dd4bf",
    "variable": "var(--op-colors-teal-400)"
  },
  "colors.teal.500": {
    "value": "#14b8a6",
    "variable": "var(--op-colors-teal-500)"
  },
  "colors.teal.600": {
    "value": "#0d9488",
    "variable": "var(--op-colors-teal-600)"
  },
  "colors.teal.700": {
    "value": "#0f766e",
    "variable": "var(--op-colors-teal-700)"
  },
  "colors.teal.800": {
    "value": "#115e59",
    "variable": "var(--op-colors-teal-800)"
  },
  "colors.teal.900": {
    "value": "#134e4a",
    "variable": "var(--op-colors-teal-900)"
  },
  "colors.green.50": {
    "value": "#ecfdf5",
    "variable": "var(--op-colors-green-50)"
  },
  "colors.green.100": {
    "value": "#d1fae5",
    "variable": "var(--op-colors-green-100)"
  },
  "colors.green.200": {
    "value": "#a7f3d0",
    "variable": "var(--op-colors-green-200)"
  },
  "colors.green.300": {
    "value": "#6ee7b7",
    "variable": "var(--op-colors-green-300)"
  },
  "colors.green.400": {
    "value": "#34d399",
    "variable": "var(--op-colors-green-400)"
  },
  "colors.green.500": {
    "value": "#10b981",
    "variable": "var(--op-colors-green-500)"
  },
  "colors.green.600": {
    "value": "#059669",
    "variable": "var(--op-colors-green-600)"
  },
  "colors.green.700": {
    "value": "#047857",
    "variable": "var(--op-colors-green-700)"
  },
  "colors.green.800": {
    "value": "#065f46",
    "variable": "var(--op-colors-green-800)"
  },
  "colors.green.900": {
    "value": "#064e3b",
    "variable": "var(--op-colors-green-900)"
  },
  "colors.lime.50": {
    "value": "#f7fee7",
    "variable": "var(--op-colors-lime-50)"
  },
  "colors.lime.100": {
    "value": "#ecfccb",
    "variable": "var(--op-colors-lime-100)"
  },
  "colors.lime.200": {
    "value": "#d9f99d",
    "variable": "var(--op-colors-lime-200)"
  },
  "colors.lime.300": {
    "value": "#bef264",
    "variable": "var(--op-colors-lime-300)"
  },
  "colors.lime.400": {
    "value": "#a3e635",
    "variable": "var(--op-colors-lime-400)"
  },
  "colors.lime.500": {
    "value": "#84cc16",
    "variable": "var(--op-colors-lime-500)"
  },
  "colors.lime.600": {
    "value": "#65a30d",
    "variable": "var(--op-colors-lime-600)"
  },
  "colors.lime.700": {
    "value": "#4d7c0f",
    "variable": "var(--op-colors-lime-700)"
  },
  "colors.lime.800": {
    "value": "#3f6212",
    "variable": "var(--op-colors-lime-800)"
  },
  "colors.lime.900": {
    "value": "#365314",
    "variable": "var(--op-colors-lime-900)"
  },
  "colors.yellow.50": {
    "value": "#fffbeb",
    "variable": "var(--op-colors-yellow-50)"
  },
  "colors.yellow.100": {
    "value": "#fef3c7",
    "variable": "var(--op-colors-yellow-100)"
  },
  "colors.yellow.200": {
    "value": "#fde68a",
    "variable": "var(--op-colors-yellow-200)"
  },
  "colors.yellow.300": {
    "value": "#fcd34d",
    "variable": "var(--op-colors-yellow-300)"
  },
  "colors.yellow.400": {
    "value": "#fbbf24",
    "variable": "var(--op-colors-yellow-400)"
  },
  "colors.yellow.500": {
    "value": "#f59e0b",
    "variable": "var(--op-colors-yellow-500)"
  },
  "colors.yellow.600": {
    "value": "#d97706",
    "variable": "var(--op-colors-yellow-600)"
  },
  "colors.yellow.700": {
    "value": "#b45309",
    "variable": "var(--op-colors-yellow-700)"
  },
  "colors.yellow.800": {
    "value": "#92400e",
    "variable": "var(--op-colors-yellow-800)"
  },
  "colors.yellow.900": {
    "value": "#78350f",
    "variable": "var(--op-colors-yellow-900)"
  },
  "colors.orange.50": {
    "value": "#fff7ed",
    "variable": "var(--op-colors-orange-50)"
  },
  "colors.orange.100": {
    "value": "#ffedd5",
    "variable": "var(--op-colors-orange-100)"
  },
  "colors.orange.200": {
    "value": "#fed7aa",
    "variable": "var(--op-colors-orange-200)"
  },
  "colors.orange.300": {
    "value": "#fdba74",
    "variable": "var(--op-colors-orange-300)"
  },
  "colors.orange.400": {
    "value": "#fb923c",
    "variable": "var(--op-colors-orange-400)"
  },
  "colors.orange.500": {
    "value": "#f97316",
    "variable": "var(--op-colors-orange-500)"
  },
  "colors.orange.600": {
    "value": "#ea580c",
    "variable": "var(--op-colors-orange-600)"
  },
  "colors.orange.700": {
    "value": "#c2410c",
    "variable": "var(--op-colors-orange-700)"
  },
  "colors.orange.800": {
    "value": "#9a3412",
    "variable": "var(--op-colors-orange-800)"
  },
  "colors.orange.900": {
    "value": "#7c2d12",
    "variable": "var(--op-colors-orange-900)"
  },
  "colors.red.50": {
    "value": "#fef2f2",
    "variable": "var(--op-colors-red-50)"
  },
  "colors.red.100": {
    "value": "#fee2e2",
    "variable": "var(--op-colors-red-100)"
  },
  "colors.red.200": {
    "value": "#fecaca",
    "variable": "var(--op-colors-red-200)"
  },
  "colors.red.300": {
    "value": "#fca5a5",
    "variable": "var(--op-colors-red-300)"
  },
  "colors.red.400": {
    "value": "#f87171",
    "variable": "var(--op-colors-red-400)"
  },
  "colors.red.500": {
    "value": "#ef4444",
    "variable": "var(--op-colors-red-500)"
  },
  "colors.red.600": {
    "value": "#dc2626",
    "variable": "var(--op-colors-red-600)"
  },
  "colors.red.700": {
    "value": "#b91c1c",
    "variable": "var(--op-colors-red-700)"
  },
  "colors.red.800": {
    "value": "#991b1b",
    "variable": "var(--op-colors-red-800)"
  },
  "colors.red.900": {
    "value": "#7f1d1d",
    "variable": "var(--op-colors-red-900)"
  },
  "colors.gray.50": {
    "value": "#f9fafb",
    "variable": "var(--op-colors-gray-50)"
  },
  "colors.gray.100": {
    "value": "#f3f4f6",
    "variable": "var(--op-colors-gray-100)"
  },
  "colors.gray.200": {
    "value": "#e5e7eb",
    "variable": "var(--op-colors-gray-200)"
  },
  "colors.gray.300": {
    "value": "#d1d5db",
    "variable": "var(--op-colors-gray-300)"
  },
  "colors.gray.400": {
    "value": "#9ca3af",
    "variable": "var(--op-colors-gray-400)"
  },
  "colors.gray.500": {
    "value": "#6b7280",
    "variable": "var(--op-colors-gray-500)"
  },
  "colors.gray.600": {
    "value": "#4b5563",
    "variable": "var(--op-colors-gray-600)"
  },
  "colors.gray.700": {
    "value": "#374151",
    "variable": "var(--op-colors-gray-700)"
  },
  "colors.gray.800": {
    "value": "#1f2937",
    "variable": "var(--op-colors-gray-800)"
  },
  "colors.gray.900": {
    "value": "#111827",
    "variable": "var(--op-colors-gray-900)"
  },
  "colors.slate.50": {
    "value": "#F8FAFC",
    "variable": "var(--op-colors-slate-50)"
  },
  "colors.slate.100": {
    "value": "#F1F5F9",
    "variable": "var(--op-colors-slate-100)"
  },
  "colors.slate.200": {
    "value": "#E2E8F0",
    "variable": "var(--op-colors-slate-200)"
  },
  "colors.slate.300": {
    "value": "#CBD5E1",
    "variable": "var(--op-colors-slate-300)"
  },
  "colors.slate.400": {
    "value": "#94A3B8",
    "variable": "var(--op-colors-slate-400)"
  },
  "colors.slate.500": {
    "value": "#64748B",
    "variable": "var(--op-colors-slate-500)"
  },
  "colors.slate.600": {
    "value": "#475569",
    "variable": "var(--op-colors-slate-600)"
  },
  "colors.slate.700": {
    "value": "#334155",
    "variable": "var(--op-colors-slate-700)"
  },
  "colors.slate.800": {
    "value": "#1E293B",
    "variable": "var(--op-colors-slate-800)"
  },
  "colors.slate.900": {
    "value": "#0F172A",
    "variable": "var(--op-colors-slate-900)"
  },
  "blurs.sm": {
    "value": "4px",
    "variable": "var(--op-blurs-sm)"
  },
  "blurs.base": {
    "value": "8px",
    "variable": "var(--op-blurs-base)"
  },
  "blurs.md": {
    "value": "12px",
    "variable": "var(--op-blurs-md)"
  },
  "blurs.lg": {
    "value": "16px",
    "variable": "var(--op-blurs-lg)"
  },
  "blurs.xl": {
    "value": "24px",
    "variable": "var(--op-blurs-xl)"
  },
  "blurs.2xl": {
    "value": "40px",
    "variable": "var(--op-blurs-2xl)"
  },
  "blurs.3xl": {
    "value": "64px",
    "variable": "var(--op-blurs-3xl)"
  },
  "spacing.0": {
    "value": "0rem",
    "variable": "var(--op-spacing-0)"
  },
  "spacing.1": {
    "value": "0.25rem",
    "variable": "var(--op-spacing-1)"
  },
  "spacing.2": {
    "value": "0.5rem",
    "variable": "var(--op-spacing-2)"
  },
  "spacing.3": {
    "value": "0.75rem",
    "variable": "var(--op-spacing-3)"
  },
  "spacing.4": {
    "value": "1rem",
    "variable": "var(--op-spacing-4)"
  },
  "spacing.5": {
    "value": "1.25rem",
    "variable": "var(--op-spacing-5)"
  },
  "spacing.6": {
    "value": "1.5rem",
    "variable": "var(--op-spacing-6)"
  },
  "spacing.7": {
    "value": "1.75rem",
    "variable": "var(--op-spacing-7)"
  },
  "spacing.8": {
    "value": "2rem",
    "variable": "var(--op-spacing-8)"
  },
  "spacing.9": {
    "value": "2.25rem",
    "variable": "var(--op-spacing-9)"
  },
  "spacing.10": {
    "value": "2.5rem",
    "variable": "var(--op-spacing-10)"
  },
  "spacing.11": {
    "value": "2.75rem",
    "variable": "var(--op-spacing-11)"
  },
  "spacing.12": {
    "value": "3rem",
    "variable": "var(--op-spacing-12)"
  },
  "spacing.14": {
    "value": "3.5rem",
    "variable": "var(--op-spacing-14)"
  },
  "spacing.16": {
    "value": "4rem",
    "variable": "var(--op-spacing-16)"
  },
  "spacing.20": {
    "value": "5rem",
    "variable": "var(--op-spacing-20)"
  },
  "spacing.24": {
    "value": "6rem",
    "variable": "var(--op-spacing-24)"
  },
  "spacing.28": {
    "value": "7rem",
    "variable": "var(--op-spacing-28)"
  },
  "spacing.32": {
    "value": "8rem",
    "variable": "var(--op-spacing-32)"
  },
  "spacing.36": {
    "value": "9rem",
    "variable": "var(--op-spacing-36)"
  },
  "spacing.40": {
    "value": "10rem",
    "variable": "var(--op-spacing-40)"
  },
  "spacing.44": {
    "value": "11rem",
    "variable": "var(--op-spacing-44)"
  },
  "spacing.48": {
    "value": "12rem",
    "variable": "var(--op-spacing-48)"
  },
  "spacing.52": {
    "value": "13rem",
    "variable": "var(--op-spacing-52)"
  },
  "spacing.56": {
    "value": "14rem",
    "variable": "var(--op-spacing-56)"
  },
  "spacing.60": {
    "value": "15rem",
    "variable": "var(--op-spacing-60)"
  },
  "spacing.64": {
    "value": "16rem",
    "variable": "var(--op-spacing-64)"
  },
  "spacing.72": {
    "value": "18rem",
    "variable": "var(--op-spacing-72)"
  },
  "spacing.80": {
    "value": "20rem",
    "variable": "var(--op-spacing-80)"
  },
  "spacing.96": {
    "value": "24rem",
    "variable": "var(--op-spacing-96)"
  },
  "spacing.0.5": {
    "value": "0.125rem",
    "variable": "var(--op-spacing-0\\.5)"
  },
  "spacing.1.5": {
    "value": "0.375rem",
    "variable": "var(--op-spacing-1\\.5)"
  },
  "spacing.2.5": {
    "value": "0.625rem",
    "variable": "var(--op-spacing-2\\.5)"
  },
  "spacing.3.5": {
    "value": "0.875rem",
    "variable": "var(--op-spacing-3\\.5)"
  },
  "sizes.0": {
    "value": "0rem",
    "variable": "var(--op-sizes-0)"
  },
  "sizes.1": {
    "value": "0.25rem",
    "variable": "var(--op-sizes-1)"
  },
  "sizes.2": {
    "value": "0.5rem",
    "variable": "var(--op-sizes-2)"
  },
  "sizes.3": {
    "value": "0.75rem",
    "variable": "var(--op-sizes-3)"
  },
  "sizes.4": {
    "value": "1rem",
    "variable": "var(--op-sizes-4)"
  },
  "sizes.5": {
    "value": "1.25rem",
    "variable": "var(--op-sizes-5)"
  },
  "sizes.6": {
    "value": "1.5rem",
    "variable": "var(--op-sizes-6)"
  },
  "sizes.7": {
    "value": "1.75rem",
    "variable": "var(--op-sizes-7)"
  },
  "sizes.8": {
    "value": "2rem",
    "variable": "var(--op-sizes-8)"
  },
  "sizes.9": {
    "value": "2.25rem",
    "variable": "var(--op-sizes-9)"
  },
  "sizes.10": {
    "value": "2.5rem",
    "variable": "var(--op-sizes-10)"
  },
  "sizes.11": {
    "value": "2.75rem",
    "variable": "var(--op-sizes-11)"
  },
  "sizes.12": {
    "value": "3rem",
    "variable": "var(--op-sizes-12)"
  },
  "sizes.14": {
    "value": "3.5rem",
    "variable": "var(--op-sizes-14)"
  },
  "sizes.16": {
    "value": "4rem",
    "variable": "var(--op-sizes-16)"
  },
  "sizes.20": {
    "value": "5rem",
    "variable": "var(--op-sizes-20)"
  },
  "sizes.24": {
    "value": "6rem",
    "variable": "var(--op-sizes-24)"
  },
  "sizes.28": {
    "value": "7rem",
    "variable": "var(--op-sizes-28)"
  },
  "sizes.32": {
    "value": "8rem",
    "variable": "var(--op-sizes-32)"
  },
  "sizes.36": {
    "value": "9rem",
    "variable": "var(--op-sizes-36)"
  },
  "sizes.40": {
    "value": "10rem",
    "variable": "var(--op-sizes-40)"
  },
  "sizes.44": {
    "value": "11rem",
    "variable": "var(--op-sizes-44)"
  },
  "sizes.48": {
    "value": "12rem",
    "variable": "var(--op-sizes-48)"
  },
  "sizes.52": {
    "value": "13rem",
    "variable": "var(--op-sizes-52)"
  },
  "sizes.56": {
    "value": "14rem",
    "variable": "var(--op-sizes-56)"
  },
  "sizes.60": {
    "value": "15rem",
    "variable": "var(--op-sizes-60)"
  },
  "sizes.64": {
    "value": "16rem",
    "variable": "var(--op-sizes-64)"
  },
  "sizes.72": {
    "value": "18rem",
    "variable": "var(--op-sizes-72)"
  },
  "sizes.80": {
    "value": "20rem",
    "variable": "var(--op-sizes-80)"
  },
  "sizes.96": {
    "value": "24rem",
    "variable": "var(--op-sizes-96)"
  },
  "sizes.0.5": {
    "value": "0.125rem",
    "variable": "var(--op-sizes-0\\.5)"
  },
  "sizes.1.5": {
    "value": "0.375rem",
    "variable": "var(--op-sizes-1\\.5)"
  },
  "sizes.2.5": {
    "value": "0.625rem",
    "variable": "var(--op-sizes-2\\.5)"
  },
  "sizes.3.5": {
    "value": "0.875rem",
    "variable": "var(--op-sizes-3\\.5)"
  },
  "sizes.xs": {
    "value": "20rem",
    "variable": "var(--op-sizes-xs)"
  },
  "sizes.sm": {
    "value": "24rem",
    "variable": "var(--op-sizes-sm)"
  },
  "sizes.md": {
    "value": "28rem",
    "variable": "var(--op-sizes-md)"
  },
  "sizes.lg": {
    "value": "32rem",
    "variable": "var(--op-sizes-lg)"
  },
  "sizes.xl": {
    "value": "36rem",
    "variable": "var(--op-sizes-xl)"
  },
  "sizes.2xl": {
    "value": "42rem",
    "variable": "var(--op-sizes-2xl)"
  },
  "sizes.3xl": {
    "value": "48rem",
    "variable": "var(--op-sizes-3xl)"
  },
  "sizes.4xl": {
    "value": "56rem",
    "variable": "var(--op-sizes-4xl)"
  },
  "sizes.5xl": {
    "value": "64rem",
    "variable": "var(--op-sizes-5xl)"
  },
  "sizes.6xl": {
    "value": "72rem",
    "variable": "var(--op-sizes-6xl)"
  },
  "sizes.7xl": {
    "value": "80rem",
    "variable": "var(--op-sizes-7xl)"
  },
  "sizes.8xl": {
    "value": "90rem",
    "variable": "var(--op-sizes-8xl)"
  },
  "sizes.prose": {
    "value": "65ch",
    "variable": "var(--op-sizes-prose)"
  },
  "sizes.full": {
    "value": "100%",
    "variable": "var(--op-sizes-full)"
  },
  "sizes.min": {
    "value": "min-content",
    "variable": "var(--op-sizes-min)"
  },
  "sizes.max": {
    "value": "max-content",
    "variable": "var(--op-sizes-max)"
  },
  "sizes.fit": {
    "value": "fit-content",
    "variable": "var(--op-sizes-fit)"
  },
  "sizes.breakpoint-sm": {
    "value": "640px",
    "variable": "var(--op-sizes-breakpoint-sm)"
  },
  "sizes.breakpoint-md": {
    "value": "768px",
    "variable": "var(--op-sizes-breakpoint-md)"
  },
  "sizes.breakpoint-lg": {
    "value": "1024px",
    "variable": "var(--op-sizes-breakpoint-lg)"
  },
  "sizes.breakpoint-xl": {
    "value": "1280px",
    "variable": "var(--op-sizes-breakpoint-xl)"
  },
  "sizes.breakpoint-2xl": {
    "value": "1536px",
    "variable": "var(--op-sizes-breakpoint-2xl)"
  },
  "animations.spin": {
    "value": "spin 1s linear infinite",
    "variable": "var(--op-animations-spin)"
  },
  "animations.ping": {
    "value": "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
    "variable": "var(--op-animations-ping)"
  },
  "animations.pulse": {
    "value": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
    "variable": "var(--op-animations-pulse)"
  },
  "animations.bounce": {
    "value": "bounce 1s infinite",
    "variable": "var(--op-animations-bounce)"
  },
  "breakpoints.sm": {
    "value": "640px",
    "variable": "var(--op-breakpoints-sm)"
  },
  "breakpoints.md": {
    "value": "768px",
    "variable": "var(--op-breakpoints-md)"
  },
  "breakpoints.lg": {
    "value": "1024px",
    "variable": "var(--op-breakpoints-lg)"
  },
  "breakpoints.xl": {
    "value": "1280px",
    "variable": "var(--op-breakpoints-xl)"
  },
  "breakpoints.2xl": {
    "value": "1536px",
    "variable": "var(--op-breakpoints-2xl)"
  },
  "colors.fg.default": {
    "value": "var(--op-colors-fg-default)",
    "variable": "var(--op-colors-fg-default)"
  },
  "colors.fg.emphasized": {
    "value": "var(--op-colors-fg-emphasized)",
    "variable": "var(--op-colors-fg-emphasized)"
  },
  "colors.fg.muted": {
    "value": "var(--op-colors-fg-muted)",
    "variable": "var(--op-colors-fg-muted)"
  },
  "colors.fg.subtle": {
    "value": "var(--op-colors-fg-subtle)",
    "variable": "var(--op-colors-fg-subtle)"
  },
  "colors.fg.placeholder": {
    "value": "var(--op-colors-fg-placeholder)",
    "variable": "var(--op-colors-fg-placeholder)"
  },
  "colors.fg.inverted.default": {
    "value": "var(--op-colors-fg-inverted-default)",
    "variable": "var(--op-colors-fg-inverted-default)"
  },
  "colors.bg.canvas": {
    "value": "var(--op-colors-bg-canvas)",
    "variable": "var(--op-colors-bg-canvas)"
  },
  "colors.bg.surface": {
    "value": "var(--op-colors-bg-surface)",
    "variable": "var(--op-colors-bg-surface)"
  },
  "colors.bg.muted": {
    "value": "var(--op-colors-bg-muted)",
    "variable": "var(--op-colors-bg-muted)"
  },
  "colors.bg.subtle": {
    "value": "var(--op-colors-bg-subtle)",
    "variable": "var(--op-colors-bg-subtle)"
  },
  "colors.accent.default": {
    "value": "var(--op-colors-accent-default)",
    "variable": "var(--op-colors-accent-default)"
  },
  "colors.accent.emphasized": {
    "value": "var(--op-colors-accent-emphasized)",
    "variable": "var(--op-colors-accent-emphasized)"
  },
  "colors.accent.muted": {
    "value": "var(--op-colors-accent-muted)",
    "variable": "var(--op-colors-accent-muted)"
  },
  "colors.accent.subtle": {
    "value": "var(--op-colors-accent-subtle)",
    "variable": "var(--op-colors-accent-subtle)"
  },
  "colors.border.default": {
    "value": "var(--op-colors-border-default)",
    "variable": "var(--op-colors-border-default)"
  },
  "colors.border.emphasized": {
    "value": "var(--op-colors-border-emphasized)",
    "variable": "var(--op-colors-border-emphasized)"
  },
  "spacing.-1": {
    "value": "calc(var(--op-spacing-1) * -1)",
    "variable": "var(--op-spacing-1)"
  },
  "spacing.-2": {
    "value": "calc(var(--op-spacing-2) * -1)",
    "variable": "var(--op-spacing-2)"
  },
  "spacing.-3": {
    "value": "calc(var(--op-spacing-3) * -1)",
    "variable": "var(--op-spacing-3)"
  },
  "spacing.-4": {
    "value": "calc(var(--op-spacing-4) * -1)",
    "variable": "var(--op-spacing-4)"
  },
  "spacing.-5": {
    "value": "calc(var(--op-spacing-5) * -1)",
    "variable": "var(--op-spacing-5)"
  },
  "spacing.-6": {
    "value": "calc(var(--op-spacing-6) * -1)",
    "variable": "var(--op-spacing-6)"
  },
  "spacing.-7": {
    "value": "calc(var(--op-spacing-7) * -1)",
    "variable": "var(--op-spacing-7)"
  },
  "spacing.-8": {
    "value": "calc(var(--op-spacing-8) * -1)",
    "variable": "var(--op-spacing-8)"
  },
  "spacing.-9": {
    "value": "calc(var(--op-spacing-9) * -1)",
    "variable": "var(--op-spacing-9)"
  },
  "spacing.-10": {
    "value": "calc(var(--op-spacing-10) * -1)",
    "variable": "var(--op-spacing-10)"
  },
  "spacing.-11": {
    "value": "calc(var(--op-spacing-11) * -1)",
    "variable": "var(--op-spacing-11)"
  },
  "spacing.-12": {
    "value": "calc(var(--op-spacing-12) * -1)",
    "variable": "var(--op-spacing-12)"
  },
  "spacing.-14": {
    "value": "calc(var(--op-spacing-14) * -1)",
    "variable": "var(--op-spacing-14)"
  },
  "spacing.-16": {
    "value": "calc(var(--op-spacing-16) * -1)",
    "variable": "var(--op-spacing-16)"
  },
  "spacing.-20": {
    "value": "calc(var(--op-spacing-20) * -1)",
    "variable": "var(--op-spacing-20)"
  },
  "spacing.-24": {
    "value": "calc(var(--op-spacing-24) * -1)",
    "variable": "var(--op-spacing-24)"
  },
  "spacing.-28": {
    "value": "calc(var(--op-spacing-28) * -1)",
    "variable": "var(--op-spacing-28)"
  },
  "spacing.-32": {
    "value": "calc(var(--op-spacing-32) * -1)",
    "variable": "var(--op-spacing-32)"
  },
  "spacing.-36": {
    "value": "calc(var(--op-spacing-36) * -1)",
    "variable": "var(--op-spacing-36)"
  },
  "spacing.-40": {
    "value": "calc(var(--op-spacing-40) * -1)",
    "variable": "var(--op-spacing-40)"
  },
  "spacing.-44": {
    "value": "calc(var(--op-spacing-44) * -1)",
    "variable": "var(--op-spacing-44)"
  },
  "spacing.-48": {
    "value": "calc(var(--op-spacing-48) * -1)",
    "variable": "var(--op-spacing-48)"
  },
  "spacing.-52": {
    "value": "calc(var(--op-spacing-52) * -1)",
    "variable": "var(--op-spacing-52)"
  },
  "spacing.-56": {
    "value": "calc(var(--op-spacing-56) * -1)",
    "variable": "var(--op-spacing-56)"
  },
  "spacing.-60": {
    "value": "calc(var(--op-spacing-60) * -1)",
    "variable": "var(--op-spacing-60)"
  },
  "spacing.-64": {
    "value": "calc(var(--op-spacing-64) * -1)",
    "variable": "var(--op-spacing-64)"
  },
  "spacing.-72": {
    "value": "calc(var(--op-spacing-72) * -1)",
    "variable": "var(--op-spacing-72)"
  },
  "spacing.-80": {
    "value": "calc(var(--op-spacing-80) * -1)",
    "variable": "var(--op-spacing-80)"
  },
  "spacing.-96": {
    "value": "calc(var(--op-spacing-96) * -1)",
    "variable": "var(--op-spacing-96)"
  },
  "spacing.-0.5": {
    "value": "calc(var(--op-spacing-0\\.5) * -1)",
    "variable": "var(--op-spacing-0\\.5)"
  },
  "spacing.-1.5": {
    "value": "calc(var(--op-spacing-1\\.5) * -1)",
    "variable": "var(--op-spacing-1\\.5)"
  },
  "spacing.-2.5": {
    "value": "calc(var(--op-spacing-2\\.5) * -1)",
    "variable": "var(--op-spacing-2\\.5)"
  },
  "spacing.-3.5": {
    "value": "calc(var(--op-spacing-3\\.5) * -1)",
    "variable": "var(--op-spacing-3\\.5)"
  },
  "colors.colorPalette.50": {
    "value": "var(--op-colors-color-palette-50)",
    "variable": "var(--op-colors-color-palette-50)"
  },
  "colors.colorPalette.100": {
    "value": "var(--op-colors-color-palette-100)",
    "variable": "var(--op-colors-color-palette-100)"
  },
  "colors.colorPalette.200": {
    "value": "var(--op-colors-color-palette-200)",
    "variable": "var(--op-colors-color-palette-200)"
  },
  "colors.colorPalette.300": {
    "value": "var(--op-colors-color-palette-300)",
    "variable": "var(--op-colors-color-palette-300)"
  },
  "colors.colorPalette.400": {
    "value": "var(--op-colors-color-palette-400)",
    "variable": "var(--op-colors-color-palette-400)"
  },
  "colors.colorPalette.500": {
    "value": "var(--op-colors-color-palette-500)",
    "variable": "var(--op-colors-color-palette-500)"
  },
  "colors.colorPalette.600": {
    "value": "var(--op-colors-color-palette-600)",
    "variable": "var(--op-colors-color-palette-600)"
  },
  "colors.colorPalette.700": {
    "value": "var(--op-colors-color-palette-700)",
    "variable": "var(--op-colors-color-palette-700)"
  },
  "colors.colorPalette.800": {
    "value": "var(--op-colors-color-palette-800)",
    "variable": "var(--op-colors-color-palette-800)"
  },
  "colors.colorPalette.900": {
    "value": "var(--op-colors-color-palette-900)",
    "variable": "var(--op-colors-color-palette-900)"
  },
  "colors.colorPalette.default": {
    "value": "var(--op-colors-color-palette-default)",
    "variable": "var(--op-colors-color-palette-default)"
  },
  "colors.colorPalette.emphasized": {
    "value": "var(--op-colors-color-palette-emphasized)",
    "variable": "var(--op-colors-color-palette-emphasized)"
  },
  "colors.colorPalette.muted": {
    "value": "var(--op-colors-color-palette-muted)",
    "variable": "var(--op-colors-color-palette-muted)"
  },
  "colors.colorPalette.subtle": {
    "value": "var(--op-colors-color-palette-subtle)",
    "variable": "var(--op-colors-color-palette-subtle)"
  },
  "colors.colorPalette.placeholder": {
    "value": "var(--op-colors-color-palette-placeholder)",
    "variable": "var(--op-colors-color-palette-placeholder)"
  },
  "colors.colorPalette.canvas": {
    "value": "var(--op-colors-color-palette-canvas)",
    "variable": "var(--op-colors-color-palette-canvas)"
  },
  "colors.colorPalette.surface": {
    "value": "var(--op-colors-color-palette-surface)",
    "variable": "var(--op-colors-color-palette-surface)"
  }
}

export function token(path, fallback) {
  return tokens[path]?.value || fallback
}

function tokenVar(path, fallback) {
  return tokens[path]?.variable || fallback
}

token.var = tokenVar