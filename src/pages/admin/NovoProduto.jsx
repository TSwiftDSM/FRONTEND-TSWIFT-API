import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormGroup, FormField } from "../../components";
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import axios from "axios";

const NovoProduto = () => {
  const navigate = useNavigate();

  const form = Object.freeze({
    nomeProduto: "",
    unidade: "",
  });

  const ref = useRef(null);

  async function submit() {
    const data = await ref.current.getForm();
    axios.post("http://localhost:3000/produto", data).then(() => {
      navigate("/admin/produtos");
    });
  }

  return (
    <div>
      <div className="mb-4">
        <h3 className="text-white">Novo Produto</h3>
      </div>
      <div className="card p-5 col-lg-6 mx-auto">
        <div className="mb-4">
          <Link to={"/admin/produtos"}>
            <FontAwesomeIcon icon="fa-solid fa-angle-left" className="me-2" />
            Produtos
          </Link>
        </div>
        <div>
          <FormGroup ref={ref} formFields={form}>
            <FormField nome="nomeProduto" label="Nome do produto" />
            <FormField nome="unidade" label="Unidade de medida" />
          </FormGroup>
          <div className="pt-5 d-flex justify-content-center">
            <button className="btn btn-primary py-2 px-5" onClick={submit}>
              CADASTRAR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NovoProduto;
