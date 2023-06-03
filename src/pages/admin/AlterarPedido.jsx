import { formasDePagamento, tiposDeFrete } from "../../constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormGroup, FormField } from "../../components";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const NovoPedido = () => {
  // const idPedido = parseInt(useParams().id);
  const navigate = useNavigate();

  const form = Object.freeze({
    fornecedorId: null,
    transportadoraId: null,
    tipoFrete: "",
    formaPagamento: "",
  });

  const formProduto = Object.freeze({
    produtoId: null,
    EntregaId: null,
    quantidade: "",

    pesoPrevisto: 0,
    pesoReal: 0,
    especificacao: "Alguma especificação",
  });

  const [nodes, setNodes] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [fornecedores, setFornecedores] = useState([]);
  const [transportadoras, setTransportadoras] = useState([]);

  const ref = useRef(null);
  const nodesRef = useRef([]);

  useEffect(() => {
    // pegar fornecedores do backend
    window.axios.get("fornecedores").then(({ data }) => {
      if (data && data.length) {
        setFornecedores(
          data.map((f) => {
            return {
              id: f.id,
              nome: f.nomeFantasia,
            };
          })
        );
      }
    });
    // pegar transportadoras do backend
    window.axios.get("fornecedores/transportadora").then(({ data }) => {
      if (data && data.length) {
        setTransportadoras(
          data.map((f) => {
            return {
              id: f.id,
              nome: f.nomeFantasia,
            };
          })
        );
      }
    });
    // pegar produtos do backend
    window.axios.get("produto").then(({ data }) => {
      if (data && data.length) {
        setProdutos(
          data.map((p) => {
            return {
              id: p.id,
              nome: p.nomeProduto,
            };
          })
        );
      }
    });
  }, []);

  useEffect(() => {
    // inicializar a página com uma caixa de produto
    if (produtos.length) {
      setNodes([
        <FormGroup
          key={nodes.length}
          formFields={formProduto}
          ref={(elem) => (nodesRef.current[nodes.length] = elem)}
        >
          <FormField
            label="Produto"
            tipo="select"
            options={produtos}
            nome="produtoId"
            required
          />
          <FormField
            label="Quantidade (Kg / Litro)"
            tipo="number"
            nome="quantidade"
            required
          />
        </FormGroup>,
      ]);
    }
  }, [produtos]); // eslint-disable-line react-hooks/exhaustive-deps

  function addNode() {
    // função para adicionar novas caixas de produto
    setNodes([
      ...nodes,
      <FormGroup
        key={nodes.length}
        formFields={formProduto}
        ref={(elem) => (nodesRef.current[nodes.length] = elem)}
      >
        <FormField label="Produto" tipo="select" options={produtos} required />
        <FormField label="Quantidade" tipo="number" required />
      </FormGroup>,
    ]);
  }

  async function submit() {
    try {
      // pegar dados da entrega
      const entrega = await ref.current.getForm();
      // pegar dados de cada produto
      const produtos = await Promise.all(
        nodesRef.current.map((node) => node.getForm())
      );

      // cadastrar entrega no backend e retornar o id
      const {
        data: { id },
      } = await window.axios.post("entregas", entrega);

      // cadastrar o produto da entrega usando o id retornado
      produtos.forEach((produto) => {
        window.axios.post("entregaProduto", {
          ...produto,
          EntregaId: id,
        });
      });

      // voltar para a página de pedidos
      navigate("/admin/pedidos");
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
      <div className="mb-4">
        <h3 className="text-white">Novo Pedido</h3>
      </div>
      <div className="card p-5 col-lg-6 mx-auto">
        <div className="mb-4">
          <Link to={"/admin/pedidos"}>
            <FontAwesomeIcon icon="fa-solid fa-angle-left" className="me-2" />
            Pedidos
          </Link>
        </div>
        <div>
          <FormGroup ref={ref} formFields={form}>
            <FormField
              nome="fornecedorId"
              label="Fornecedor"
              tipo="select"
              options={fornecedores}
              required
            />
            <FormField
              nome="tipoFrete"
              label="Tipo de frete"
              tipo="select"
              options={tiposDeFrete}
              required
            />
            <FormField
              nome="transportadoraId"
              label="Transportadora"
              tipo="select"
              options={transportadoras}
              required
            />
            <FormField
              nome="formaPagamento"
              label="Condição de pagamento"
              tipo="select"
              options={formasDePagamento}
              required
            />
            <FormField
              nome="dataEntrega"
              label="Data da entrega"
              tipo="date"
              required
            />
          </FormGroup>

          {nodes.map((node, i) => {
            return (
              <div key={i} className="p-4 my-4 border border-dark rounded">
                {node}
              </div>
            );
          })}
          <div className="d-flex justify-content-end">
            <button className="btn btn-primary" onClick={addNode}>
              Adicionar +
            </button>
          </div>

          <div className="pt-5 d-flex justify-content-center">
            <button className="btn btn-primary py-2 px-5" onClick={submit}>
              CADASTRAR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NovoPedido;
