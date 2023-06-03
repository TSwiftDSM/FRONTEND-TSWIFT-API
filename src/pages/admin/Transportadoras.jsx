import { faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const Transportadoras = () => {
  const [transportadoras, setTransportadora] = useState([]);
  const [nomeTransportadora, setNomeTransportadora] = useState("");
  const [atualizarTabela, setAtualizarTabela] = useState(false);

  useEffect(() => {
    if (nomeTransportadora) {
      window.axios
        .get(`fornecedores/porNome/${nomeTransportadora}/transportadora`)
        .then(({ data }) => {
          setTransportadora(data);
        });
    } else {
      window.axios.get("fornecedores/transportadora").then(({ data }) => {
        setTransportadora(data);
      });
    }
  }, [nomeTransportadora, atualizarTabela]);

  function handleDelete(idFornecedor) {
    window.axios.delete(`fornecedores/${idFornecedor}`).then(() => {
      setAtualizarTabela(true);
    });
  }

  useEffect(() => {
    if (atualizarTabela) {
      if (nomeTransportadora) {
        window.axios
          .get(`fornecedores/porNome/${nomeTransportadora}/transportadora`)
          .then(({ data }) => {
            setTransportadora(data);
            setAtualizarTabela(false);
          });
      } else {
        window.axios.get("fornecedores/transportadora").then(({ data }) => {
          setTransportadora(data);
          setAtualizarTabela(false);
        });
      }
    }
  }, [atualizarTabela, nomeTransportadora]);

  return (
    <div className="container-cards">
      <div className="mb-4">
        <h3 className="text-white">Transportadoras</h3>
      </div>
      <div className="card-list p-5">
        <div className="d-flex justify-content-end mt-2 mb-3">
          <div className="col-lg-3 mx-3">
            <input
              type="text"
              className="form-control"
              placeholder="Nome da Transportadora"
              value={nomeTransportadora}
              onChange={(e) => setNomeTransportadora(e.target.value)}
            />
          </div>
          <Link to={"/admin/transportadora/novo"}>
            <button className="btn btn-primary">+ Novo</button>
          </Link>
        </div>
        {transportadoras.length ? (
          <Table striped bordered>
            <thead>
              <tr>
                <th>Nome Fantasia</th>
                <th>Razão social</th>
                <th>CNPJ</th>
                <th>Endereço</th>
                <th style={{ width: "4%" }} />
                <th style={{ width: "4%" }} />
              </tr>
            </thead>
            <tbody>
              {transportadoras.map((p, i) => {
                return (
                  <tr key={i}>
                    <th>{p.nomeFantasia}</th>
                    <th>{p.razaoSocial}</th>
                    <th>{p.fornecedorCNPJ}</th>
                    <th>{p.endereco}</th>
                    <th>
                      <Link to={`/admin/transportadora/${p.id}`}>
                        <FontAwesomeIcon icon={faPencil} />
                      </Link>
                    </th>
                    <th>
                      <button className="btn-excluir" onClick={() => handleDelete(p.id)}>
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
            <h3>Não há fornecedores cadastrados</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Transportadoras;
