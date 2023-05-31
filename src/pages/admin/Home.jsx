import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faListCheck,
  faShoppingBag,
  faBriefcase,
  faClipboardList,
  faUserFriends,
  faClipboardCheck,
  faFile,
} from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  function CardMenu(icone, texto, rota = "") {
    return (
      <div className="home col-lg-3 p-4">
        <Link className="card home text-center menu-admin" to={rota}>
          <div className="py-3">
            <FontAwesomeIcon icon={icone} style={{ fontSize: "48px" }} />
          </div>
          <span className="py-3">{texto}</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="container container-home">
      {/* <div className="mb-4">
        <h3 className="text-white">Painel de Acessos</h3>
      </div> */}
      <div className="row">
        {CardMenu(faShoppingBag, "PRODUTOS", "/admin/produtos")}
        {CardMenu(faBriefcase, "FORNECEDORES", "/admin/fornecedores")}
        {CardMenu(faClipboardList, "PEDIDOS", "/admin/pedidos")}
        {CardMenu(faUserFriends, "COLABORADORES", "/admin/colaboradores")}
        {CardMenu(faClipboardCheck, "RECEBIMENTO", "/")}
        {CardMenu(faListCheck, "REGRAS", "/admin/regras")}
        {CardMenu(faFile, "RELATÓRIOS", "/")}
      </div>
    </div>
  );
};

export default Home;
