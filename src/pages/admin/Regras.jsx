import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const Produtos = () => {
  const [regras, setRegras] = useState([]);
  const [descricao, setDescricao] = useState("");

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
  }, [descricao]);

  // function handleDelete(idProduto) {
  //   window.axios.delete(`produto/${idProduto}`).then(() => {
  //     setAtualizarTabela(true);
  //   });
  // }

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
          <Link to={"/admin/novo-produto"}>
            <button className="btn btn-primary">+ Novo</button>
          </Link>
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
                      <Link to={`/admin/regras/${r.id}`}>
                        <FontAwesomeIcon icon={faPencil} />
                      </Link>
                    </th>
                    <th>
                      {/* <button
                        className="btn-excluir"
                        onClick={() => handleDelete(p.id)}
                      >
                        <FontAwesomeIcon icon={faTrashCan} />
                      </button> */}
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
      </div>
    </div>
  );
};

export default Produtos;
