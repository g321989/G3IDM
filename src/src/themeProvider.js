import React from "react";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { objectValueFinder } from "./utils/common/function";

const withTheme = (Component) => (props) => {
  const theme = createTheme({
    palette: {
      common: {
        black: "#000",
        white: "#fff",
      },
      type: "light",
      primary: {
        main:
          objectValueFinder(props?.theme, "palette primary main") ?? "#01205C",
        light:
          objectValueFinder(props?.theme, "palette primary light") ?? "#F1F6FC",
        dark:
          objectValueFinder(props?.theme, "palette primary dark") ?? "#3730a3",
        contrastText:
          objectValueFinder(props?.theme, "palette primary contrastText") ??
          "#fff",
      },
      secondary: {
        main:
          objectValueFinder(props?.theme, "palette secondary main") ??
          "#EC6A49",
        light:
          objectValueFinder(props?.theme, "palette secondary light") ??
          "#FFE9E3",
        dark:
          objectValueFinder(props?.theme, "palette secondary dark") ??
          "#be123c",
        contrastText:
          objectValueFinder(props?.theme, "palette secondary contrastText") ??
          "#fff",
      },
      background: {
        paper:
          objectValueFinder(props?.theme, "palette background paper") ??
          "#ffffff",
        default:
          objectValueFinder(props?.theme, "palette background default") ??
          "#f8fafc",
      },
      action: {
        active: "rgba(0, 0, 0, 0.54)",
        hover: "rgba(0, 0, 0, 0.08)",
        hoverOpacity: 0.08,
        selected: "rgba(0, 0, 0, 0.14)",
        disabled: "rgba(0, 0, 0, 0.26)",
        disabledBackground: "rgba(0, 0, 0, 0.12)",
      },
      text: {
        primary: "#001C3C",
        secondary: "#2A3C50",
        disabled: "#6A7888",
        hint: "rgba(0,0,0,0.39)",
      },
      error: {
        main: "#ef4444",
        light: "#f87171",
        dark: "#b91c1c",
      },
      warning: {
        main: "#f97316",
        light: "#fdba74",
        dark: "#c2410c",
        contrastText: "#000000",
      },
      info: {
        main: "#3b82f6",
        light: "#60a5fa",
        dark: "#1d4ed8",
      },
      success: {
        main: "#3BB213",
        light: "#E2F4DC",
        dark: "#047857",
      },
      divider: "#94a3b8",
      grey: {
        50: "#f8fafc",
        100: "#f1f5f9",
        200: "#e2e8f0",
        300: "#cbd5e1",
        400: "#94a3b8",
        500: "#64748b",
        600: "#475569",
        700: "#334155",
        800: "#1e293b",
        900: "#0f172a",
        A100: "#f3f4f6",
        A200: "#e5e7eb",
        A400: "#9ca3af",
        A700: "#374151",
      },
    },
    spacing: 8,
    borderRadius: {
      1: "2px",
      2: "4px",
      3: "6px",
      4: "8px",
      5: "10px",
      6: "12px",
      7: "16px",
      8: "24px",
    },
    ...props.theme,
  });

  return (
    <ThemeProvider theme={theme}>
      <Component {...props}>{props.children}</Component>
    </ThemeProvider>
  );
};

export default withTheme;
