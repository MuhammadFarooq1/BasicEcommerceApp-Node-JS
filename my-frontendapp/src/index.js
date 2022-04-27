import React from "react";
import ReactDOM from "react-dom/client";
import MyRoutes from "./Routes";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<MyRoutes />);

// ReactDOM.render(
//   <React.StrictMode>
//     <MyRoutes />
//   </React.StrictMode>,
//   document.getElementById("root")
// );
// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById("root")
// );
