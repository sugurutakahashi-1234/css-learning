import { HeroUIProvider } from "@heroui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const queryClient = new QueryClient();

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <HeroUIProvider
      defaultTheme="light"
      themes={{
        light: {
          colors: {
            primary: {
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
      }}
    >
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </HeroUIProvider>
  </React.StrictMode>,
);
