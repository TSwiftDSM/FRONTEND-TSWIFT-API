import ReactDOM from "react-dom/client";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/scss/main.scss";
import "./assets/fa";

import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Auth from "./templates/Auth";
import routes from "./router";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000/";

const router = createBrowserRouter(routes);

import { createContext, useContext, useState } from "react";
const AuthContext = createContext({});

function App() {
  const { logado } = useContext(AuthContext);
  return (
    <>
      {!logado ? (
        <BrowserRouter>
          <Routes>
            <Route path="" Component={Auth} />
          </Routes>
        </BrowserRouter>
      ) : (
        <RouterProvider router={router} />
      )}
    </>
  );
}

function AuthProvider({ children }) {
  const [logado, setLogado] = useState(false);

  return (
    <AuthContext.Provider value={{ logado: logado, setLogado }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
