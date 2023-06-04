import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormField, FormGroup } from "../../components";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Modal from "react-modal";
import moment from "moment";

const AlterarColaborador = () => {
  const { id } = useParams();

  const formFields = Object.freeze({
    nome: "",
    cpf: "",
    dataNascimento: "",
    tipoUsuarioId: "",
  });

  const [form, setForm] = useState(formFields);

  const [tiposUsuarios, setTiposUsuarios] = useState([]);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  function MyModal(isOpen) {
    if (isOpen) {
      return (
        <Modal isOpen={isOpen} onRequestClose={closeModal}>
          <h2>Alteração realizada Com Sucesso!</h2>
          <Link to={"/admin/colaboradores"}>
            <button onClick={closeModal}>OK</button>
          </Link>
        </Modal>
      );
    }
  }

  const ref = useRef(null);

  useEffect(() => {
    window.axios.get("tiposUsuarios/").then(
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
      window.axios.get(`usuarios/id/${id}`).then(({ data }) => {
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
    window.axios.put(`usuarios/${id}`, data).then(() => {
      openModal();
    })
      .catch((error) => {
        console.error("Erro ao enviar a requisição PUT:", error);
        // Lógica de tratamento de erro
      });;
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
          <button
            className="btn btn-primary px-5"
            onClick={() => {
            
              handleSubmit();
            }}
          >
            ALTERAR
          </button>
        </div>
        {MyModal(modalIsOpen)}
      </div>
    </div>
  );
};

export default AlterarColaborador;
