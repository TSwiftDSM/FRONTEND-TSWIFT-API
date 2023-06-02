import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/img/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "../main";
import { useNavigate } from "react-router-dom";

export const HeaderAdmin = () => {
  const navigate = useNavigate();
  const context = useAuth();
  function logout() {
    navigate("/");
    context.logout();
  }
  return (
    <header>
      <div className="header container d-flex justify-content-between align-items-center">
        <div>
          <Logo src={logo} alt="Logo" />
        </div>
        <div>
          <Link className="btn" to={"/admin"}>
            Home
          </Link>
          <Link className="btn" to={"/admin/produtos"}>
            Produtos
          </Link>
          <Link className="btn" to={"/admin/fornecedores"}>
            Fornecedores
          </Link>
          <Link className="btn" to={"/admin/pedidos"}>
            Pedidos
          </Link>
          <Link className="btn" to={"/admin/colaboradores"}>
            Colaboradores
          </Link>
          <Link className="btn" to={"/"}>
            Recebimentos
          </Link>
          <Link className="btn" to={"/admin/regras"}>
            Regras
          </Link>
          <Link className="btn" to={"/admin/menu-relatorios"}>
            Relatórios
          </Link>
          <button className="btn" onClick={logout}>
            <span className="">Sair </span>
            <FontAwesomeIcon icon="fa-solid fa-arrow-right-from-bracket" />
          </button>
        </div>
      </div>
    </header>
  );
};

const Logo = styled.img`
  height: 70px;
  width: 100px;
`;
