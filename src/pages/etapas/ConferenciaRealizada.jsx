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
      <div className="card-cadastro p-5 col-lg-6 mx-auto">
        <div className="mb-3 d-flex justify-content-center">
          <Contador etapa={4} /> {/* posição do indicador de etapas */}
        </div>
        <span className="mb-5 text-center">
          Conferência realizada com sucesso.
        </span>
        <div className="d-flex  justify-content-center">
          <Button className="py-2 text-white" variant="primary" onClick={home}>
            CONCLUIR
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConferenciaRealizada;
