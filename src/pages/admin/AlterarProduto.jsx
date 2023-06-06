import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormGroup, FormField } from "../../components";
import { useRef, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { unidadeDeMedida } from "../../constants";
import { Colapsador } from "../../components";
import { Table, Form } from "react-bootstrap";
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
        <Modal
          isOpen={isOpen}
          onRequestClose={closeModal}
          className="caixa-modal mx-auto"
        >
          <h2 className="text-center mb-5">Alteração realizada com sucesso!</h2>
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
  }
  async function fetchProducts() {
    window.axios.get(`produto/${idProduto}`).then(({ data }) => {
      setForm((v) => {
        return { ...v, ...data };
      });
    });
  }
  async function fetchQualidadeProduto() {
    return new Promise((resolve) => {
      window.axios.get(`qualidadeProduto/${idProduto}?m=p`).then(({ data }) => {
        let rel = {};
        data.forEach((i) => (rel[i.testeQualidadeId] = i.obrigatorio));
        resolve(rel);
      });
    });
  }
  async function fetchTesteQualidade(relation) {
    window.axios.get("testeQualidade/").then(({ data }) => {
      setRegras(data);
      let obj = {};
      data.map((r) => {
        obj[r.id] = {
          checked: Object.keys(relation).includes(String(r.id)),
          required: relation[r.id],
        };
      });
      setFormRegras(obj);
    });
  }
  useEffect(() => {
    fetchProducts();
    fetchQualidadeProduto().then((rel) => fetchTesteQualidade(rel));
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
                          formRegras[r.id].required ? "text-info" : "text-dark"
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
    delete data.id;
    window.axios
      .put(`produto/${idProduto}`, data)
      .then(() => {
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
        <h3 className="text-white">Alterar Produto</h3>
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
              value={form.unidade}
              required
            />
          </FormGroup>
          {tabelaRegras()}
          <div className="pt-5 d-flex justify-content-center">
            <button
              className="btn btn-primary py-2 px-5"
              onClick={() => {
                submit();
              }}
            >
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
