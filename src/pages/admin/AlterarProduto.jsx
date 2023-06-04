import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useParams } from "react-router-dom";
import { FormGroup, FormField } from "../../components";
import { useRef, useEffect, useState } from "react";
import { unidadeDeMedida } from "../../constants";
import Modal from "react-modal";

const NovoProduto = () => {
  const idProduto = parseInt(useParams().id);

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
            <button className="btn btn-primary py-2 px-5 col-3 mx-auto" onClick={()=> {closeModal(); window.location.href = '/admin/produtos';}}>OK</button>
        </Modal>
      );
    }
  }

  const formFields = Object.freeze({
    nomeProduto: "",
    unidade: "",
  });

  const [form, setForm] = useState({ formFields });

  const ref = useRef(null);

  useEffect(() => {
    window.axios.get(`produto/${idProduto}`).then(({ data }) => {
      setForm({ ...formFields, ...data });
    });
  }, []);

  async function submit() {
    const data = await ref.current.getForm();
    delete data.id;
    window.axios.put(`produto/${idProduto}`, data).then(() => {
      openModal();
    })
      .catch((error) => {
        console.error("Erro ao enviar a requisição PUT:", error);
        // Lógica de tratamento de erro
      });
  }

  return (
    <div>
      <div className="mb-4">
        <h3 className="text-white">Alterar Produto</h3>
      </div>
      <div className="card p-5 col-lg-6 mx-auto">
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
              value={form.unidade}
              required
            />
          </FormGroup>
          <div className="pt-5 d-flex justify-content-center">
            <button className="btn btn-primary py-2 px-5" onClick={() => { submit() }}>
              ALTERAR
            </button>
          </div>
          {MyModal(modalIsOpen)}
        </div>
      </div>
    </div>
  );
};

export default NovoProduto;
