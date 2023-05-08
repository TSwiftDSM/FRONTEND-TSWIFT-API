// import { formatarData } from "../helpers";

import { get } from "lodash";
import { formatarData } from "../helpers";


export const CardEntrega = (props) => {
  const { pedido } = props;

  const status = pedido.etapaEntrega
    ? "azul"
    : new Date() <= new Date(pedido.dataEntrega)
    ? "verde"
    : "vermelho";

  return (
    <div className={"card entrega " + status}>
      <div className="d-flex justify-content-between">
        <h5>Nº {pedido.numeroPedido}</h5>
        {/* {status ? (
          <div className="text-primary">Hoje</div>
        ) : (
          <div className="text-danger">Atrasado</div>
        )} */}
      </div>
      <div className="mt-2">{get(pedido, "Fornecedor.nomeFantasia")}</div>
      <div className="mt-2">{formatarData(pedido.dataEntrega) <=  formatarData(new Date()) ? 'Atrasado' : 'No Prazo'}</div>

      {/* <div className="mt-4">
        Data prevista: {formatarData(pedido.dataEntrega) || "Indefinida"}
      </div> */}
    </div>
  );
};
