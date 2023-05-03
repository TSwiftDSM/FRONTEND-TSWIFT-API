import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { useState } from "react";

const NovoProduto = () => {
  // const formFields = Object.freeze({
  //   nomeProduto: "",
  //   unidade: "",
  // });

  // const [form, setForm] = useState(formFields);

  return (
    <div>
      <div className="mb-4">
        <h3 className="text-white">Pedidos</h3>
      </div>
      <div className="card p-5 col-lg-6 mx-auto">
        <div className="mb-4">
          <Link to={"/admin/produtos"}>
            <FontAwesomeIcon icon="fa-solid fa-angle-left" className="me-2" />
            Produtos
          </Link>
        </div>
        <div>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control name="nomeProduto" />
            </Form.Group>
            <Form.Group className="mb-5">
              <Form.Label>Unidade de medida</Form.Label>
              <Form.Control name="unidade" />
            </Form.Group>
          </Form>
          <div className="pt-5 d-flex justify-content-center">
            <button className="btn btn-primary px-5">CADASTRAR</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NovoProduto;
