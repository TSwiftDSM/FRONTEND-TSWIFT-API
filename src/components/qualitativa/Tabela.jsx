import { Table } from "react-bootstrap";

import Fileira from "./Fileira";

const Tabela = (props) => {
  const { regras, atualizarRegras } = props;

  function atualizarRegra(regra) {
    let atualizado = regras.map((r) => {
      if (r.id === regra.id) {
        return { ...r, status: regra.status };
      }
      return r;
    });

    atualizarRegras(atualizado);
  }

  return (
    <Table striped bordered>
      <thead>
        <tr>
          <th>Regra de Recebimento</th>
          <th className="text-center">SIM</th>
          <th className="text-center">NÃO</th>
        </tr>
      </thead>
      <tbody>
        {regras.map((regra, i) => {
          return <Fileira key={i} regra={regra} atualizar={atualizarRegra} />;
        })}
      </tbody>
    </Table>
  );
};

export default Tabela;
