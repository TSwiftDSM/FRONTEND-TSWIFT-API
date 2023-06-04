import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Colapsador } from "../../components";
import { formatarData } from "../../helpers";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import get from "lodash/get";

const Relatorio = () => {
  const [pedido, setPedido] = useState({});
  const [show, setShow] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    window.axios.get(`entregas/${id}`).then(({ data }) => {
      setPedido(data);
    });
  }, [id]);

  async function submit() {
    await window.axios.post(`alterar/forcarAceitacao/${id}/1`);
    window.axios.get(`entregas/${id}`).then(({ data }) => {
      setPedido(data);
      setShow(true);
    });
  }
  function statusDoPedido() {
    switch (pedido.etapaEntrega) {
      case "":
        return "Aguardando entrega";
      case "QUALITATIVA":
        return get(pedido, "StatusEntrega.length") ? "Recusado" : "Recebido";
      default:
        return "Em recebimento";
    }
  }
  function statusClass() {
    switch (pedido.etapaEntrega) {
      case "QUALITATIVA":
        return get(pedido, "StatusEntrega.length")
          ? "text-danger"
          : "text-success";
      case "":
        return "text-secondary";
      default:
        return "text-warning";
    }
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
    <div className="container-cards">
      <div className="mb-4">
        <h3 className="text-white">Relatório</h3>
      </div>
      <div className="card-cadastro p-5 col-lg-6 mx-auto">
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
            <div className="mb-4">
              <Link to={"/admin/pedidos"}>
                <FontAwesomeIcon
                  icon="fa-solid fa-angle-left"
                  className="me-2"
                />
                Voltar
              </Link>
            </div>
            <div className="small">
              <strong className="me-1">Nº do Pedido:</strong>
              {pedido.numeroPedido}
            </div>
            <div className="small">
              <strong className="me-1">Status:</strong>
              <strong className={statusClass()}>{statusDoPedido()}</strong>
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
              <Colapsador nome="ETAPA 1: ENTRADA DE MATERIAIS">
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
              </Colapsador>
            </div>
            {pedido.EntregaProduto && !!pedido.EntregaProduto.length && (
              <div>
                <div className="my-4">
                  <Colapsador nome="ETAPA 2: CONFERÊNCIA QUANTITATIVA">
                    {DetalhesQuantitativa(pedido.EntregaProduto)}
                  </Colapsador>
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
