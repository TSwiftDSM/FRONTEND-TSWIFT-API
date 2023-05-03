import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Busca = () => {
  return (
    <div className="d-flex">
      <div className="flex-fill">
        <Form>
          <Form.Control />
        </Form>
      </div>
      <button className="btn btn-square btn-secondary ms-2">
        <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
      </button>
    </div>
  );
};
