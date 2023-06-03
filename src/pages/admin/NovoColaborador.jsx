import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormField, FormGroup } from "../../components";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";

const NovoColaborador = () => {
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
          <h2>Cadastro realizado Com Sucesso!</h2>
          <Link to={"/admin/colaboradores"}>
            <button onClick={closeModal}>OK</button>
          </Link>
        </Modal>
      );
    }
  }

  const form = Object.freeze({
    nome: "",
    cpf: "",
    dataNascimento: "",
    tipoUsuarioId: "",
    permissaoId: [],
  });

  const [tiposUsuarios, setTiposUsuarios] = useState([]);

  const ref = useRef(null);

  useEffect(() => {
    window.axios.get("tiposUsuarios/").then(({ data }) => {
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
    const novoColaborador = {
      ...data,
    };
    window.axios.post("usuarios/", novoColaborador);
  }

  return (
    <div className="container-cards">
      <div className="mb-4">
        <h3 className="text-white">Novo Colaborador</h3>
      </div>
      <div className="card-cadastro p-5 col-lg-6 mx-auto">
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
              openModal();
              handleSubmit();
            }}
          >
            CONFIRMAR
          </button>
          {MyModal(modalIsOpen)}
        </div>
      </div>
    </div>
  );
};

export default NovoColaborador;
