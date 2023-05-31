import { useEffect, useState } from "react";
import { CardEntrega } from "../components";
import { Link } from "react-router-dom";
import { etapas } from "../constants";
import axios from "axios";

const EntregasAgendadas = () => {
  const [pedidos, setPedidos] = useState([]);
  const [numeroPedido, setNumeroPedido] = useState("");

  useEffect(() => {
    if (numeroPedido) {
      axios.get(`entregas/numeroPedido/${numeroPedido}`).then(({ data }) => {
        setPedidos(data);
      });
    } else {
      axios.get("entregas").then(({ data }) => {
        setPedidos(data);
      });
    }
  }, [numeroPedido]);

  function listarPedidos() {
    return pedidos.map((p, i) => {
      const etapa = etapas[p.etapaEntrega] || 0;
      const rota = Object.freeze({
        0: "entrada",
        1: "quantitativa",
        2: "qualitativa",
        3: "relatorio",
      });
      return (
        <Link
          className="col-lg-4 col-md-6 mb-3"
          key={i}
          to={`${p.id}/${rota[etapa]}`}
        >
          <CardEntrega pedido={p} />
        </Link>
      );
    });
  }

  return (
    <div>
      <div className="row justify-content-between mb-5">
        <div className="col-lg-4">
          <h3 className="text-white">Entregas agendadas</h3>
        </div>
        <div className="col-lg-4">
          <input
            type="text"
            className="form-control"
            placeholder="Nº do Pedido"
            value={numeroPedido}
            onChange={(e) => setNumeroPedido(e.target.value)}
          />
        </div>
      </div>
      <div className="row">{listarPedidos()}</div>
      <div className="verMaisEntregas">
        <a href="/admin/pedidos">Ver mais</a>
      </div>
    </div>
  );
};

export default EntregasAgendadas;
