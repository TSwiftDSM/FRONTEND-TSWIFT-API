import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Produto } from "../../components/quantitativa/Produto";
import { Contador, Colapsador } from "../../components";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { get } from "lodash";

const Quantitativa = () => {
  const id = parseInt(useParams().id);
  const navigate = useNavigate();

  const [produtos, setProdutos] = useState([]);
  const [form, setForm] = useState([]);
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    window.axios.get(`conferencia/quantitativa/${id}`).then(({ data }) => {
      setProdutos(data);
      setForm(
        data.map((p) => {
          return {
            id_entrega_produto: p.id,
            peso_previsto: p.pesoPrevisto,
            especificacao: "",
            quantidade: 0,
            pesoUnitario: 0,
            valorTotal: 0,
          };
        })
      );
    });
  }, [id]);

  function update(p, i) {
    let data = form;
    data[i] = p;
    setForm(data);
    let objeto = form.find((o) => !o.especificacao);
    setDisable(!!objeto);
  }

  function submit() {
    let data = {
      id_usuario: 1,
      update_objects: form,
    };
    window.axios
      .post(`conferencia/quantitativa/${id}`, data)
      .then(({ data }) => {
        const rota =
          data === "Etapa Concluida"
            ? `/${id}/qualitativa`
            : `/${id}/recusa-quantitativa`;
        navigate(rota);
      });
  }

  return (
    <div className="container-cards">
      <div className="mb-4">
        <h3 className="text-white">
          Recebimento de Produto - Conferência Quantitativa
        </h3>
      </div>
      <div className="card-cadastro p-5 col-lg-6 mx-auto">
        <div className="mb-3 d-flex justify-content-center">
          <Contador etapa={2} /> {/* posição do indicador de etapas */}
        </div>

        {!!produtos.length &&
          produtos.map((p, i) => {
            return (
              <div key={i} className="my-4">
                <Colapsador
                  nome={`${get(p, "Produto.id")} - ${get(
                    p,
                    "Produto.nomeProduto"
                  )}`}
                >
                  <Produto produto={form[i]} index={i} update={update} />
                </Colapsador>
              </div>
            );
          })}

        <div className="mt-4">
          <div className="d-flex justify-content-center">
            <Button
              className="text-white py-2 px-4"
              type="submit"
              onClick={submit}
              disabled={disable}
            >
              CONTINUAR
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quantitativa;
