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
      <div className="card-cadastro p-5 col-lg-6 mx-auto text-center">
        <h3 className="mb-4">ENTREGA RECUSADA</h3>
<<<<<<< HEAD
        <p className="mb-4">
          O valor total informado ultrapassou o limite da Regra Quantitativa de diferença
=======
        <p>
          O valor total informado ultrapassou o limite de +/- 5% de diferença
>>>>>>> 3bdf7afd96cbfe7a4127c7bf6dde9d8d214d354a
          entre o pedido e a Nota Fiscal.
        </p>
        <div className="d-flex justify-content-center">
          <div className="col-lg-5 my-4">
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
