import ReactDOM from "react-dom/client";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/scss/main.scss";
import "./assets/fa";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./router";

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
