import CardEntrega from "../components/CardEntrega";
// import Busca from "../components/Busca";
import { Link } from "react-router-dom";

import { useEffect, useState } from "react";

import { etapas } from "../constants";

import axios from "axios";

const EntregasAgendadas = () => {
  const [pedidos, setPedidos] = useState([]);

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

  useEffect(() => {
    axios.get("http://localhost:3000/entregas").then(({ data }) => {
      setPedidos(data);
    });
  }, []);

  return (
    <div>
      <div className="row justify-content-between mb-5">
        <div className="col-lg-4">
          <h3 className="text-white">Entregas agendadas</h3>
        </div>
        <div className="col-lg-4">{/* <Busca /> */}</div>
      </div>
      <div className="row">{listarPedidos()}</div>
    </div>
  );
};

export default EntregasAgendadas;
