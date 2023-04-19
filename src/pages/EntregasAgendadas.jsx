import CardEntrega from "../components/CardEntrega";
import Busca from "../components/Busca";
import { useEffect, useState } from "react";

import axios from "axios";

const EntregasAgendadas = () => {
  const [pedidos, setPedidos] = useState([]);

  function listarPedidos() {
    return pedidos.map((p, i) => {
      return (
        <div className="col-lg-4 col-md-6 mb-3" key={i}>
          <CardEntrega pedido={p} />
        </div>
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
        <div className="col-lg-4">
          <Busca />
        </div>
      </div>
      <div className="row">{listarPedidos()}</div>
    </div>
  );
};

export default EntregasAgendadas;
