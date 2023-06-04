import { useParams, useNavigate, Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { Contador } from "../../components";
import { useEffect, useState } from "react";
import { get } from "lodash";

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
    laudo: true,
  });

  const [form, setForm] = useState(formFields);
  const [disabled, setDisabled] = useState(true);

  function atualizar(e) {
    const t = e.target;
    setForm({
      ...form,
      [t.name]: t.type === "checkbox" ? t.checked : t.value,
    });
    if (t.name === "notaFiscal") setDisabled(!t.value);
  }

  useEffect(() => {
    window.axios
      .get(`cadastrar/material/api/EntradaMaterial/${id}`)
      .then(({ data }) => {
        let dados = {
          numeroPedido: data.numeroPedido,
          tipoFrete: data.tipoFrete,
          condicaoPagamento: data.formaPagamento,
          fornecedor: get(data, "Fornecedor.nomeFantasia"),
          transportadora: get(
            data,
            "Transportadora.FornecedorTransportadora.nomeFantasia"
          ),
        };
        setForm((form) => ({
          ...form,
          ...dados,
        }));
      });
  }, [id]);

  const submit = () => {
    window.axios
      .post("cadastrar/material/api/EntradaMaterial", form)
      .then(() => navigate(`/${id}/quantitativa`));
  };

  return (
    <div className="container-cards">
      <div className="mb-4">
        <h3 className="text-white">
          Recebimento de Produto - Conferência de Dados
        </h3>
      </div>

      <div className="card-cadastro p-5 col-lg-6 mx-auto">
        <div className="mb-3 d-flex justify-content-center">
          <Contador etapa={1} />
        </div>
        <div>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nº do pedido</Form.Label>
              <Form.Control
                name="numeroPedido"
                onChange={atualizar}
                value={form.numeroPedido}
                disabled
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Nº da nota fiscal</Form.Label>
              <Form.Control
                name="notaFiscal"
                onChange={atualizar}
                value={form.notaFiscal}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Fornecedor</Form.Label>
              <Form.Control
                name="fornecedor"
                onChange={atualizar}
                value={form.fornecedor}
                disabled
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Transportadora</Form.Label>
              <Form.Control
                name="transportadora"
                onChange={atualizar}
                value={form.transportadora}
                disabled
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Tipo de frete</Form.Label>
              <Form.Control
                name="tipoFrete"
                onChange={atualizar}
                value={form.tipoFrete}
                disabled
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Condição de pagamento</Form.Label>
              <Form.Control
                name="condicaoPagamento"
                onChange={atualizar}
                value={form.condicaoPagamento}
                disabled
              />
            </Form.Group>
            {/* <Form.Group controlId="info" className="mb-3">
              <Form.Label>Informações complementares</Form.Label>
              <Form.Control as="textarea" rows={4} />
            </Form.Group> */}
            <Form.Group className="mb-5">
              <Form.Check
                name="laudo"
                label="Foi apresentado o laudo?"
                checked={form.laudo}
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
                  disabled={disabled}
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

// teste
