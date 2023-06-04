import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormGroup, FormField } from "../../components";
import { useEffect, useRef, useState } from "react";
import { unidadeDeMedida } from "../../constants";
import { Colapsador } from "../../components";
import { Table, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
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
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        className="caixa-modal mx-auto"
      >
        <h2 className="text-center mb-5">Cadastro realizado com sucesso!</h2>
        <button
          className="btn btn-primary py-2 px-5 col-3 mx-auto"
          onClick={() => {
            closeModal();
            window.location.href = "/admin/produtos";
          }}
        >
          OK
        </button>
      </Modal>
    );
  }

  useEffect(() => {
    window.axios.get("testeQualidade/").then(({ data }) => {
      setRegras(data);
      let obj = {};
      data.map((r) => (obj[r.id] = { checked: false, required: false }));
      console.log(obj);
      setFormRegras(obj);
    });
  }, []);

  const [form, setForm] = useState({
    nomeProduto: "",
    unidade: "",
  });
  const [formRegras, setFormRegras] = useState({});

  const [regras, setRegras] = useState([]);

  const ref = useRef(null);

  function tabelaRegras() {
    if (Object.keys(formRegras).length)
      return (
        <Colapsador nome="Regras de recebimento">
          <Table striped bordered>
            <tbody>
              {regras.map((r) => (
                <tr key={r.id}>
                  <th>{r.nomeTeste}</th>
                  <th style={{ width: "10%" }}>
                    <div className="d-flex align-items-center justify-content-center">
                      <Form.Check
                        name={r.id}
                        checked={formRegras[r.id].checked}
                        onChange={atualizar}
                      />
                    </div>
                  </th>
                  <th style={{ width: "10%" }}>
                    <div className="d-flex align-items-center justify-content-center">
                      <button
                        className={`btn ${
                          formRegras[r.id].required
                            ? "text-danger"
                            : "text-dark"
                        }`}
                        onClick={() =>
                          obrigatorio(r.id, !formRegras[r.id].required)
                        }
                      >
                        <FontAwesomeIcon icon="fa-solid fa-triangle-exclamation text-dark" />
                      </button>
                    </div>
                  </th>
                </tr>
              ))}
            </tbody>
          </Table>
        </Colapsador>
      );
  }

  useEffect(() => console.log(formRegras), [formRegras]);

  function obrigatorio(id, v) {
    const obj = { ...formRegras };
    obj[id].required = v;
    setFormRegras(obj);
    setForm(ref.current.value);
  }

  async function atualizar(e) {
    const obj = { ...formRegras };
    obj[e.target.name].checked = e.target.checked;
    setFormRegras(obj);
    setForm(ref.current.value);
  }

  async function submit() {
    const data = await ref.current.getForm();
    const produto = await window.axios.post("produto", data);
    console.log(produto);

    await Promise.all(
      Object.keys(formRegras).forEach((k) => {
        if (formRegras[k].checked) {
          window.axios.post("qualidadeProduto", {
            testeQualidadeId: parseInt(k),
            obrigatorio: formRegras[k].required,
            produtoId: produto.data.id,
          });
        }
      })
    );

    openModal();
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
          {tabelaRegras()}
          <div className="pt-5 d-flex justify-content-center">
            <button className="btn btn-primary py-2 px-5" onClick={submit}>
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
