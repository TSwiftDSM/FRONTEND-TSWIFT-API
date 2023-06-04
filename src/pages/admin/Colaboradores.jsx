import { faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Modal from "react-modal";

const Colaborador = () => {
  const [colaborador, setColaborador] = useState([]);
  const [nomeColaborador, setNomeColaborador] = useState("");
  const [TiposUsuarios, setTiposUsuarios] = useState("");
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
    window.axios
      .get(`tiposUsuarios`)
      .then(({ data }) => {
        setTiposUsuarios(data);
      })
      .catch((error) => {
        console.error(error);
      });

    if (nomeColaborador) {
      window.axios.get(`usuarios/${nomeColaborador}`).then(({ data }) => {
        setColaborador(data);
      });
    } else {
      window.axios.get("usuarios").then(({ data }) => {
        setColaborador(data);
      });
    }
  }, [nomeColaborador, atualizarTabela]);

  useEffect(() => {
    if (atualizarTabela) {
      if (nomeColaborador) {
        window.axios.get(`usuarios/${nomeColaborador}`).then(({ data }) => {
          setColaborador(data);
          setAtualizarTabela(false);
        });
      } else {
        window.axios.get("usuarios").then(({ data }) => {
          setColaborador(data);
          setAtualizarTabela(false);
        });
      }
    }
  }, [atualizarTabela, nomeColaborador]);

  function tipoUsuario(usuario) {
    return TiposUsuarios.find((t) => t.id === usuario.tipoUsuarioId)
      .tipoUsuario;
  }

  function handleDelete(id) {
    window.axios.delete(`usuarios/${id}`).then(() => {
      setAtualizarTabela(true);
    }).then(() => {
      openModal();
    });
  }

  return (
    <div className="container-cards">
      <div className="mb-4">
        <h3 className="text-white">Colaboradores</h3>
      </div>
      <div className="card-list p-5">
        <div className="d-flex justify-content-end mt-2 mb-3">
          <div className="col-lg-3 mx-3">
            <input
              type="text"
              className="form-control"
              placeholder="Nome do Colaborador"
              value={nomeColaborador}
              onChange={(e) => setNomeColaborador(e.target.value)}
            />
          </div>
          <Link to={"/admin/novo-colaborador"}>
            <button className="btn btn-primary">+ Novo</button>
          </Link>
        </div>
        {colaborador.length ? (
          <Table striped bordered>
            <thead>
              <tr>
                <th className="text-center" style={{ width: "4%" }}>
                  Matrícula
                </th>
                <th>Nome</th>
                <th style={{ width: "30%" }}>CPF</th>
                <th style={{ width: "25%" }}>Função</th>
                <th style={{ width: "4%" }} />
                <th style={{ width: "4%" }} />
              </tr>
            </thead>
            <tbody>
              {colaborador.map((p, i) => {
                return (
                  <tr key={i}>
                    <th>{p.matricula}</th>
                    <th>{p.nome}</th>
                    <th>{p.cpf}</th>
                    {/*   <th>{p.dataNascimento}</th> */}
                    <th>{tipoUsuario(p)}</th>
                    <th>
                      <Link to={`/admin/colaboradores/${p.id}`}>
                        <FontAwesomeIcon icon={faPencil} />
                      </Link>
                    </th>
                    <th>
                      <button className="btn-excluir"
                        onClick={() => {
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
            <h3>Não há colaboradores cadastrados</h3>
          </div>
        )}
        {MyModal(modalIsOpen)}
      </div>
    </div>
  );
};

export default Colaborador;
