import { createRoot } from 'react-dom/client';
import {LoginView} from "./components/login-view/login-view"

// Import statement to indicate that you need to bundle `./index.scss`
import "./index.scss";

// Main component (will eventually use all the others)
const MyFlixApplication = () => <LoginView/>;

// Finds the root of your app
const container = document.querySelector("#root");
const root = createRoot(container);

// Tells React to render your app in the root DOM element
root.render(<MyFlixApplication />);