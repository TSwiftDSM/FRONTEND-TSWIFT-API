import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { FormGroup, FormField } from "../../components";
import { useRef } from "react";
import axios from "axios";

const NovoFornecedor = () => {
  //const [fornecedores, setFornecedores] = useState([]);

  const navigate = useNavigate();

  const form = Object.freeze({
    nomeFantasia: "",
    fornecedorCNPJ: "",
    razaoSocial: "",
    endereco: "",
    fornecedor: true,
    transportadora: false,
  });

  const ref = useRef(null);

  async function submit() {
    const data = await ref.current.getForm();
    axios.post("http://localhost:3000/fornecedores", data).then(() => {
      navigate("/admin/fornecedores");
    });
  }

  return (
    <div>
      <div className="mb-4">
        <h3 className="text-white">Novo Fornecedor</h3>
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
            CONFIRMAR
          </button>
        </div>
      </div>
    </div>
  );
};

export default NovoFornecedor;
