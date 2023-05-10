import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormField, FormGroup } from "../../components";

const NovoColaborador = () => {
  const navigate = useNavigate();

  const form = Object.freeze({
    nome: "",
    cpf: "",
    dataNascimento: "",
    tipoUsuarioId: "" /* preciso do endpoint */,
  });

  const ref = useRef(null);

  async function submit() {
    const data = await ref.current.getForm();
    axios.post("http://localhost:3000/usuarios/", data).then(() => { /* rota do brackend */
      navigate("/admin/colaboradores");/* rota frontend */
    });
  }
  return (
    <div>
      <div className="mb-4">
        <h3 className="text-white">Novo Colaborador</h3>
      </div>
      <div className="card p-5 col-lg-6 mx-auto">
        <div className="mb-4">
          <Link to={"/admin/colaboradores"}>
            <FontAwesomeIcon icon="fa-solid fa-angle-left" className="me-2" />
            Colaboradores
          </Link>
        </div>
        <div>
          <FormGroup formFields={form} ref={ref}>
            <FormField nome="nome" label="Nome" />
            <FormField nome="cpf" label="CPF" />
            <FormField
              nome="dataNascimento"
              label="Data de Nascimento"
              type="date"
            />
            <FormField nome="tipoUsuarioId" label="Função" />
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

export default NovoColaborador;
