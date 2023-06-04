import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useParams } from "react-router-dom";
import { FormGroup, FormField } from "../../components";
import { useRef, useEffect, useState } from "react";
import Modal from "react-modal";

const AlterarRegra = () => {
  const idRegra = parseInt(useParams().id);

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
          <Link to={"/admin/regras"}>
            <button onClick={closeModal}>OK</button>
          </Link>
        </Modal>
      );
    }
  }

  const formFields = Object.freeze({
    nomeTeste: ""
  });

  const [form, setForm] = useState({ formFields });

  const ref = useRef(null);

  useEffect(() => {
    window.axios.get(`testeQualidade/porId/${idRegra}`).then(({ data }) => {
      setForm({ ...formFields, ...data });
    });
  }, []);

  async function submit() {
    const data = await ref.current.getForm();
    delete data.id;
    window.axios.put(`testeQualidade/${idRegra}`, data)
  }

  return (
    <div>
      <div className="mb-4">
        <h3 className="text-white">Alterar Regra</h3>
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
          </FormGroup>
          <div className="pt-5 d-flex justify-content-center">
            <button className="btn btn-primary py-2 px-5" onClick={() => { openModal(); submit() }}>
              ALTERAR
            </button>
          </div>
          {MyModal(modalIsOpen)}
        </div>
      </div>
    </div>
  );
};

export default AlterarRegra;
