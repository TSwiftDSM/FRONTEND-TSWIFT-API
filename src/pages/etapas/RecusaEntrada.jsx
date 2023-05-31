import { useState } from "react";
import { Button, Form } from "react-bootstrap";

import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const RecusaEntrada = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const formFields = Object.freeze({
    inconsistencia: "numeroPedido",
    motivo: "",
  });

  const [form, setForm] = useState(formFields);

  const atualizar = (e) => {
    const t = e.target;
    setForm({
      ...form,
      [t.name]: t.type === "checkbox" ? t.checked : t.value,
    });
  };

  const inconsistencias = [
    { id: "numeroPedido", nome: "Número do pedido" },
    { id: "notaFiscal", nome: "Nota Fiscal" },
    { id: "fornecedor", nome: "Fornecedor" },
    { id: "transportadora", nome: "Transportadora" },
    { id: "tipoFrete", nome: "Tipo de Frete" },
    { id: "condicaoPagamento", nome: "Condição de Pagamento" },
  ];

  function submit() {
    axios.post(`recusar/entradaMateriais/${id}`, form).then(() => {
      navigate(`/${id}/quantitativa`);
    });
  }
  function voltar() {
    navigate(`/${id}/entrada`);
  }

  return (
    <div>
      <div className="mb-4">
        <h3 className="text-white">
          Recebimento de Produto - Conferência de Dados
        </h3>
      </div>
      <div className="card mx-auto col-lg-6 p-5 text-left">
        <h3 className="d-flex mb-3 justify-content-center">RECUSAR ENTREGA</h3>
        <div>Inconsistências Encontradas:</div>

        <Form>
          <Form.Group className="mb-4">
            <Form.Label>Selecione a inconsistência</Form.Label>
            <Form.Select name="inconsistencia" onChange={atualizar}>
              {inconsistencias.map((tipo) => (
                <option key={tipo.id}>{tipo.nome}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Form>
        {/* <div className="d-flex justify-content-end">
          <Button
            className="mb-4 py-2 text-white"
            variant="primary"
            type="button"
          >
            +Adicionar
          </Button>
        </div> */}
        <div>
          <Form.Group className="mb-3">
            <Form.Label>Observações</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              name="motivo"
              onChange={atualizar}
            />
          </Form.Group>
        </div>
        <div className="d-flex justify-content-between">
          <div className="col-lg-5 mb-4">
            <Button
              className="w-100 py-2 text-white"
              variant="primary"
              type="button"
              onClick={voltar}
            >
              VOLTAR
            </Button>
          </div>
          <div className="col-lg-5 mb-4">
            <Button
              className="w-100 py-2 text-white"
              variant="danger"
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

export default RecusaEntrada;
