import { Button } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";

const RecusaQuantitativa = () => {
  const { id } = useParams();

  return (
    <div className="container-cards">
      <div className="mb-4">
        <h3 className="text-white">
          Recebimento de Produto - Conferência Quantitativa
        </h3>
      </div>
      <div className="card-cadastro p-5 col-lg-6 mx-auto">
        <h3 className="mb-4">ENTREGA RECUSADA</h3>
        <p className="mb-4">
          O valor total informado ultrapassou o limite da Regra Quantitativa de diferença
          entre o pedido e a Nota Fiscal.
        </p>
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
