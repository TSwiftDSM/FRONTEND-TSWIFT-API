import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormGroup, FormField } from "../../components";
import { Link } from "react-router-dom";
import { unidadeDeMedida } from "../../constants";
import { useRef, useState } from "react";
import Modal from "react-modal";

const NovoProduto = () => {

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
          <Link to={"/admin/produtos"}>
            <button onClick={closeModal}>OK</button>
          </Link>
        </Modal>
      );
    }
  }

  const form = Object.freeze({
    nomeProduto: "",
    unidade: "",
  });

  const ref = useRef(null);

  async function submit() {
    const data = await ref.current.getForm();
    window.axios.post("produto", data)
  }

  return (
    <div className="container-cards">
      <div className="mb-4">
        <h3 className="text-white">Novo Produto</h3>
      </div>
      <div className="card-cadastro p-5 col-lg-6 mx-auto">
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
              required
            />
          </FormGroup>
          <div className="pt-5 d-flex justify-content-center">
            <button className="btn btn-primary py-2 px-5" onClick={() => { openModal(); submit() }}>
              CADASTRAR
            </button>
          </div>

          {MyModal(modalIsOpen)}
        </div>
      </div>
    </div>
  );
};

export default NovoProduto;
