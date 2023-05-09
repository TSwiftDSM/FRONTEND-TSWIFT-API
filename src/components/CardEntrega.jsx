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
      {pedido.etapaEntrega != '' ? 'Em recebimento' :  formatarData(pedido.dataEntrega) <= formatarData(new Date()) ? <div className="text-danger">Atrasado</div> : <div className="text-primary">Hoje</div>}

      {/* {<div className="mt-4">
        Data prevista: {formatarData(pedido.dataEntrega) || "Indefinida"}
      </div>} */}
    </div>
  );
};
