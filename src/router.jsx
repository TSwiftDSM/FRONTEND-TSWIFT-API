import App from "./templates/App";
import Auth from "./templates/Auth";

import Hello from "./pages/Hello";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Hello />,
      },
    ],
  },
  {
    path: "/login",
    element: <Auth />,
  },
];

export default routes;
