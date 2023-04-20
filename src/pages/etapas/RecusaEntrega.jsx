import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RecusaEntrega = () => {
  return (
    <div>
      <div className="mb-4">
        <h2 className="text-white">Receber Produto</h2>
      </div>
      <div className="card mx-auto col-lg-6 p-5">
        <div className="border-secondary text-center mb-2">
          <div style={{ fontSize: "36px" }} className="text-secondary">
            <FontAwesomeIcon icon="fa-solid fa-triangle-exclamation" />
          </div>
        </div>
        <h3 className="d-flex mb-5 justify-content-center">Entrega Recusada</h3>

        <div className=" d-flex justify-content-center">
          <div className="col-lg-5 mb-4">
            <Button
              className="w-100 py-2 text-white"
              variant="primary"
              type="button"
            >
              OK
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecusaEntrega;
