import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useEffect, useState } from "react";
import axios from "axios";

const Produtos = () => {
  const [regras, setRegras] = useState([]);
  const [descricao, setDescricao] = useState("");

  useEffect(() => {
    if (descricao) {
      axios.get(`testeQualidade/porNome/${descricao}`).then(({ data }) => {
        setRegras(data);
      });
    } else {
      axios.get("testeQualidade/").then(({ data }) => {
        setRegras(data);
      });
    }
  }, [descricao]);

  return (
    <div>
      <div className="mb-4">
        <h3 className="text-white">Regras</h3>
      </div>
      <div className="card mx-auto p-5">
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
          <Link to={"/admin/novo-produto"}>
            <button className="btn btn-primary">+ Novo</button>
          </Link>
        </div>
        {regras.length ? (
          <Table striped bordered>
            <thead>
              <tr>
                <th style={{ width: "4%" }} />
                <th>Nome da Regra</th>
              </tr>
            </thead>
            <tbody>
              {regras.map((r, i) => {
                return (
                  <tr key={i}>
                    <th>
                      <Link to={`/admin/regras/${r.id}`}>
                        <FontAwesomeIcon icon={faPencil} />
                      </Link>
                    </th>
                    <th>{r.nomeTeste}</th>
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
      </div>
    </div>
  );
};

export default Produtos;
