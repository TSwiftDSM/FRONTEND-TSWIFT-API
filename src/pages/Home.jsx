import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Home = () => {
  function CardMenu(icone, texto) {
    return (
      <div className="col-lg-3 mb-5 px-4">
        <div className="card text-center">
          <div className="py-3">
            <FontAwesomeIcon icon={icone} style={{ fontSize: "48px", color: "rgb(135, 135, 135)" }} />
          </div>
          <span className="py-3 text-black-50">{texto}</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-5">
        <h3 className="text-white">Home</h3>
      </div>
      <div className="row">
        {CardMenu("fa-bag-shopping", "PRODUTOS")}
        {CardMenu("fa-briefcase", "FORNECEDORES")}
        {CardMenu("fa-clipboard-list", "PEDIDOS")}
        {CardMenu("fa-user-friends", "COLABORADORES")}
        {CardMenu("fa-clipboard-check", "RECEBIMENTO")}
      </div>
    </div>
  );
};

export default Home;
