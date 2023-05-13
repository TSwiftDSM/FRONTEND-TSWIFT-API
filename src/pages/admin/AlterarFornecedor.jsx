import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FormGroup, FormField } from "../../components";
import { useRef, useEffect, useState } from "react";
import axios from "axios";

const AlterarFornecedor = () => {
  //const [fornecedores, setFornecedores] = useState([]);

  const idFornecedor = parseInt(useParams().id);
  const navigate = useNavigate();

  const formFields = Object.freeze({
    endereco: "",
    fornecedor: true,
    fornecedorCNPJ: "",
    nomeFantasia: "",
    razaoSocial: "",
    transportadora: true,
  });

  const [form, setForm] = useState({ formFields });

  useEffect(() => {
    axios
      .get(`http://localhost:3000/fornecedores/porId/${idFornecedor}`)
      .then(({ data }) => {
        setForm({ ...formFields, ...data });
      });
  }, []);

  const ref = useRef(null);

  async function submit() {
    const data = await ref.current.getForm();
    delete data.id;
    axios
      .put(`http://localhost:3000/fornecedores/${idFornecedor}`, data)
      .then(() => {
        navigate("/admin/fornecedores");
      });
  }

  return (
    <div>
      <div className="mb-4">
        <h3 className="text-white">Alterar Fornecedor</h3>
      </div>
      <div className="card p-5 col-lg-6 mx-auto">
        <div className="mb-4">
          <Link to={"/admin/fornecedores"}>
            <FontAwesomeIcon icon="fa-solid fa-angle-left" className="me-2" />
            Fornecedores
          </Link>
        </div>
        <div>
          <FormGroup formFields={form} ref={ref}>
            <FormField nome="nomeFantasia" label="Nome Fantasia" required />
            <FormField nome="fornecedorCNPJ" label="CNPJ" required />
            <FormField nome="razaoSocial" label="Razão Social" required />
            <FormField nome="endereco" label="Endereço" required />
          </FormGroup>
        </div>
        <div className="mt-5 d-flex justify-content-center">
          <button className="btn btn-primary px-5" onClick={submit}>
            ALTERAR
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlterarFornecedor;
