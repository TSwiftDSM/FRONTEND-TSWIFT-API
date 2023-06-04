import { formasDePagamento, tiposDeFrete } from "../../constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormGroup, FormField } from "../../components";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Modal from "react-modal";

const NovoPedido = () => {
  //const navigate = useNavigate();

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  function MyModal(isOpen) {
    if (isOpen) {
      return (
        <Modal
          isOpen={isOpen}
          onRequestClose={closeModal}
          className="caixa-modal mx-auto"
        >
          <h2 className="text-center mb-5">Cadastro realizado com sucesso!</h2>
          <button
            className="btn btn-primary py-2 px-5 col-3 mx-auto"
            onClick={() => {
              closeModal();
              window.location.href = "/admin/pedidos";
            }}
          >
            OK
          </button>
        </Modal>
      );
    }
  }

  const [form, setForm] = useState({
    fornecedorId: null,
    transportadoraId: null,
    tipoFrete: "",
    formaPagamento: "",
  });
  const formProduto = Object.freeze({
    produtoId: null,
    entregaId: null,
    quantidade: "",

    pesoPrevisto: 0,
    pesoReal: 0,
    especificacao: "Alguma especificação",
  });

  const ref = useRef(null);
  const productRef = useRef(null);

  const [produtos, setProdutos] = useState([]);
  const [fornecedores, setFornecedores] = useState([]);
  const [transportadoras, setTransportadoras] = useState([]);
  const [produtosPedido, setProdutosPedido] = useState([]);

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
    window.axios.get("fornecedores/").then(({ data }) => {
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

  async function addProduct() {
    const produto = await productRef.current.getForm();
    const obj = await ref.current.value;
    setForm(obj);
    setProdutosPedido((valorAtual) => [...valorAtual, produto]);
    productRef.current.clear();
  }

  function removerProduto(i) {
    let atualizado = [...produtosPedido];
    atualizado.splice(i, 1);
    setProdutosPedido(atualizado);
  }

  async function submit() {
    try {
      // pegar dados da entrega
      const entrega = await ref.current.getForm();

      // cadastrar entrega no backend e retornar o id
      const {
        data: { id },
      } = await window.axios.post("entregas", entrega);

      // cadastrar o produto da entrega usando o id retornado
      produtosPedido.forEach((produto) => {
        window.axios.post("entregaProduto", {
          ...produto,
          entregaId: parseInt(id),
        });
      });

      // voltar para a página de pedidos
      openModal();
    } catch (e) {
      console.log(e);
    }
  }

  const CloseButton = styled.button`
    position: absolute;
    top: 15px;
    right: 15px;
    width: 10px;
    aspect-ratio: 1;
    border: none;
    background: transparent;
    color: red;
  `;

  return (
    <div className="container-cards">
      <div className="mb-4">
        <h3 className="text-white">Novo Pedido</h3>
      </div>
      <div className="card-cadastro p-5 col-lg-6 mx-auto">
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

          {produtos.length > 0 && (
            <>
              <div className="p-4 my-4 border border-dark rounded">
                <FormGroup formFields={formProduto} ref={productRef}>
                  <FormField
                    label="Produto"
                    nome="produtoId"
                    tipo="select"
                    options={produtos}
                    required
                  />
                   <FormField
                    label="Quantidade"
                    tipo="number"
                    nome="quantidade"
                    required
                  />
                  <FormField
                    label="Peso Previsto"
                    tipo="number"
                    nome="pesoPrevisto"
                    required
                  />
                </FormGroup>
              </div>
              <div className="d-flex justify-content-end">
                <button className="btn btn-primary" onClick={addProduct}>
                  Adicionar +
                </button>
              </div>
            </>
          )}

          <div className="row">
            {produtosPedido.length > 0 &&
              produtosPedido.map((p, i) => (
                <div
                  className="col-6 border border-dark rounded p-4 my-3 position-relative"
                  key={i}
                >
                  <CloseButton onClick={() => removerProduto(i)}>X</CloseButton>
                  <div className="mb-2">
                    Produto:{" "}
                    {
                      produtos.find(
                        (produto) => produto.id === parseInt(p.produtoId)
                      ).nome
                    }
                  </div>
                  <div>
                    Quantidade:
                    {p.quantidade}
                  </div>
                  <div>
                    Peso:
                    {p.pesoPrevisto}
                  </div>
                </div>
              ))}
          </div>

          <div className="pt-5 d-flex justify-content-center">
            <button
              className="btn btn-primary py-2 px-5 text-white"
              onClick={submit}
              disabled={produtosPedido.length < 1}
            >
              CADASTRAR
            </button>
          </div>
          {MyModal(modalIsOpen)}
        </div>
      </div>
    </div>
  );
};

export default NovoPedido;
