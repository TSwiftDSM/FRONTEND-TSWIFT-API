import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  function CardMenu(icone, texto, rota = "") {
    return (
      <div className="col-lg-3 mb-5 px-4">
        <Link className="card text-center menu-admin" to={rota}>
          <div className="py-3">
            <FontAwesomeIcon icon={icone} style={{ fontSize: "48px" }} />
          </div>
          <span className="py-3">{texto}</span>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-5">
        <h3 className="text-white">Painel Administrativo</h3>
      </div>
      <div className="row">
        {CardMenu("fa-bag-shopping", "PRODUTOS", "/admin/produtos")}
        {CardMenu("fa-briefcase", "FORNECEDORES", "/admin/fornecedores")}
        {CardMenu("fa-clipboard-list", "PEDIDOS", "/admin/pedidos")}
        {CardMenu("fa-user-friends", "COLABORADORES", "/admin/Colaborador")}
        {CardMenu("fa-clipboard-check", "RECEBIMENTO", "/")}
        {/* {CardMenu(faGear, "REGRAS", "/admin/regras")} */}
      </div>
    </div>
  );
};

export default Home;
