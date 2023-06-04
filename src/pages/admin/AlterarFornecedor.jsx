import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useParams } from "react-router-dom";
import { FormGroup, FormField } from "../../components";
import Modal from "react-modal";

import { useRef, useEffect, useState } from "react";

const AlterarFornecedor = () => {
  //const [fornecedores, setFornecedores] = useState([]);

  const idFornecedor = parseInt(useParams().id);
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
        <Modal isOpen={isOpen} onRequestClose={closeModal} className="caixa-modal mx-auto">
          <h2 className="text-center mb-5">Alteração realizada com sucesso!</h2>
          <button className="btn btn-primary py-2 px-5 col-3 mx-auto" onClick={()=> {closeModal(); window.location.href = '/admin/fornecedores';}}>OK</button> 
        </Modal>
      );
    }
  }

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
    window.axios.get(`fornecedores/porId/${idFornecedor}`).then(({ data }) => {
      setForm({ ...formFields, ...data });
    });
  }, []);

  const ref = useRef(null);

  async function submit() {
    const data = await ref.current.getForm();
    delete data.id;
    window.axios.put(`fornecedores/${idFornecedor}`, data).then(() => {
      openModal();
    })
      .catch((error) => {
        console.error("Erro ao enviar a requisição PUT:", error);
        // Lógica de tratamento de erro
      });
  }

  return (
    <div className="container-cards">
      <div className="mb-4">
        <h3 className="text-white">Alterar Fornecedor</h3>
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
            ALTERAR
          </button>
        </div>

        {MyModal(modalIsOpen)}
      </div>
    </div>
  );
};

export default AlterarFornecedor;
