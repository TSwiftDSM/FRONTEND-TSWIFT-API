import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Home = () => {
  function CardMenu(icone, texto) {
    return (
      <div className="col-lg-3 mb-5 px-4">
        <div className="card amarelo text-center">
          <div className="py-3">
            <FontAwesomeIcon icon={icone} style={{ fontSize: "48px" }} />
          </div>
          <span className="py-3">{texto}</span>
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
        {CardMenu("fa-briefcase", "PRODUTOS")}
        {CardMenu("fa-clipboard-list", "PRODUTOS")}
        {CardMenu("fa-user-friends", "PRODUTOS")}
        {CardMenu("fa-clipboard-check", "PRODUTOS")}
      </div>
    </div>
  );
};

export default Home;
