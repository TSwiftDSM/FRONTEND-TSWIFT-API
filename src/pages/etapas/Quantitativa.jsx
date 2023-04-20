import { Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useParams } from "react-router-dom";

import Contador from "../../components/Contador";
import CollapseComponent from "../../components/qualitativa/CollapseComponent";

const Quantitativa = () => {
  const idEntrega = parseInt(useParams().id);

  let form = listaConjuntos
    .map((c) =>
      c.TesteQualidade.map((t) => {
        return {
          idEntrega: idEntrega,
          status: false,
          idProduto: c.Produto,
          idQualidade: t.id,
        };
      })
    )
    .flat(1);

  function atualizarConjunto(c) {
    let index = form.findIndex(
      (i) => i["idProduto"] == c.idProduto && i.idQualidade == c.idQualidade
    );
    form[index] = { ...c, idEntrega: idEntrega };
  }

  function submit() {
    console.log(form[0]);
  }
  return (
    <div>
      <div className="mb-4">
        <h3 className="text-white">
          Recebimento de Produto - Conferência Quantitativa
        </h3>
      </div>
      <div className="card mx-auto col-lg-6 p-5">
        <div className="mx-auto mb-3">
          <Contador etapa={2} /> {/* posição do indicador de etapas */}
        </div>
        <Link to={"/"}>
          <FontAwesomeIcon icon="f-solid fa-angle-left" className="me-2" />
          Voltar
        </Link>

        <div className="mb-4">
          {listaConjuntos.map((conjunto, i) => {
            return (
              <div key={i} className="mb-4">
                <CollapseComponent
                  conjunto={conjunto}
                  atualizar={atualizarConjunto}
                />
                <Form.Group
                  controlId="numero"
                  className="mb-3"
                  placeholder="Selecione"
                >
                  <Form.Label>Especificação do Produto</Form.Label>
                  <Form.Control disabled />
                </Form.Group>
                <Form.Group
                  controlId="numero"
                  className="mb-3"
                  placeholder="Selecione"
                >
                  <Form.Label>Quantidade</Form.Label>
                  <Form.Control disabled />
                </Form.Group>
                <Form.Group
                  controlId="numero"
                  className="mb-3"
                  placeholder="Selecione"
                >
                  <Form.Label>Unidade</Form.Label>
                  <Form.Control disabled />
                </Form.Group>
                <Form.Group
                  controlId="numero"
                  className="mb-3"
                  placeholder="Selecione"
                >
                  <Form.Label>Valor Total</Form.Label>
                  <Form.Control disabled />
                </Form.Group>
              </div>
            );
          })}
        </div>

        <div className="mb-4">
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

let listaConjuntos = [
  {
    Produto: 1,
    nome: "3232 - Arroz Vermelho",
    TesteQualidade: [
      { id: 1, nomeTeste: "TESTE 1" },
    ] /* preciso arrumar para listar regras quantitativas */,
  },
  {
    Produto: 2,
    nome: "3233 - Arroz Branco",
    TesteQualidade: [
      { id: 1, nomeTeste: "TESTE 1" },
      { id: 2, nomeTeste: "TESTE 2" },
    ],
  },
];
