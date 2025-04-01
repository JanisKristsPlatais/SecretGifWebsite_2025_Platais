import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Add custom Tailwind classes
const styleElement = document.createElement("style");
styleElement.textContent = `
  @layer utilities {
    .drag-cursor {
      cursor: grab;
    }
    .drag-cursor:active {
      cursor: grabbing;
    }
    .drop-shadow-custom {
      filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
    }
    .drop-shadow-active {
      filter: drop-shadow(0 8px 16px rgba(93, 109, 190, 0.4));
    }
    .font-pixel {
      font-family: 'Press Start 2P', cursive;
    }
  }
`;
document.head.appendChild(styleElement);

createRoot(document.getElementById("root")!).render(<App />);
 
