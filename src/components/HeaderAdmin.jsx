import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/img/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "../main";

export const HeaderAdmin = () => {
  const { usuario, logout } = useAuth();

  function barItem(path, texto, i) {
    return (
      <Link className="btn" to={path} key={i}>
        {texto}
      </Link>
    );
  }

  function renderBar(usuario) {
    const permissoes = {
      1: barItem("/admin/produtos", "Produtos", 1),
      2: barItem("/admin/fornecedores", "Fornecedores", 2),
      3: barItem("/admin/pedidos", "Pedidos", 3),
      4: barItem("/admin/colaboradores", "Colaboradores", 4),
      5: barItem("/recebimentos", "Recebimentos", 5),
      6: barItem("/admin/regras", "Regras", 6),
      7: barItem("/admin/transportadora", "Transportadora", 7),
      8: barItem("/admin/menu-relatorios", "Relatórios", 8),
    };
    return usuario.PermissaoUsuario.map((permissao) => {
      return permissoes[permissao.permissaoId];
    });
  }

  return (
    <header>
      <div className="header container d-flex justify-content-between align-items-center">
        <div>
          <Logo src={logo} alt="Logo" />
        </div>
        <div>
          {barItem("", "Home")}
          {renderBar(usuario)}
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
