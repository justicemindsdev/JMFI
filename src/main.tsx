import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Apply default font family
document.documentElement.classList.add("font-serif");

createRoot(document.getElementById("root")!).render(<App />);
