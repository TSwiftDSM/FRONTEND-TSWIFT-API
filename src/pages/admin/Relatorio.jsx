const Relatorio = () => {
  return (
    <div>
      <div className="mb-4">
        <h3 className="text-white">Pedidos</h3>
      </div>

      <div className="card mx-auto col-lg-6 p-5">
        <div className="small">
          <strong className="me-1">Nº do Pedido:</strong>
          xxxxx
        </div>
        <div className="small">
          <strong className="me-1">Status:</strong>
          <span>Recusado</span>
        </div>
        <div className="mt-4 small">
          <strong className="me-1">Data Prevista:</strong>
          dd/mm/aaaa
        </div>
        <div className="small">
          <strong className="me-1">Data de Entrega:</strong>
          dd/mm/aaaa
        </div>
      </div>
    </div>
  );
};

export default Relatorio;
