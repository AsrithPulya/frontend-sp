import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ToastContainer } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for react-toastify
import { Provider } from "react-redux";
import { store } from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
    <ToastContainer
      position="top-right" // Position of the toast
      autoClose={3000} // Auto-close after 5 seconds
      hideProgressBar={false} // Show progress bar
      newestOnTop={false} // Older toasts stay below newer ones
      closeOnClick // Close toast on click
      rtl={false} // Left-to-right layout
      pauseOnFocusLoss // Pause timer when window loses focus
      draggable // Allow dragging the toast
      pauseOnHover // Pause timer on hover
      theme="light" // Colored theme (options: "light", "dark", "colored")
    />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
