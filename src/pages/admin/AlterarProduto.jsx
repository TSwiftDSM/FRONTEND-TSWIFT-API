import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormGroup, FormField } from "../../components";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import axios from "axios";
import { unidadeDeMedida } from "../../constants";

const NovoProduto = () => {
  const idProduto = parseInt(useParams().id);
  const navigate = useNavigate();

  const formFields = Object.freeze({
    nomeProduto: "",
    unidade: "",
  });

  const [form, setForm] = useState({ formFields });

  const ref = useRef(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/produto/${idProduto}`).then(({ data }) => {
      setForm({ ...formFields, ...data });
    });
  }, []);

  async function submit() {
    const data = await ref.current.getForm();
    delete data.id;
    axios.put(`http://localhost:3000/produto/${idProduto}`, data).then(() => {
      navigate("/admin/produtos");
    });
  }

  function handleDelete() {
    axios.delete(`http://localhost:3000/produto/${idProduto}`).then(() => {
      navigate("/admin/produtos");
    });
  }

  return (
    <div>
      <div className="mb-4">
        <h3 className="text-white">Alterar Produto</h3>
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
            <FormField nome="nomeProduto" label="Nome do produto" required />
            {/* <FormField nome="unidade" label="Unidade de medida (KG / Litro)" required /> */}
            <FormField
              nome="unidade"
              label="Unidade de medida"
              tipo="select"
              options={unidadeDeMedida}
              value={form.unidade}
              required
            />
          </FormGroup>
          <div className="pt-5 d-flex justify-content-center">
            <button className="btn btn-danger px-5 me-4" onClick={handleDelete}>
              APAGAR
            </button>
            <button className="btn btn-primary py-2 px-5" onClick={submit}>
              ALTERAR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NovoProduto;
