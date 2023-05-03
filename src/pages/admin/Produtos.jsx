import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import axios from "axios";

const Produtos = () => {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/produto").then(({ data }) => {
      setProdutos(data);
    });
  }, []);

  return (
    <div>
      <div className="mb-4">
        <h3 className="text-white">Produtos</h3>
      </div>
      <div className="card mx-auto p-5">
        <div className="d-flex justify-content-end mt-5 mb-3">
          <Link to={"/admin/novo-produto"}>
            <button className="btn btn-primary">+ Novo</button>
          </Link>
        </div>
        {produtos.length ? (
          <Table striped bordered>
            <thead>
              <tr>
                <th style={{ width: "20%" }}>Código</th>
                <th>Descrição</th>
                <th style={{ width: "20%" }}>Unidade de medida</th>
              </tr>
            </thead>
            <tbody>
              {produtos.map((p, i) => {
                return (
                  <tr key={i}>
                    <th>{p.id}</th>
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
