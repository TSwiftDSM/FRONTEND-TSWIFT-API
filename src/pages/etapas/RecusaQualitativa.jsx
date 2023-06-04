import { Button, Form } from "react-bootstrap";
import { Contador, Colapsador } from "../../components";

const RecusaQualitativa = () => {
  return (
    <div className="container-cards">
      <div className="mb-4">
        <h3 className="text-white">
          Recebimento de Produto - Conferência Qualitativa
        </h3>
      </div>
      <div className="card-cadastro p-5 col-lg-6 mx-auto">
        <h3 className="d-flex mb-4 justify-content-center">RECUSAR ENTREGA</h3>

        <div>Inconsistências Encontradas</div>

        <div>
          <Form.Group controlId="info" className="mb-3">
            <Form.Label>Observações</Form.Label>
            <Form.Control as="textarea" rows={4} />
          </Form.Group>
        </div>
        <div className="d-flex justify-content-between">
          <div className="col-lg-5 mb-4">
            <Button
              className="w-100 py-2 text-white"
              variant="primary"
              type="button"
            >
              VOLTAR
            </Button>
          </div>
          <div className="col-lg-5 mb-4">
            <Button
              className="w-100 py-2 text-white"
              variant="danger"
              type="submit"
            >
              CONTINUAR
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecusaQualitativa;
