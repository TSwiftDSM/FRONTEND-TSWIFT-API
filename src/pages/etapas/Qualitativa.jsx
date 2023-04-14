import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useParams } from "react-router-dom";

import Contador from "../../components/Contador";
import CollapseComponent from "../../components/qualitativa/CollapseComponent";

const Qualitativa = () => {
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
        <h3 className="text-white">Receber Produto</h3>
      </div>

      <div className="card mx-auto col-lg-6 p-5">
        <div className="mx-auto mb-3">
          <Contador etapa={3} />
        </div>

        <div className="mb-4">
          <Link to={"/"}>
            <FontAwesomeIcon icon="fa-solid fa-angle-left" className="me-2" />
            Voltar
          </Link>
        </div>

        <div className="card amarelo border-secondary text-center mb-5">
          <div style={{ fontSize: "36px" }} className="text-secondary">
            <FontAwesomeIcon icon="fa-solid fa-triangle-exclamation" />
          </div>
          <span>
            Respostas marcadas com SIM confirmam a existência de inconsistências
            na qualidade dos produtos.
          </span>
        </div>

        <div className="mb-4">
          {listaConjuntos.map((conjunto, i) => {
            return (
              <div key={i} className="mb-4">
                <CollapseComponent
                  conjunto={conjunto}
                  atualizar={atualizarConjunto}
                />
              </div>
            );
          })}
        </div>
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
  );
};

export default Qualitativa;

let listaConjuntos = [
  {
    Produto: 1,
    nome: "PRODUTO 1",
    TesteQualidade: [{ id: 1, nomeTeste: "TESTE 1" }],
  },
  {
    Produto: 2,
    nome: "PRODUTO 2",
    TesteQualidade: [
      { id: 1, nomeTeste: "TESTE 1" },
      { id: 2, nomeTeste: "TESTE 2" },
    ],
  },
  {
    Produto: 4,
    nome: "PRODUTO 4",
    TesteQualidade: [
      { id: 1, nomeTeste: "TESTE 1" },
      { id: 3, nomeTeste: "TESTE 3" },
      { id: 4, nomeTeste: "TESTE 4" },
    ],
  },
];
