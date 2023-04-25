import CollapseComponent from "../../components/CollapseComponent";
import { Alert } from "react-bootstrap";

import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router";
import { formatarData } from "../../helpers";
import axios from "axios";
import get from "lodash/get";

const Relatorio = () => {
  const [pedido, setPedido] = useState({});
  const [show, setShow] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3000/entregas/${id}`).then(({ data }) => {
      setPedido(data);
    });
  }, [id]);

  async function submit() {
    await axios.post(`http://localhost:3000/alterar/forcarAceitacao/${id}/1`);
    axios.get(`http://localhost:3000/entregas/${id}`).then(({ data }) => {
      setPedido(data);
      setShow(true);
    });
  }

  function DetalhesQuantitativa(produto = []) {
    const entregas = [...produto];
    return entregas.map((e, i) => {
      return (
        <div key={i} className="mb-3">
          <h6 className="mb-4">PRODUTO {e.produtoId}</h6>
          <div className="small">
            <strong className="me-1">Especificação do Produto:</strong>
            <span>{e.especificacao}</span>
          </div>
          <div className="small">
            <strong className="me-1">Quantidade:</strong>
            <span>{e.quantidade}</span>
          </div>
          <div className="small">
            <strong className="me-1">Peso esperado:</strong>
            <span>{e.pesoPrevisto}kg</span>
          </div>
          <div className="small">
            <strong className="me-1">Peso:</strong>
            <span>{e.pesoReal}kg</span>
          </div>
          {/* <div className="small">
            <strong className="me-1">Unidade:</strong>
            <span>Recusado</span>
          </div> */}
          {/* <div className="small">
            <strong className="me-1">Valor Unitário:</strong>
            <span>Recusado</span>
          </div>
          <div className="small">
            <strong className="me-1">Valor Total:</strong>
            <span>Recusado</span>
          </div> */}
        </div>
      );
    });
  }

  // function DetalhesQualitativa(testes = []) {
  //   if (testes.length) {
  //     return (
  //       <div className="mb-4">
  //         <div>Regras de Recebimento:</div>
  //         <ol>
  //           {testes.map((t, i) => {
  //             return (
  //               <li key={i}>
  //                 Regra de recebimento {i + 1}:{" "}
  //                 <strong
  //                   className={t.aprovado ? "text-success" : "text-danger"}
  //                 >
  //                   {t.aprovado ? "Sim" : "Não"}
  //                 </strong>
  //               </li>
  //             );
  //           })}
  //         </ol>
  //       </div>
  //     );
  //   }
  // }

  return (
    <div>
      <div className="mb-4">
        <h3 className="text-white">Relatório</h3>
      </div>
      <div className="card mx-auto col-lg-6 p-5">
        {pedido && (
          <div>
            {show && (
              <Alert
                variant="success"
                onClose={() => setShow(false)}
                dismissible
              >
                <h3 className="mb-0">Recebimento do pedido aprovado</h3>
              </Alert>
            )}
            <div className="small">
              <strong className="me-1">Nº do Pedido:</strong>
              {pedido.numeroPedido}
            </div>
            <div className="small">
              <strong className="me-1">Status:</strong>
              <strong
                className={
                  get(pedido, "StatusEntrega.length")
                    ? "text-danger"
                    : "text-success"
                }
              >
                {get(pedido, "StatusEntrega.length") ? "Recusado" : "Aprovado"}
              </strong>
            </div>
            {/* <div className="mt-4 small">
              <strong className="me-1">Data Prevista:</strong>
              dd/mm/aaaa
            </div> */}
            <div className="small">
              <strong className="me-1">Data de Entrega:</strong>
              {formatarData(pedido.dataEntrega)}
            </div>

            <div className="my-4">
              <CollapseComponent nome="ETAPA 1: ENTRADA DE MATERIAIS">
                <div className="small">
                  <strong className="me-1">Nota Fiscal Nº:</strong>
                  {pedido.nfe}
                </div>
                <div className="small">
                  <strong className="me-1">Fornecedor:</strong>
                  {get(pedido, "Fornecedor.nomeFantasia")}
                </div>
                {/* <div className="small">
                  <strong className="me-1">Transportadora:</strong>
                </div> */}
                <div className="small">
                  <strong className="me-1">Tipo de frete:</strong>
                  {pedido.tipoFrete}
                </div>
                <div className="small">
                  <strong className="me-1">Condição de pagamento:</strong>
                  {pedido.formaPagamento}
                </div>
                {/* <div className="small">
                  <strong className="me-1">Informações complementares:</strong>
                </div>
                <div className="small">
                  <strong className="me-1">Foi apresentado laudo?</strong>
                  sim
                </div> */}
              </CollapseComponent>
            </div>
            {pedido.EntregaProduto && !!pedido.EntregaProduto.length && (
              <div>
                <div className="my-4">
                  <CollapseComponent nome="ETAPA 2: CONFERÊNCIA QUANTITATIVA">
                    {DetalhesQuantitativa(pedido.EntregaProduto)}
                  </CollapseComponent>
                </div>
                {/* <div className="my-4">
                  <CollapseComponent nome="ETAPA 3: CONFERÊNCIA QUALITATIVA">
                    {pedido.EntregaProduto &&
                      pedido.EntregaProduto.map((e, i) => {
                        return (
                          <div key={i}>
                            <h6 className="mb-4">PRODUTO {e.produtoId}</h6>
                            {DetalhesQualitativa(
                              get(e, "Produto.QualidadeProduto", [])
                            )}
                          </div>
                        );
                      })}
                  </CollapseComponent>
                </div> */}
              </div>
            )}
            {!!get(pedido, "StatusEntrega.length") && (
              <div className="d-flex justify-content-center">
                <button className="btn btn-danger" onClick={submit}>
                  FORÇAR APROVAÇÃO
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Relatorio;
