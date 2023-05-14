import { useEffect, useRef, useState } from "react";
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
    tipoUsuario: "",
  });

  const [tiposUsuarios, setTiposUsuarios] = useState([]);

  const ref = useRef(null);

  useEffect(() => {
    axios.get("http://localhost:3000/tiposUsuarios/").then(({ data }) => {
      /* console.log("meu deus" + JSON.stringify(data)); */
      if (data && data.length) {
        setTiposUsuarios(
          data.map((tipo) => {
            return {
              id: tipo.id,
              nome: tipo.tipoUsuario,
            };
          })
        );
      }
    });
  }, []);

  async function handleSubmit() {
    const data = await ref.current.getForm();
    const { diaNascimento, mesNascimento, anoNascimento } = data;
    const dataNascimento = `${anoNascimento}-${mesNascimento}-${diaNascimento}`; /* junta os campos de data de nascimento para enviar para o backend */
    const novoColaborador = {
      ...data,
      dataNascimento,
    };
    axios.post("http://localhost:3000/usuarios/", novoColaborador).then(() => {
      navigate("/admin/colaboradores");
    });
  }

  return (
    <div>
      <div className="mb-4">
        <h3 className="text-white">Novo Colaborador</h3>
      </div>
      <div className="card p-5 col-lg-6 mx-auto">
        <div className="mb-4">
          <Link to={"/admin/colaborador"}>
            <FontAwesomeIcon icon={["fas", "angle-left"]} className="me-2" />
            Colaboradores
          </Link>
        </div>
        <div>
          <FormGroup formFields={form} ref={ref}>
            <FormField nome="nome" label="Nome" required />
            <FormField nome="cpf" label="CPF" required />
            <div className="d-flex">
              <div className="row">
                <div className="col">
                  <FormField
                    nome="diaNascimento"
                    label="Dia"
                    type="number"
                    required
                  />
                </div>
                <div className="col">
                  <FormField
                    nome="mesNascimento"
                    label="Mês"
                    type="number"
                    required
                  />
                </div>
                <div className="col">
                  <FormField
                    nome="anoNascimento"
                    label="Ano"
                    type="number"
                    required
                  />
                </div>
              </div>
            </div>

            <FormField
              nome="tipoUsuario"
              label="Tipo de usuário"
              tipo="select"
              options={tiposUsuarios}
              required
            />
          </FormGroup>
        </div>
        <div className="mt-5 d-flex justify-content-center">
          <button className="btn btn-primary px-5" onClick={handleSubmit}>
            CONFIRMAR
          </button>
        </div>
      </div>
    </div>
  );
};

export default NovoColaborador;
