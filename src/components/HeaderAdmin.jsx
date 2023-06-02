import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/img/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "../main";
import { useNavigate } from "react-router-dom";

export const HeaderAdmin = () => {
  const navigate = useNavigate();
  const {usuario} = useAuth();

  function logout() {
    navigate("/");
    usuario.logout();
  }

  function barItem(path, texto){
    return (
        <Link className="btn" to={path}>
            {texto}
        </Link>
    );
  }

  function renderBar(usuario){
    const permissoes = {
        1: barItem("/admin/produtos", "Produtos"),
        2: barItem("/admin/fornecedores", "Fornecedores"),
        3: barItem("/admin/pedidos", "Pedidos"),
        4: barItem("/admin/colaboradores", "Colaboradores"),
        5: barItem("/recebimentos", "Recebimentos"),
        6: barItem("/admin/regras", "Regras"),
        7: barItem("/admin/transportadora", "Transportadora"),
        8: barItem("/admin/menu-relatorios", "Relatórios"),
    }
    return usuario.PermissaoUsuario.map(permissao => {
        console.log(permissao)
        return permissoes[permissao.permissaoId]
        })
  }

  return (
    <header>
      <div className="header container d-flex justify-content-between align-items-center">
        <div>
          <Logo src={logo} alt="Logo" />
        </div>
        <div>
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
