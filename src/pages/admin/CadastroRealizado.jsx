import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const CadastroRealizado = () => {
  return (
    <div>
      <div className="mb-4">
        <h3 className="text-white">Cadastrar</h3>
      </div>
      <div className="card mx-auto col-lg-6 p-5">
        <FontAwesomeIcon
          icon="fa-solid fa-check"
          size="2xl"
          style={{ color: "#21a676" }}
        />
        <span className="mb-5 text-center ">
          Cadastro realizado com sucesso.
        </span>
        <div className="d-flex  justify-content-center">
          <Link to={"/admin/"}>
            <Button className="py-2 text-white" variant="primary">
              FINALIZAR
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CadastroRealizado;
