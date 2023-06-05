import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { formatarData } from "../../helpers";
import axios from "axios";

const RelatioGeral = () => {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    axios.get("entregas").then(({ data }) => {
      setPedidos(data.filter((i) => i.etapaEntrega));
    });
  }, []);

  function statusDoPedido(pedido) {
    switch (pedido.etapaEntrega) {
      case "":
        return "Aguardando entrega";
      case "QUALITATIVA":
        return pedido.StatusEntrega && pedido.StatusEntrega.length
          ? "Recusado"
          : "Recebido";
      default:
        return "Em recebimento";
    }
  }

  function statusClass(pedido) {
    switch (pedido.etapaEntrega) {
      case "QUALITATIVA":
        return pedido.StatusEntrega && pedido.StatusEntrega.length
          ? "text-danger"
          : "text-success";
      case "":
        return "text-secondary";
      default:
        return "text-warning";
    }
  }

  function relatorios() {
    return pedidos.map((pedido, i) => (
      <div className="my-4 border-bottom border-dark" key={i}>
        <div className="small">
          <strong className="me-1">Nº do Pedido:</strong>
          {pedido.numeroPedido}
        </div>
        <div className="small">
          <strong className="me-1">Status:</strong>
          <span className={statusClass(pedido)}>{statusDoPedido(pedido)}</span>
        </div>
        <div className="small">
          <strong className="me-1">Data Entrega:</strong>
          {formatarData(pedido.dataEntrega)}
          {/* <span>{pedido.dataEntrega}</span> */}
        </div>
      </div>
    ));
  }

  return (
    <div className="container-cards">
      <div className="mb-4">
        <h3 className="text-white">Relatório Geral</h3>
      </div>
      <div className="card-cadastro p-5 col-lg-6 mx-auto">
        <div className="mb-4">
          <Link to={"/admin/menu-relatorios"}>
            <FontAwesomeIcon
              icon={["fa-solid", "fa-angle-left"]}
              className="me-2"
            />
            Voltar
          </Link>
        </div>
        {relatorios()}
      </div>
    </div>
  );
};

export default RelatioGeral;
