import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Collapse } from "react-bootstrap";

import { useState } from "react";

import styled from "styled-components";

export const Colapsador = (props) => {
  const { nome, children } = props;

  const [open, setOpen] = useState(false);

  let iconClass = open ? "rodar" : "";

  return (
    <div>
      <CollapseButton
        onClick={() => setOpen(!open)}
        className="w-100 d-flex align-items-center justify-content-between"
      >
        <span>{nome}</span>
        <FontAwesomeIcon
          className={iconClass}
          icon="fa-solid fa-caret-down"
          style={{ transition: "0.5s all" }}
        />
      </CollapseButton>

      <Collapse in={open}>
        <div className="mt-4">{children}</div>
      </Collapse>
    </div>
  );
};

const CollapseButton = styled.button`
  border: 0;
  border-bottom: 1px solid black;
  background: transparent;
  padding: 8px;
`;
