import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Modal from "react-modal";

const Produtos = () => {
  const [regras, setRegras] = useState([]);
  const [descricao, setDescricao] = useState("");
  const [atualizarTabela, setAtualizarTabela] = useState(false);
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
          <h2 className="text-center mb-5">Exclusão realizada com Sucesso!</h2>
          <button className="btn btn-primary py-2 px-5 col-3 mx-auto" onClick={closeModal}>OK</button>
        </Modal>
      );
    }
  }

  useEffect(() => {
    if (descricao) {
      window.axios
        .get(`testeQualidade/porNome/${descricao}`)
        .then(({ data }) => {
          setRegras(data);
        });
    } else {
      window.axios.get("testeQualidade/").then(({ data }) => {
        setRegras(data);
      });
    }
  }, [descricao, atualizarTabela]);

  function handleDelete(id) {
    window.axios.delete(`testeQualidade/${id}`).then(() => {
      setAtualizarTabela(true);
    });
  }

  useEffect(() => {
    if (atualizarTabela) {
      if (descricao) {
        window.axios
          .get(`testeQualidade/porNome/${descricao}`)
          .then(({ data }) => {
            setRegras(data);
            setAtualizarTabela(false);
          });
      } else {
        window.axios.get("testeQualidade/").then(({ data }) => {
          setRegras(data);
          setAtualizarTabela(false);
        });
      }
    }
  }, [atualizarTabela, descricao]);

  return (
    <div className="container-cards">
      <div className="mb-4">
        <h3 className="text-white">Regras</h3>
      </div>
      <div className="card-list p-5">
        <div className="d-flex justify-content-end mt-2 mb-3">
          <div className="col-lg-3 mx-3">
            <input
              type="text"
              className="form-control"
              placeholder="Descrição Regra"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
          </div>
          <div>
            <Link to={"/admin/regra-quantitativa"}>
              <button className="btn btn-primary">Regra Quantitativa</button>
            </Link>
          </div>
          <div>
            <Link to={"/admin/nova-regra"}>
              <button className="btn btn-primary">+ Novo</button>
            </Link>
          </div>

        </div>
        {regras.length ? (
          <Table striped bordered>
            <thead>
              <tr>
                <th>Nome da Regra</th>
                <th style={{ width: "4%" }} />
                <th style={{ width: "4%" }} />
              </tr>
            </thead>
            <tbody>
              {regras.map((r, i) => {
                return (
                  <tr key={i}>
                    <th>{r.nomeTeste}</th>
                    <th>
                      <Link to={`/admin/regra/${r.id}`}>
                        <FontAwesomeIcon icon={faPencil} />
                      </Link>
                    </th>
                    <th>
                      <button
                        className="btn-excluir"
                        onClick={() => {
                          openModal();
                          handleDelete(r.id);
                        }}
                      >
                        <FontAwesomeIcon icon={faTrashCan} />
                      </button>
                    </th>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        ) : (
          <div className="text-center my-5">
            <h3>Não há regras cadastradas</h3>
          </div>
        )}
        {MyModal(modalIsOpen)}
      </div>
    </div>
  );
};

export default Produtos;
