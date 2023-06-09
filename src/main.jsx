import ReactDOM from "react-dom/client";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/scss/main.scss";
import "./assets/fa";

import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter,
  Navigate,
  Routes,
  Route,
} from "react-router-dom";

import Auth from "./templates/Auth";
import routes from "./router";
import axios from "axios";

window.axios = axios;

window.axios.defaults.baseURL = "http://localhost:3000/";

axios.interceptors.request.use(
  async (config) => {
    config.headers.Authorization = sessionStorage.getItem("token");
    return config;
  },
  (error) => Promise.reject(error)
);

const router = createBrowserRouter(routes);

import { createContext, useContext } from "react";
const AuthContext = createContext({});

function App() {
  const { getLogged } = useContext(AuthContext);
  return (
    <>
      {getLogged() ? (
        <RouterProvider router={router} />
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="" Component={Auth} />
            <Route path="*" element={<Navigate to="" />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

function AuthProvider({ children }) {
  function getLogged() {
    return sessionStorage.getItem("usuario") !== null;
  }
  const usuario = JSON.parse(sessionStorage.getItem("usuario"));

  function login(dados) {
    return new Promise((resolve, reject) => {
      return window.axios
        .post(`/autenticacao`, dados)
        .then(({ data }) => {
          const { usuario, tokenUsuario } = data;
          if (usuario && tokenUsuario) {
            sessionStorage.setItem("token", `Bearer ${tokenUsuario}`);
            sessionStorage.setItem("usuario", JSON.stringify(usuario));
            document.location.href = "";
            resolve(data);
          } else {
            reject(data);
          }
        })
        .catch(reject);
    });
  }

  function logout() {
    sessionStorage.removeItem("usuario");
    sessionStorage.removeItem("token");
    document.location.href = "";
  }

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        getLogged,
        usuario,
      }}
    >
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
