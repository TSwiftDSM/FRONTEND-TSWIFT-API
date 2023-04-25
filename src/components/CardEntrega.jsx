// import { formatarData } from "../helpers";

import { get } from "lodash";

const CardEntrega = (props) => {
  const { pedido } = props;

  const status = !(
    get(pedido, "StatusEntrega.length")
    // new Date() <= new Date(pedido.dataEntrega) || !pedido.dataEntrega
  );

  return (
    <div className={"card entrega " + (status ? "verde" : "vermelho")}>
      <div className="d-flex justify-content-between">
        <h5>Nº {pedido.numeroPedido}</h5>
        {/* {status ? (
          <div className="text-primary">Hoje</div>
        ) : (
          <div className="text-danger">Atrasado</div>
        )} */}
      </div>
      <div className="mt-2">{get(pedido, "Fornecedor.nomeFantasia")}</div>
      {/* <div className="mt-4">
        Data prevista: {formatarData(pedido.dataEntrega) || "Indefinida"}
      </div> */}
    </div>
  );
};

export default CardEntrega;
