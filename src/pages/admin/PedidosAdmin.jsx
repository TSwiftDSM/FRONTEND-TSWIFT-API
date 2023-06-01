import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

import { formatarData } from "../../helpers";
import { useEffect, useState } from "react";
import { get } from "lodash";
import axios from "axios";

const PedidosAdmin = () => {
  const [pedidos, setPedidos] = useState([]);
  const [codPedido, setNumeroPedido] = useState("");

  useEffect(() => {
    if (codPedido) {
      axios.get(`entregas/numeroPedido/${codPedido}`).then(({ data }) => {
        setPedidos(data);
      });
    } else {
      axios.get("entregas").then(({ data }) => {
        setPedidos(data);
      });
    }
  }, [codPedido]);

  function statusDoPedido(pedidos) {
    switch (pedidos.etapaEntrega) {
      case "":
        return "Aguardando entrega";
      case "QUALITATIVA":
        return get(pedidos, "StatusEntrega.length") ? "Recusado" : "Recebido";
      default:
        return "Em recebimento";
    }
  }

  function statusClass(pedidos) {
    switch (pedidos.etapaEntrega) {
      case "QUALITATIVA":
        return get(pedidos, "StatusEntrega.length")
          ? "text-danger"
          : "text-success";
      case "":
        return "text-secondary";
      default:
        return "text-warning";
    }
  }

  return (
    <div className="container-cards">
      <div className="mb-4">
        <h3 className="text-white">Pedidos</h3>
      </div>
      <div className="card-list p-5">
        <div className="d-flex justify-content-end mt-2 mb-3">
          <div className="col-lg-3 mx-3">
            <input
              type="text"
              className="form-control"
              placeholder="Código do Pedido"
              value={codPedido}
              onChange={(e) => setNumeroPedido(e.target.value)}
            />
          </div>
          <Link to={"/admin/novo-pedido"}>
            <button className="btn btn-primary">+ Novo</button>
          </Link>
        </div>
        {pedidos && pedidos.length ? (
          <Table striped bordered >
            <thead>
              <tr>
                <th className="text-center" style={{ width: "10%" }}>Nº Pedido</th>
                <th>Fornecedor</th>
                <th>Data prevista</th>
                <th>Status</th>
                <th style={{ width: "10%" }} />
              </tr>
            </thead>
            <tbody>
              {pedidos.map((p, i) => {
                return (
                  <tr key={i}>
                    <th className="text-center">{p.id}</th>
                    <th>{get(p, "Fornecedor.nomeFantasia")}</th>
                    <th>{formatarData(p.dataEntrega)}</th>
                    <th><strong className={statusClass(p)}>{statusDoPedido(p)}</strong></th>
                    <th>
                      <Link to={`/${p.id}/relatorio`}>
                        ver mais
                      </Link>
                    </th>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        ) : (
          <div className="text-center my-5">
            <h3>Não foram encontrados pedidos</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default PedidosAdmin;
