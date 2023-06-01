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

axios.defaults.baseURL = "http://localhost:3000/";

const router = createBrowserRouter(routes);

import { createContext, useContext, useState } from "react";
const AuthContext = createContext({});

function App() {
  const { logado } = useContext(AuthContext);
  return (
    <>
      {logado ? (
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
  const [logado, setLogado] = useState(false);
  const [usuario, setUsuario] = useState({});

  function login(dados) {
    return new Promise((resolve, reject) => {
      return axios
        .post(`/autenticacao`, dados)
        .then(({ data }) => {
          const { usuario, tokenUsuario } = data;
          if (usuario && tokenUsuario) {
            axios.defaults.headers["Authorization"] = `Bearer ${tokenUsuario}`;
            setUsuario(usuario);
            setLogado(true);
            resolve(data);
          } else {
            reject(data);
          }
        })
        .catch(reject);
    });
  }

  function logout() {
    setUsuario({});
    setLogado(false);
    axios.defaults.headers["Authorization"] = "";
  }

  return (
    <AuthContext.Provider value={{ logado, login, usuario, logout }}>
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
