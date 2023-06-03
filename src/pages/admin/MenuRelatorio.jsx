import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

import { formatarData } from "../../helpers";
import { useEffect, useState } from "react";
import { get } from "lodash";
import axios from "axios";

const Menurelatorio = () => {
  const [pedidos, setPedidos] = useState([]);
  const [codPedido, setNumeroPedido] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (codPedido) {
      axios.get(`entregas/numeroPedido/${codPedido}`).then(({ data }) => {
        setPedidos(data);
      });
    } else if (status) {
      axios.get(`entregas/status/${status}`).then(({ data }) => {
        setPedidos(data);
      });
    } else {
      window.axios.get("entregas").then(({ data }) => {
        setPedidos(data);
      });
    }
  }, [codPedido, status]);

  function statusDoPedido(pedido) {
    switch (pedido.etapaEntrega) {
      case "":
        return "Aguardando entrega";
      case "QUALITATIVA":
        return get(pedido, "StatusEntrega.length") ? "Recusado" : "Recebido";
      default:
        return "Em recebimento";
    }
  }

  function statusClass(pedido) {
    switch (pedido.etapaEntrega) {
      case "QUALITATIVA":
        return get(pedido, "StatusEntrega.length")
          ? "text-danger"
          : "text-success";
      case "":
        return "text-secondary";
      default:
        return "text-warning";
    }
  }

  return (
    <div>
      <div className="mb-4">
        <h3 className="text-white">Relatórios</h3>
      </div>
      <div className="card col-lg-12 p-5">
        <div className="mt-2 d-flex justify-content-end">
          <div className="col-lg-3 mx-3">
            <input
              type="text"
              className="form-control"
              placeholder="Código do Pedido"
              value={codPedido}
              onChange={(e) => setNumeroPedido(e.target.value)}
            />
          </div>
          <div className="col-lg-3 mx-3">
            <input
              type="text"
              className="form-control"
              placeholder="Status do Pedido"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            />
          </div>
          <Link to={"/admin/"}>
            <button className="btn btn-primary">Gerar Relatório geral</button>
          </Link>
        </div>
        <div className="my-3">
          {pedidos && pedidos.length ? (
            <Table
              striped
              bordered
              style={{
                gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr",
              }}
            >
              <thead>
                <tr>
                  <th style={{ width: "2%" }}>Código</th>
                  <th style={{ width: "12%" }}>Fornecedor</th>
                  {/*  <th style={{ width: "12%" }}>Data Prevista</th> */}
                  <th style={{ width: "10%" }}>Data Entrega</th>
                  <th style={{ width: "12%" }}>Status</th>
                  <th style={{ width: "4%" }} />
                </tr>
              </thead>
              <tbody>
                {pedidos.map((p, i) => {
                  return (
                    <tr key={i}>
                      <th>{p.id}</th>
                      <th>{get(p, "Fornecedor.nomeFantasia")}</th>
                      {/* 
                      <th>{formatarData(p.dataEntrega)}</th> */}
                      <th>{formatarData(p.dataEntrega)}</th>
                      <th>
                        <strong className={statusClass(p)}>
                          {statusDoPedido(p)}
                        </strong>
                      </th>
                      {/* <th>{formatarData(p.dataEntrega)}</th> */}

                      <th>
                        <Link
                          className="d-flex align-items-center justify-content-center"
                          to={`/${p.id}/relatorio`}
                        >
                          <button>Gerar Relatório</button>
                        </Link>
                      </th>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          ) : (
            <div className="text-center my-5">
              <h3>Não foram encontrados Relatórios</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menurelatorio;
