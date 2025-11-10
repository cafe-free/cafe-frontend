// src/main.jsx
import "./assets/css/sanitize.css"; // reset first
import "./index.css";
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
createRoot(document.getElementById("root")).render(<App />);