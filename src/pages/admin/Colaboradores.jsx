import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import axios from "axios";

const Colaborador = () => {
  const [colaborador, setColaborador] = useState([]);
  const [nomeColaborador, setNomeColaborador] = useState("");
  const [TiposUsuarios, setTiposUsuarios] = useState("");

  useEffect(() => {
    axios
      .get(`tiposUsuarios`)
      .then(({ data }) => {
        setTiposUsuarios(data);
      })
      .catch((error) => {
        console.error(error);
      });

    if (nomeColaborador) {
      axios.get(`usuarios/${nomeColaborador}`).then(({ data }) => {
        setColaborador(data);
      });
    } else {
      axios.get("usuarios").then(({ data }) => {
        setColaborador(data);
      });
    }
  }, [nomeColaborador]);

  function tipoUsuario(usuario) {
    return TiposUsuarios.find((t) => t.id === usuario.tipoUsuarioId)
      .tipoUsuario;
  }

  return (
    <div>
      <div className="mb-4">
        <h3 className="text-white">Colaboradores</h3>
      </div>
      <div className="card mx-auto p-5">
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
                <th style={{ width: "4%" }} />
                <th style={{ width: "4%" }}>Código</th>
                <th>Nome</th>
                <th style={{ width: "10%" }}>CPF</th>
                <th style={{ width: "21%" }}>Data de Nascimento</th>
                <th style={{ width: "20%" }}>Função</th>
              </tr>
            </thead>
            <tbody>
              {colaborador.map((p, i) => {
                return (
                  <tr key={i}>
                    <th>
                      <Link to={`/admin/colaboradores/${p.id}`}>
                        <FontAwesomeIcon icon={faPencil} />
                      </Link>
                    </th>
                    <th>{p.id}</th>
                    <th>{p.nome}</th>
                    <th>{p.cpf}</th>
                    {/*   <th>{p.dataNascimento}</th> */}
                    <th>
                      {new Date(p.dataNascimento).toLocaleDateString("pt-BR", {
                        day: "numeric",
                        month: "numeric",
                        year: "numeric",
                      })}
                    </th>
                    <th>{tipoUsuario(p)}</th>
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
      </div>
    </div>
  );
};

export default Colaborador;
