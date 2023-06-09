import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Collapse } from "react-bootstrap";
import Tabela from "./Tabela";

import { useState } from "react";

import styled from "styled-components";

const CollapseComponent = (props) => {
  const { conjunto, atualizar } = props;

  const [open, setOpen] = useState(false);

  let iconClass = open ? "rodar" : "";

  function atualizarConjunto(regras) {
    atualizar({ ...regras, idProduto: conjunto.id });
  }

  return (
    <div>
      <CollapseButton
        onClick={() => setOpen(!open)}
        className="w-100 d-flex align-items-center justify-content-between"
      >
        <span>{conjunto.nomeProduto}</span>
        <FontAwesomeIcon
          className={iconClass}
          icon="fa-solid fa-caret-down"
          style={{ transition: "0.5s all" }}
        />
      </CollapseButton>

      <Collapse in={open}>
        <div className="mt-4">
          <Tabela
            regras={conjunto.TesteQualidade}
            atualizarRegras={atualizarConjunto}
          />
        </div>
      </Collapse>
    </div>
  );
};

export default CollapseComponent;

const CollapseButton = styled.button`
  border: 0;
  border-bottom: 1px solid black;
  background: transparent;
  padding: 8px;
`;
