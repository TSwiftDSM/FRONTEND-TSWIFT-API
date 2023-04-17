import { Button, Table } from "react-bootstrap";

const PedidosAdmin = () => {
  return (
    <div>
      <div className="mb-4">
        <h3 className="text-white">Pedidos</h3>
      </div>
      <div className="card col-lg-12 p-5">
        <div className="mt-3 d-none justify-content-end">
          <Button variant="primary" className="px-4 py-2">
            + Novo
          </Button>
        </div>
        <div className="my-3">
          <Table
            striped
            bordered
            style={{
              gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr",
            }}
          >
            <thead>
              <tr>
                <th style={{ width: "6%" }}>Código</th>
                <th style={{ width: "12%" }}>Fornecedor</th>
                <th style={{ width: "12%" }}>Transportadora</th>
                <th style={{ width: "18%" }}>Produto</th>
                <th style={{ width: "12%" }}>Cond. Pag</th>
                <th style={{ width: "10%" }}>Tipo de Frete</th>
                <th style={{ width: "12%" }}>Data prevista</th>
                <th style={{ width: "10%" }}>Status</th>
                <th style={{ width: "4%" }} />
              </tr>
            </thead>
            <tbody>
              {pedidos.map((p, i) => {
                return (
                  <tr key={i}>
                    <th>{p.cod}</th>
                    <th>{p.fornecedor}</th>
                    <th>{p.transportadora}</th>
                    <th>
                      {p.produtos.map((prod, i) => {
                        return (
                          <div key={i}>
                            <span>{prod.cod} - </span>
                            <span>{prod.nome} - </span>
                            <span>{prod.peso}</span>
                          </div>
                        );
                      })}
                    </th>
                    <th>{p.cond}</th>
                    <th>{p.tipo}</th>
                    <th>{p.data}</th>
                    <th>{p.status}</th>
                    <th></th>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

const pedidos = [
  {
    cod: 1234,
    fornecedor: "Fornecedor 1",
    transportadora: "Transportadora 1",
    produtos: [
      {
        cod: 1,
        nome: "Produto 1",
        peso: "200kg",
      },
      {
        cod: 2,
        nome: "Produto 2",
        peso: "100kg",
      },
      {
        cod: 3,
        nome: "Produto 3",
        peso: "300kg",
      },
    ],
    cond: "cond. pag.",
    tipo: "Tipo de Frete",
    data: "dd/mm/aaaa",
    status: "Pendente",
  },
  {
    cod: 6789,
    fornecedor: "Fornecedor 2",
    transportadora: "Transportadora 2",
    produtos: [
      {
        cod: 1,
        nome: "Produto 1",
        peso: "200kg",
      },
    ],
    cond: "cond. pag.",
    tipo: "Tipo de Frete",
    data: "dd/mm/aaaa",
    status: "Pendente",
  },
];

export default PedidosAdmin;
