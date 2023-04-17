import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RecusaQuantitativa = () => {
  return (
    <div>
      <div className="mb-4">
        <h3 className="text-white">
          Recebimento de Produto - Conferência Quantitativa
        </h3>
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
    </div>
  );
};

export default RecusaQuantitativa;
