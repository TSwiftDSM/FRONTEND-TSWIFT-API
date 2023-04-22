import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Contador from "../../components/Contador";

import { formasDePagamento, tiposDeFrete } from "../../constants";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Entrada = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const formFields = Object.freeze({
    idEntrega: parseInt(id),
    numeroPedido: "",
    notaFiscal: "",
    fornecedor: "",
    transportadora: "",
    tipoFrete: "CIF",
    condicaoPagamento: "6X",
    laudo: false,
  });

  const [form, setForm] = useState(formFields);

  const atualizar = (e) => {
    const t = e.target;
    setForm({
      ...form,
      [t.name]: t.type === "checkbox" ? t.checked : t.value.trim(),
    });
  };

  const submit = () => {
    axios
      .post(
        "http://localhost:3000/cadastrar/material/api/EntradaMaterial",
        form
      )
      .then(() => navigate(`/${id}/quantitativa`));
  };

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
            <Form.Group className="mb-3">
              <Form.Label>Nº do pedido</Form.Label>
              <Form.Control name="numeroPedido" onChange={atualizar} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Nº da nota fiscal</Form.Label>
              <Form.Control name="notaFiscal" onChange={atualizar} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Fornecedor</Form.Label>
              <Form.Control name="fornecedor" onChange={atualizar} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Transportadora</Form.Label>
              <Form.Control name="transportadora" onChange={atualizar} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Tipo de frete</Form.Label>
              <Form.Select name="tipoFrete" onChange={atualizar}>
                {tiposDeFrete.map((tipo) => (
                  <option key={tipo.id}>{tipo.nome}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Condição de pagamento</Form.Label>
              <Form.Select name="condicaoPagamento" onChange={atualizar}>
                {formasDePagamento.map((tipo) => (
                  <option key={tipo.id}>{tipo.nome}</option>
                ))}
              </Form.Select>
            </Form.Group>
            {/* <Form.Group controlId="info" className="mb-3">
              <Form.Label>Informações complementares</Form.Label>
              <Form.Control as="textarea" rows={4} />
            </Form.Group> */}
            <Form.Group className="mb-5">
              <Form.Check
                name="laudo"
                label="Foi apresentado o laudo?"
                onChange={atualizar}
              />
            </Form.Group>
            <div className="d-flex justify-content-between">
              <div className="col-lg-5">
                <Link to={`/${id}/recusa-entrada`}>
                  <Button className="w-100 py-2 text-white" variant="danger">
                    RECUSAR
                  </Button>
                </Link>
              </div>
              <div className="col-lg-5">
                <Button
                  className="w-100 py-2 text-white"
                  variant="primary"
                  onClick={submit}
                >
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
