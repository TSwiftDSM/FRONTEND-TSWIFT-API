import { Button } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";

const RecusaQuantitativa = () => {
  const { id } = useParams();

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-white">
          Recebimento de Produto - Conferência Quantitativa
        </h2>
      </div>
      <div className="card mx-auto col-lg-6 p-5 text-center">
        <h3 className="mb-4">ENTREGA RECUSADA</h3>
        <span className="mb-4">
          O valor total informado ultrapassou o limite de +/- 5% de diferença
          entre o pedido e a Nota Fiscal.
        </span>
        <div className="d-flex justify-content-between">
          <div className="col-lg-5 mb-4">
            <Link to={`/${id}/quantitativa`}>
              <Button
                className="w-100 py-2 text-white"
                variant="primary"
                type="button"
              >
                VOLTAR
              </Button>
            </Link>
          </div>
          <div className="col-lg-5 mb-4">
            <Link to={`/${id}/qualitativa`}>
              <Button
                className="w-100 py-2 text-white"
                variant="danger"
                type="submit"
              >
                CONTINUAR
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecusaQuantitativa;
