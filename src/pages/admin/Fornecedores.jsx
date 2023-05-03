import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import axios from "axios";

const Fornecedores = () => {
  const [fornecedores, setFornecedores] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/fornecedores").then(({ data }) => {
      setFornecedores(data);
    });
  }, []);

  return (
    <div>
      <div className="mb-4">
        <h3 className="text-white">Fornecedores</h3>
      </div>
      <div className="card mx-auto p-5">
        <div className="d-flex justify-content-end mt-5 mb-3">
          <Link to={"/admin/novo-fornecedor"}>
            <button className="btn btn-primary">+ Novo</button>
          </Link>
        </div>
        {fornecedores.length ? (
          <Table striped bordered>
            <thead>
              <tr>
                <th>Código</th>
                <th>Nome Fantasia</th>
                <th>Razão social</th>
                <th>CNPJ</th>
                <th>Endereço</th>
              </tr>
            </thead>
            <tbody>
              {fornecedores.map((p, i) => {
                return (
                  <tr key={i}>
                    <th>{p.id}</th>
                    <th>{p.nomeFantasia}</th>
                    <th>{p.razaoSocial}</th>
                    <th>{p.fornecedorCNPJ}</th>
                    <th>{p.endereco}</th>
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
