import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
        <h3 className="text-white">Home</h3>
      </div>
      <div className="row">
        {CardMenu("fa-bag-shopping", "PRODUTOS", "/admin/produtos")}
        {CardMenu("fa-briefcase", "FORNECEDORES")}
        {CardMenu("fa-clipboard-list", "PEDIDOS")}
        {CardMenu("fa-user-friends", "COLABORADORES")}
        {CardMenu("fa-clipboard-check", "RECEBIMENTO")}
      </div>
    </div>
  );
};

export default Home;
