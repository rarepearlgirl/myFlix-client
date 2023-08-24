import React from 'react';
import ReactDOM from "react-dom/client";
import { MainView } from "./components/main-view/main-view";
// Import statement to indicate that you need to bundle `./index.scss`
// import "./index.scss";


// Main component (will eventually use all the others)
const MyFlixApplication = () => {
  return (
    <React.StrictMode>
      <MainView />
    </React.StrictMode>
  )
};

// Finds the root of your app
const container = document.querySelector("#root");
const root = ReactDOM.createRoot(container);

// Tells React to render your app in the root DOM element
root.render(<MyFlixApplication />);
