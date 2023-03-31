import * as React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "tailwindcss/tailwind.css";

const container = document.querySelector(".app-container") as HTMLElement
const root = createRoot(container)

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
