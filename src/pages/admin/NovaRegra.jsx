import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormGroup, FormField } from "../../components";
import { Link } from "react-router-dom";
import Modal from "react-modal";

import { useRef, useState } from "react";

const NovaRegra = () => {
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
          <Link to={"/admin/regras"}>
            <button onClick={closeModal}>OK</button>
          </Link>
        </Modal>
      );
    }
  }

  const form = Object.freeze({
    nomeTeste: "",
  });

  const ref = useRef(null);

  async function submit() {
    const data = await ref.current.getForm();
    window.axios.post("testeQualidade/", data)
  }

  return (
    <div>
      <div className="mb-4">
        <h3 className="text-white">Cadastro de Regras</h3>
      </div>
      <div className="card p-5 col-lg-6 mx-auto">
        <div className="mb-4">
          <Link to={"/admin/regras"}>
            <FontAwesomeIcon icon="fa-solid fa-angle-left" className="me-2" />
            Regras
          </Link>
        </div>
        <div>
          <FormGroup ref={ref} formFields={form}>
            <FormField nome="nomeTeste" label="Nome da Regra" required />
            {/* <FormField nome="unidade" label="Unidade de medida (KG / Litro)" required /> */}
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

export default NovaRegra;
