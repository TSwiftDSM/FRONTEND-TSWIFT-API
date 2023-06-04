import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "../../main";
import {
  faListCheck,
  faShoppingBag,
  faBriefcase,
  faClipboardList,
  faUserFriends,
  faClipboardCheck,
  faFile,
  // faTruck,
} from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const { usuario } = useAuth();

  function CardMenu(icone, texto, rota = "", k) {
    return (
      <div className="home col-lg-3 p-4" key={k}>
        <Link className="card home text-center menu-admin" to={rota}>
          <div className="py-3">
            <FontAwesomeIcon icon={icone} style={{ fontSize: "48px" }} />
          </div>
          <span className="py-3">{texto}</span>
        </Link>
      </div>
    );
  }

  function renderizaHome(usuario) {
    const permissoes = {
      1: CardMenu(faShoppingBag, "PRODUTOS", "/admin/produtos", 1),
      2: CardMenu(faBriefcase, "FORNECEDORES", "/admin/fornecedores", 2),
      3: CardMenu(faClipboardList, "PEDIDOS", "/admin/pedidos", 3),
      4: CardMenu(faUserFriends, "COLABORADORES", "/admin/colaboradores", 4),
      5: CardMenu(faClipboardCheck, "RECEBIMENTO", "/recebimentos", 5),
      6: CardMenu(faListCheck, "REGRAS", "/admin/regras", 6),
      // 7: CardMenu(faTruck, "TRANSPORTADORA", "/admin/transportadora", 7),
      8: CardMenu(faFile, "RELATÓRIOS", "/Admin/menu-relatorios", 8),
    };

    return usuario.PermissaoUsuario.map((permissao) => {
      return permissoes[permissao.permissaoId];
    });
  }

  return (
    <div className="container container-home">
        <div className="row">{renderizaHome(usuario)}</div>
    </div>
  );
};

export default Home;
