const CardEntrega = (props) => {
  const { variante } = props;

  return (
    <div className={"card entrega " + variante}>
      <div className="d-flex justify-content-between">
        <h5>Nº 12345</h5>
        <div className="text-danger">Atrasado</div>
      </div>
      <div className="mt-2">2345 - Fornecedor 1</div>
      <div className="mt-4">Data prevista: dd/mm/YYYY</div>
    </div>
  );
};

export default CardEntrega;
