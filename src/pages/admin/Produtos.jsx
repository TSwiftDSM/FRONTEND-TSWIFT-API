import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import axios from "axios";

const Produtos = () => {
  const [produtos, setProdutos] = useState([]);
  const [nomeProduto, setNomeProduto] = useState("");

  useEffect(() => {
    if (nomeProduto) {
        axios.get(`http://localhost:3000/produto/porNome/${nomeProduto}`)
          .then(({ data }) => {
            setProdutos(data);
        });
    } else {
      axios.get("http://localhost:3000/produto")
        .then(({ data }) => {
          setProdutos(data);
      });
    }
  }, [nomeProduto]);

  return (
    <div>
      <div className="mb-4">
        <h3 className="text-white">Produtos</h3>
      </div>
      <div className="card mx-auto p-5">
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
                <th style={{ width: "20%" }}>Unidade de medida</th>
              </tr>
            </thead>
            <tbody>
              {produtos.map((p, i) => {
                return (
                  <tr key={i}>
                    <th>{p.nomeProduto}</th>
                    <th>{p.unidade}</th>
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
      </div>
    </div>
  );
};

export default Produtos;
