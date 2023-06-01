import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";

const Fornecedores = () => {
  const [fornecedores, setFornecedores] = useState([]);
  const [nomeFornecedor, setNomeFornecedor] = useState("");

  useEffect(() => {
    if (nomeFornecedor) {
      axios.get(`fornecedores/porNome/${nomeFornecedor}`).then(({ data }) => {
        setFornecedores(data);
      });
    } else {
      axios.get("fornecedores").then(({ data }) => {
        setFornecedores(data);
      });
    }
  }, [nomeFornecedor]);

  return (
    <div className="container-cards">
      <div className="mb-4">
        <h3 className="text-white">Fornecedores</h3>
      </div>
      <div className="card-list p-5">
        <div className="d-flex justify-content-end mt-2 mb-3">
          <div className="col-lg-3 mx-3">
            <input
              type="text"
              className="form-control"
              placeholder="Nome do Fornecedor"
              value={nomeFornecedor}
              onChange={(e) => setNomeFornecedor(e.target.value)}
            />
          </div>
          <Link to={"/admin/novo-fornecedor"}>
            <button className="btn btn-primary">+ Novo</button>
          </Link>
        </div>
        {fornecedores.length ? (
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
              {fornecedores.map((p, i) => {
                return (
                  <tr key={i}>
                    <th>{p.nomeFantasia}</th>
                    <th>{p.razaoSocial}</th>
                    <th>{p.fornecedorCNPJ}</th>
                    <th>{p.endereco}</th>
                    <th>
                      <Link to={`/admin/fornecedores/${p.id}`}>
                          <FontAwesomeIcon icon={faPencil} />
                      </Link>
                    </th>
                    <th>
                      <Link to={``}>
                        <FontAwesomeIcon icon={faTrashCan} />
                      </Link>
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

export default Fornecedores;
