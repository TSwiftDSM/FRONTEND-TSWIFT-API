import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormGroup, FormField } from "../../components";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import axios from "axios";

const AlterarRegra = () => {
  const idRegra = parseInt(useParams().id);
  const navigate = useNavigate();

  const formFields = Object.freeze({
    nomeTeste: "",
  });

  const [form, setForm] = useState({ formFields });

  const ref = useRef(null);

  useEffect(() => {
    axios.get(`testeQualidade/porId/${idRegra}`).then(({ data }) => {
      setForm({ ...formFields, ...data });
    });
  }, []);

  async function submit() {
    const data = await ref.current.getForm();
    delete data.id;
    axios.put(`testeQualidade/${idRegra}`, data).then(() => {
      navigate("/admin/regras");
    });
  }

  return (
    <div>
      <div className="mb-4">
        <h3 className="text-white">Alterar Regra</h3>
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
            <FormField nome="nomeTeste" label="Nome da Regra" required />
            {/* <FormField nome="unidade" label="Unidade de medida (KG / Litro)" required /> */}
          </FormGroup>
          <div className="pt-5 d-flex justify-content-center">
            <button className="btn btn-primary py-2 px-5" onClick={submit}>
              ALTERAR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlterarRegra;
