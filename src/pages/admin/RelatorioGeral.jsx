import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const RelatioGeral = () => {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    window.axios.get("entregas").then(({ data }) => {
      setPedidos(data.filter((i) => i.etapaEntrega));
    });
  }, []);

  function relatorios() {
    return pedidos.map((p, i) => (
      <div className="my-4 border-bottom border-dark" key={i}>
        <div className="small">
          <strong className="me-1">Nº do Pedido:</strong>
          {p.numeroPedido}
        </div>
        <div className="small">
          <strong className="me-1">Status:</strong>
          <span>{p.statusPedido}</span>
        </div>
        <div className="small">
          <strong className="me-1">Data Entrega:</strong>
          <span>{p.dataEntrega}</span>
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
            <FontAwesomeIcon icon="fa-solid fa-angle-left" className="me-2" />
            Voltar
          </Link>
        </div>
        {relatorios()}
      </div>
    </div> 
  );
};
export default RelatioGeral;
