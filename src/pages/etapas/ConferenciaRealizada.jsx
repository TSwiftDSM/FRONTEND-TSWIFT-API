import { Button } from "react-bootstrap";
import Contador from "../../components/Contador";

const ConferenciaRealizada = () => {
  return (
    <div>
      <div className="mb-4">
        <h3 className="text-white">Recebimento de Produto</h3>
      </div>
      <div className="card mx-auto col-lg-6 p-5">
        <div className="mx-auto mb-5">
          <Contador etapa={4} /> {/* posição do indicador de etapas */}
        </div>
        <span className="mb-5 text-center">
          Conferência realizada com sucesso.
        </span>
        <div className="d-flex  justify-content-center">
        <Button
          className="py-2 text-white"
          variant="primary"
          type="submit"
        >
          CONCLUIR
        </Button>
        </div>
      </div>
    </div>
  );
};

export default ConferenciaRealizada;
