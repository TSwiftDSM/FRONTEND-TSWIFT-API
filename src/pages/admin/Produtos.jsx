import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "react-modal";
import { useEffect, useState } from "react";

const Produtos = () => {
  const [produtos, setProdutos] = useState([]);
  const [nomeProduto, setNomeProduto] = useState("");
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
        <Modal isOpen={isOpen} onRequestClose={closeModal}>
          <h2>Exclusão realizada Com Sucesso!</h2>
          <button onClick={closeModal}>OK</button>
        </Modal>
      );
    }
  }

  useEffect(() => {
    if (nomeProduto) {
      window.axios.get(`produto/porNome/${nomeProduto}`).then(({ data }) => {
        setProdutos(data);
      });
    } else {
      window.axios.get("produto").then(({ data }) => {
        setProdutos(data);
      });
    }
  }, [nomeProduto, atualizarTabela]);

  function handleDelete(idProduto) {
    window.axios.delete(`produto/${idProduto}`).then(() => {
      setAtualizarTabela(true);
    });
  }

  useEffect(() => {
    if (atualizarTabela) {
      if (nomeProduto) {
        window.axios.get(`produto/porNome/${nomeProduto}`).then(({ data }) => {
          setProdutos(data);
          setAtualizarTabela(false);
        });
      } else {
        window.axios.get("produto").then(({ data }) => {
          setProdutos(data);
          setAtualizarTabela(false);
        });
      }
    }
  }, [atualizarTabela, nomeProduto]);

  return (
    <div className="container-cards">
      <div className="mb-4">
        <h3 className="text-white">Produtos</h3>
      </div>
      <div className="card-list p-5">
        <div className="d-flex justify-content-end mt-2 mb-3">
          <div className="col-lg-3 mx-3">
            <input
              type="text"
              className="form-control"
              placeholder="Nome do Produto"
              value={nomeProduto}
              onChange={(e) => setNomeProduto(e.target.value)}
            />
          </div>
          <Link to={"/admin/novo-produto"}>
            <button className="btn btn-primary">+ Novo</button>
          </Link>
        </div>
        {produtos.length ? (
          <Table striped bordered>
            <thead>
              <tr>
                <th>Nome do Produto</th>
                <th style={{ width: "60%" }}>Unidade de medida</th>
                <th style={{ width: "4%" }} />
                <th style={{ width: "4%" }} />
              </tr>
            </thead>
            <tbody>
              {produtos.map((p, i) => {
                return (
                  <tr key={i}>
                    <th>{p.nomeProduto}</th>
                    <th>{p.unidade}</th>
                    <th>
                      <Link to={`/admin/produtos/${p.id}`}>
                        <FontAwesomeIcon icon={faPencil} />
                      </Link>
                    </th>
                    <th>
                      <button className="btn-excluir"
                        onClick={() => {
                          openModal();
                          handleDelete(p.id);
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
            <h3>Não há produtos cadastrados</h3>
          </div>
        )}
        {MyModal(modalIsOpen)}
      </div>
    </div>
  );
};

export default Produtos;
