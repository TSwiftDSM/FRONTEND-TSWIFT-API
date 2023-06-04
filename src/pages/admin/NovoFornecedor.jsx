import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { FormGroup, FormField } from "../../components";
import { useRef, useState } from "react";
import Modal from "react-modal";

const NovoFornecedor = () => {
  //const [fornecedores, setFornecedores] = useState([]);


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
          <h2>Exclusão realizada Com Sucesso!</h2>
          <Link to={"/admin/fornecedores"}>
            <button onClick={closeModal}>OK</button>
          </Link>
        </Modal>
      );
    }
  }

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
    window.axios.post("fornecedores", data).then(() => {
      openModal();
    })
    .catch((error) => {
      console.error("Erro ao enviar a requisição POST:", error);
      // Lógica de tratamento de erro
    });
  }

  return (
    <div className="container-cards">
      <div className="mb-4">
        <h3 className="text-white">Novo Fornecedor</h3>
      </div>
      <div className="card-cadastro p-5 col-lg-6 mx-auto">
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
          <button className="btn btn-primary px-5" onClick={() => { submit() }}>
            CONFIRMAR
          </button>
        </div>
        {MyModal(modalIsOpen)}
      </div>
    </div>
  );
};

export default NovoFornecedor;
