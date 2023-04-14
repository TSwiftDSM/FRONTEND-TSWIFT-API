import { Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";


import Contador from "../../components/Contador";

const Quantitativa = () => {
  function submit() {
    console.log('deu bom');
  }
  return (
    <div>
      <div className="mb-4">
        <h3 className="text-white">Recebimento de Produto</h3>
      </div>
      <div className="card mx-auto col-lg-6 p-5">
        <div className="mx-auto mb-3">
          <Contador etapa={2} /> {/* posição do indicador de etapas */}
        </div>

        <div className="mb-4">
          <Link to={"/"}>
            <FontAwesomeIcon icon="f-solid fa-angle-left" className="me-2" />
            Voltar
          </Link>
          <div>
            <h5 className="mb-4">Conferência Quantitativa</h5>
          </div>

          <div className="d-flex justify-content-center">
            <Button
              className="text-white py-3 px-5"
              type="submit"
              onClick={submit}
            >
              CONTINUAR
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quantitativa;
