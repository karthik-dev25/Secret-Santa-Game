import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";

const App = () => {
  return (
    <div>
      <Header />
    </div>
  );
};

// creating an root Element
const root = ReactDOM.createRoot(document.getElementById("root"));

// Rendering the Element to the real DOM
root.render(<App />);
