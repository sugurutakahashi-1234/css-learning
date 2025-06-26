import { heroui } from "@heroui/react";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  plugins: [
    heroui({
      prefix: "heroui",
      addCommonColors: true,
      defaultTheme: "light",
      defaultExtendTheme: "light",
      layout: {
        dividerWeight: "1px",
        disabledOpacity: 0.5,
        fontSize: {
          tiny: "0.75rem",
          small: "0.875rem",
          medium: "1rem",
          large: "1.125rem",
        },
        lineHeight: {
          tiny: "1rem",
          small: "1.25rem",
          medium: "1.5rem",
          large: "1.75rem",
        },
        radius: {
          small: "8px",
          medium: "12px",
          large: "14px",
        },
        borderWidth: {
          small: "1px",
          medium: "2px",
          large: "3px",
        },
      },
      themes: {
        light: {
          layout: {
            hoverOpacity: 0.8,
            boxShadow: {
              small:
                "0px 0px 5px 0px rgb(0 0 0 / 0.05), 0px 2px 10px 0px rgb(0 0 0 / 0.2)",
              medium:
                "0px 0px 15px 0px rgb(0 0 0 / 0.06), 0px 2px 30px 0px rgb(0 0 0 / 0.22)",
              large:
                "0px 0px 30px 0px rgb(0 0 0 / 0.07), 0px 30px 60px 0px rgb(0 0 0 / 0.26)",
            },
          },
          colors: {
            background: "#FFFFFF",
            foreground: "#11181C",
            primary: {
              50: "#E6F1FE",
              100: "#CEE4FE",
              200: "#9CCAFD",
              300: "#6BB0FC",
              400: "#3996FB",
              500: "#006FEE",
              600: "#005BC4",
              700: "#004493",
              800: "#002E62",
              900: "#001731",
              DEFAULT: "#006FEE",
              foreground: "#FFFFFF",
            },
            secondary: {
              DEFAULT: "#9353D3",
              foreground: "#FFFFFF",
            },
            success: {
              DEFAULT: "#17C964",
              foreground: "#FFFFFF",
            },
            warning: {
              DEFAULT: "#F5A524",
              foreground: "#FFFFFF",
            },
            danger: {
              DEFAULT: "#F31260",
              foreground: "#FFFFFF",
            },
          },
        },
      },
    }),
  ],
};

export default config;
