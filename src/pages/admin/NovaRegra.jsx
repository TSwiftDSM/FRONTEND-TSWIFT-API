import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormGroup, FormField, Colapsador } from "../../components";
import { Table, Form } from "react-bootstrap";

import { Link } from "react-router-dom";
import Modal from "react-modal";

import { useRef, useState, useEffect } from "react";

const NovaRegra = () => {

  const [produtos, setProdutos] = useState([]);
  const [formProdutos, setformProdutos] = useState({});
  const [form, setForm] = useState({
    nomeTeste: "",
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);



  const closeModal = () => {
    setModalIsOpen(false);
  };

  function MyModal(isOpen) {
    if (isOpen) {
      return (
        <Modal isOpen={isOpen} onRequestClose={closeModal} className="caixa-modal mx-auto">
          <h2 className="text-center mb-5">Cadastro realizado com sucesso!</h2>
          <button
          className="btn btn-primary py-2 px-5 col-3 mx-auto"
          onClick={() => {
            closeModal();
            window.location.href = "/admin/regras";
          }}
        >
          OK
        </button>
        </Modal>
      );
    }
  }

  useEffect(() => {    
    // pegar produtos do backend
    window.axios.get("produto").then(({ data }) => {
      setProdutos(data)
      let obj = {};
      data.map((r) => (obj[r.id] = { checked: false, required: false }));
      setformProdutos(obj)
    });
  }, []);

  const ref = useRef(null);

  async function atualizar(e) {
    const obj = { ...formProdutos };
    obj[e.target.name].checked = e.target.checked;
    setformProdutos(obj);
    setForm(ref.current.value);
  }

  function obrigatorio(id, v) {
    const obj = { ...formProdutos };
    obj[id].required = v;
    setformProdutos(obj);
    setForm(ref.current.value);
  }

  function tabelaProdutos() {
    if (Object.keys(formProdutos).length)
      return (
        <Colapsador nome="Produto">
          <Table striped bordered>
            <tbody>
              {produtos.map((p) => (
                <tr key={p.id}>
                  <th>{p.nomeProduto}</th>
                  <th style={{ width: "10%" }}>
                    <div className="d-flex align-items-center justify-content-center">
                      <Form.Check
                        name={p.id}
                        checked={formProdutos[p.id].checked}
                        onChange={atualizar}
                      />
                    </div>
                  </th>
                  <th style={{ width: "10%" }}>
                    <div className="d-flex align-items-center justify-content-center">
                      <button
                        className={`btn ${
                          formProdutos[p.id].required
                            ? "text-info"
                            : "text-dark"
                        }`}
                        onClick={() =>
                          obrigatorio(p.id, !formProdutos[p.id].required)
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

  async function submit() {
    const data = await ref.current.getForm();
    const testeQualidade = await window.axios.post("testeQualidade/", data)
    await Promise.all(
      Object.keys(formProdutos).map(async (k) => {
        if (formProdutos[k].checked) {
          await window.axios.post("qualidadeProduto", {
            testeQualidadeId: testeQualidade.data.id,
            obrigatorio: formProdutos[k].required,
            produtoId: parseInt(k),
          });
        }
      })
    );
     
  
  }

  return (
    <div className="container-cards">
      <div className="mb-4">
        <h3 className="text-white">Cadastro de Regras</h3>
      </div>
      <div className="card-cadastro p-5 col-lg-6 mx-auto">
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
          {tabelaProdutos()}
          <div className="pt-5 d-flex justify-content-center">
            <button className="btn btn-primary py-2 px-5" onClick={() => { submit(); }}>
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
