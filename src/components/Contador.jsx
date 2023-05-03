import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styled from "styled-components";

export const Contador = (props) => {
  const { etapa } = props;

  const contador = (atual) => {
    if (etapa > atual) {
      return (
        <Circulo className="bg-primary border-0 text-white">
          <FontAwesomeIcon icon="fa-solid fa-check" />
        </Circulo>
      );
    } else {
      return <Circulo>{atual}</Circulo>;
    }
  };

  return (
    <div className="d-flex">
      {contador(1)}
      <Linha />
      {contador(2)}
      <Linha />
      {contador(3)}
    </div>
  );
};

const Circulo = styled.div`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Linha = styled.div`
  width: 40px;
  border-bottom: 1px solid black;
  height: 20px;
`;
