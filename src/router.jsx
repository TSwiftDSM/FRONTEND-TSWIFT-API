import App from "./templates/App";
import Auth from "./templates/Auth";

import Hello from "./pages/Hello";
import Quantitativa from "./pages/quantitativa"

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
        path: "/quantitativa" /* criando a rota qualitativa  */,
        element: <Quantitativa /> /* chamando a pagina qualitativa */,
      },
    ],
  },
  {
    path: "/login",
    element: <Auth />,
  },
];

export default routes;
