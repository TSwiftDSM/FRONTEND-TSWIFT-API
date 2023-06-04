import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const RelatioGeral = () => {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    window.axios.get("entregas").then(({ data }) => {
      setPedidos(data);
    });
  }, []);

  function relatorios() {
    return pedidos.map((p, i) => (
      <div className="my-4 border-bottom border-dark" key={i}>
        <div className="small">
          <strong className="me-1">Nº do Pedido:</strong>
          {p.numeroPedido}
        </div>
      </div>
    ));
  }

  return (
    <>
      <div className="mb-4">
        <h3 className="text-white">Relatório</h3>
      </div>
      <div className="card mx-auto col-lg-6 p-5">
        <div className="mb-4">
          <Link to={"/admin/menu-relatorios"}>
            <FontAwesomeIcon icon="fa-solid fa-angle-left" className="me-2" />
            Voltar
          </Link>
        </div>
        {relatorios()}
      </div>
    </>
  );
};
export default RelatioGeral;
