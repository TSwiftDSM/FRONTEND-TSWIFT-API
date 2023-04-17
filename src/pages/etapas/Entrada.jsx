import { Form, Button } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import Contador from "../../components/Contador";

const Entrada = () => {
  return (
    <div>
      <div className="mb-4">
        <h3 className="text-white">Receber Produto - Conferência de Dados</h3>
      </div>

      <div className="card mx-auto col-lg-6 p-5">
        <div className="mx-auto mb-3">
          <Contador etapa={1} />
        </div>

        <div className="mb-4">
          <Link to={"/"}>
            <FontAwesomeIcon icon="fa-solid fa-angle-left" className="me-2" />
            Voltar
          </Link>
        </div>
        <div>
          <Form>
            <Form.Group controlId="numero" className="mb-3">
              <Form.Label>Nº do pedido</Form.Label>
              <Form.Control disabled />
            </Form.Group>
            <Form.Group controlId="numero" className="mb-3">
              <Form.Label>Nº da nota fiscal</Form.Label>
              <Form.Control disabled />
            </Form.Group>
            <Form.Group controlId="fornecedor" className="mb-3">
              <Form.Label>Fornecedor</Form.Label>
              <Form.Control disabled />
            </Form.Group>
            <Form.Group controlId="transportadora" className="mb-3">
              <Form.Label>Transportadora</Form.Label>
              <Form.Control disabled />
            </Form.Group>
            <Form.Group controlId="frete" className="mb-3">
              <Form.Label>Tipo de frete</Form.Label>
              <Form.Control disabled />
            </Form.Group>
            <Form.Group controlId="pagamento" className="mb-3">
              <Form.Label>Condição de pagamento</Form.Label>
              <Form.Control disabled />
            </Form.Group>
            <Form.Group controlId="info" className="mb-3">
              <Form.Label>Informações complementares</Form.Label>
              <Form.Control as="textarea" rows={4} />
            </Form.Group>
            <Form.Group className="mb-5" controlId="laudo">
              <Form.Check label="Foi apresentado o laudo? " type="checkbox" />
            </Form.Group>
            <div className="d-flex justify-content-between">
              <div className="col-lg-5">
                <Button className="w-100 py-2 text-white" variant="danger">
                  RECUSAR
                </Button>
              </div>
              <div className="col-lg-5">
                <Button className="w-100 py-2 text-white" variant="primary">
                  CONTINUAR
                </Button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Entrada;
