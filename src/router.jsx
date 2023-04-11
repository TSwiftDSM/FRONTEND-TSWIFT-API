import App from "./templates/App";
import Auth from "./templates/Auth";

import Home from "./pages/Home";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "/login",
    element: <Auth />,
  },
];

export default routes;
