import { useNavigate } from "react-router-dom";
import { Contador } from "../../components";
import { Button } from "react-bootstrap";

const ConferenciaRealizada = () => {
  const navigate = useNavigate();

  function home() {
    navigate("/");
  }
  return (
    <div className="container-cards">
      <div className="mb-4">
        <h3 className="text-white">Recebimento de Produto</h3>
      </div>
      <div className="card-cadastro p-5 col-lg-6 d-flex justify-content-center flex-column mx-auto">
        <div className="mb-3 d-flex justify-content-center">
          <Contador etapa={4} /> {/* posição do indicador de etapas */}
        </div>
        <p className="mx-auto text-center">
          Conferência realizada com sucesso.
        </p>
        <div className="d-flex  justify-content-center">
          <Button className="py-2 text-white" variant="primary" onClick={() =>{ window.location.href = "/recebimentos"}}>
            CONCLUIR
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConferenciaRealizada;
