import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App.tsx";

// Add dark mode class to document
document.documentElement.classList.add('dark');

// For development, ensure we can see the stored data
console.log("App Storage:", localStorage.getItem("app-storage"));

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
