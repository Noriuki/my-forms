import { ThemeProvider } from "@emotion/react";
import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./contexts/store";
import { theme } from "./theme";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>
);
