import { get } from "lodash";
import { formatarData } from "../helpers";

export const CardEntrega = (props) => {
  const { pedido } = props;

  const status = () => {
    switch (pedido.etapaEntrega) {
      case "":
        return new Date() < new Date(pedido.dataEntrega)
          ? {
              cor: "amarelo",
              texto: "Aguardando entrega",
              class: "text-secondary",
            }
          : {
              cor: "vermelho",
              texto: "Atrasada",
              class: "text-danger",
            };
      case "QUALITATIVA":
        return {
          cor: "verde",
          texto: "Entrega recebida",
          class: "text-primary",
        };
      default:
        return {
          cor: "azul",
          texto: "Em recebimento",
          class: "text-warning",
        };
    }
  };

  return (
    <div className={"card entrega " + status().cor}>
      <div className="d-flex justify-content-between">
        <h5>Nº {pedido.numeroPedido}</h5>
        <div className={status().class}>{status().texto}</div>
      </div>
      <div className="mt-2">{get(pedido, "Fornecedor.nomeFantasia")}</div>

      {
        <div className="mt-4">
          Data prevista: {formatarData(pedido.dataEntrega) || "Indefinida"}
        </div>
      }
    </div>
  );
};
