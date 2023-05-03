import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

import { formatarData } from "../../helpers";
import { useEffect, useState } from "react";
import { get } from "lodash";
import axios from "axios";

const PedidosAdmin = () => {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/entregas").then(({ data }) => {
      setPedidos(data);
    });
  }, []);

  return (
    <div>
      <div className="mb-4">
        <h3 className="text-white">Pedidos</h3>
      </div>
      <div className="card col-lg-12 p-5">
        <div className="mt-3 d-flex justify-content-end">
          <Link to={"/admin/novo-pedido"}>
            <Button variant="primary" className="px-4 py-2">
              + Novo
            </Button>
          </Link>
        </div>
        <div className="my-3">
          <Table
            striped
            bordered
            style={{
              gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr",
            }}
          >
            <thead>
              <tr>
                <th style={{ width: "6%" }}>Código</th>
                <th style={{ width: "12%" }}>Fornecedor</th>
                {/* <th style={{ width: "12%" }}>Transportadora</th> */}
                {/* <th style={{ width: "18%" }}>Produto</th> */}
                <th style={{ width: "12%" }}>Cond. Pag.</th>
                <th style={{ width: "10%" }}>Tipo de Frete</th>
                <th style={{ width: "12%" }}>Data prevista</th>
                {/* <th style={{ width: "10%" }}>Status</th> */}
                <th style={{ width: "4%" }} />
              </tr>
            </thead>
            <tbody>
              {pedidos.map((p, i) => {
                return (
                  <tr key={i}>
                    <th>{p.id}</th>
                    <th>{get(p, "Fornecedor.nomeFantasia")}</th>
                    {/* <th>{p.transportadora}</th> */}
                    {/* <th>
                      {p.produtos.map((prod, i) => {
                        return (
                          <div key={i}>
                            <span>{prod.cod} - </span>
                            <span>{prod.nome} - </span>
                            <span>{prod.peso}</span>
                          </div>
                        );
                      })}
                    </th> */}
                    <th>{p.formaPagamento}</th>
                    <th>{p.tipoFrete}</th>
                    <th>{formatarData(p.dataEntrega)}</th>
                    {/* <th>{p.status}</th> */}
                    <th>
                      <Link
                        className="d-flex align-items-center justify-content-center"
                        to={`/${p.id}/relatorio`}
                      >
                        <button className="btn btn-square btn-outline-dark text-center">
                          <FontAwesomeIcon icon={"fa-solid fa-angle-right"} />
                        </button>
                      </Link>
                    </th>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default PedidosAdmin;
