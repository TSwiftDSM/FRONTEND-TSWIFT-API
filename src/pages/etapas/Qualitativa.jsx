import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import Contador from "../../components/Contador";
import CollapseComponent from "../../components/qualitativa/CollapseComponent";

import { useState } from "react";

const Qualitativa = () => {
  const [conjuntos, setConjuntos] = useState(listaConjuntos);

  function atualizarConjunto(id, regras) {
    let atualizado = conjuntos.map((c) => {
      if (c.produto.id === id) {
        return { ...c, regras: regras };
      }
      return c;
    });
    setConjuntos(atualizado);
  }

  function submit() {
    for (let c in conjuntos) {
      console.log(conjuntos[c]);
    }
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
          {conjuntos.map((conjunto, i) => {
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
    produto: {
      id: 4234,
      nome: "Arroz Vermelho",
    },
    regras: [
      {
        id: 1,
        texto: "A embalagem foi violada?",
        status: false,
      },
      {
        id: 2,
        texto: "O produto está mal condicionado?",
        status: false,
      },
      {
        id: 3,
        texto: "O produto possui alguma avaria?",
        status: false,
      },
    ],
  },
  {
    produto: {
      id: 5672,
      nome: "Arroz Branco",
    },
    regras: [
      {
        id: 1,
        texto: "A embalagem foi violada?",
        status: false,
      },
      {
        id: 2,
        texto: "O produto está mal condicionado?",
        status: false,
      },
      {
        id: 3,
        texto: "O produto possui alguma avaria?",
        status: false,
      },
    ],
  },
];
