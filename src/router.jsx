import App from "./templates/App";
import Auth from "./templates/Auth";

import Hello from "./pages/Hello";
import Qualitativa from "./pages/Qualitativa";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Hello />,
      },
      {
        path: "/qualitativa" /* criando a rota qualitativa  */,
        element: <Qualitativa /> /* chamando a pagina qualitativa */,
      },
    ],
  },
  {
    path: "/login",
    element: <Auth />,
  },
];

export default routes;
