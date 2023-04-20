import { Button, Form } from "react-bootstrap";

const RecusaQualitativa = () => {
  return (
    <div>
      <div className="mb-4">
        <h2 className="text-white">
          Receber Produto - Conferência Qualitativa
        </h2>
      </div>
      <div className="card mx-auto col-lg-6 p-5">
        <h3 className="d-flex mb-4 justify-content-center">RECUSAR ENTREGA</h3>

        <h7>Inconsistências Encontradas:</h7>
        <h7>ETAPA 3:</h7>
        <h7>Produto:</h7>

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
