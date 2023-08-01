import { createRoot } from "react-dom/client";
// import ReactDOM from "react-dom";
import { MainView } from "./components/main-view/main-view";
// Import statement to indicate that you need to bundle `./index.scss`
import "./index.scss";


// Main component (will eventually use all the others)
const MyFlixApplication = () => {
  return <MainView />;
};

ReactDOM.render(<MyFlixApplication />, document.getElementById("root"));

// Finds the root of your app
const container = document.querySelector("#root");
const root = ReactDOM.createRoot(container);

// Tells React to render your app in the root DOM element
root.render(<MyFlixApplication />);
