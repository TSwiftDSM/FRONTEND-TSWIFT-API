import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FormField, FormGroup } from "../../components";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import moment from "moment";

const AlterarColaborador = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const formFields = Object.freeze({
    nome: "",
    cpf: "",
    dataNascimento: "",
    tipoUsuarioId: "",
  });

  const [form, setForm] = useState(formFields);

  const [tiposUsuarios, setTiposUsuarios] = useState([]);

  const ref = useRef(null);

  useEffect(() => {
    axios.get("tiposUsuarios/").then(
      ({ data }) => {
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
      },
      axios.get(`usuarios/id/${id}`).then(({ data }) => {
        setForm({
          ...data,
          dataNascimento: moment(data.dataNascimento).format("YYYY-MM-DD"),
        });
      })
    );
  }, []);

  async function handleSubmit() {
    const data = await ref.current.getForm();
    delete data.id;
    delete data.matricula;
    delete data.login;
    delete data.senha;
    axios.put(`usuarios/${id}`, data).then(() => {
      navigate("/admin/colaboradores");
    });
  }

  return (
    <div>
      <div className="mb-4">
        <h3 className="text-white">Alterar Colaborador</h3>
      </div>
      <div className="card p-5 col-lg-6 mx-auto">
        <div className="mb-4">
          <Link to={"/admin/colaboradores"}>
            <FontAwesomeIcon icon={["fas", "angle-left"]} className="me-2" />
            Colaboradores
          </Link>
        </div>
        <div>
          <FormGroup formFields={form} ref={ref}>
            <FormField nome="nome" label="Nome" required />
            <FormField nome="cpf" label="CPF" required />
            <FormField
              nome="dataNascimento"
              label="Data de nascimento"
              required
              tipo="date"
            />
            <FormField
              nome="tipoUsuarioId"
              label="Tipo de usuário"
              tipo="select"
              options={tiposUsuarios}
              required
            />
          </FormGroup>
        </div>
        <div className="mt-5 d-flex justify-content-center">
         
          <button className="btn btn-primary px-5" onClick={handleSubmit}>
            ALTERAR
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlterarColaborador;
