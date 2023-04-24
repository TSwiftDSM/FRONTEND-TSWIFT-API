import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import Contador from "../../components/Contador";
import CollapseComponent from "../../components/CollapseComponent";
import { Produto } from "../../components/quantitativa/Produto";
import { get } from "lodash";

const Quantitativa = () => {
  const id = parseInt(useParams().id);
  const navigate = useNavigate();

  const [produtos, setProdutos] = useState([]);
  const [form, setForm] = useState([]);
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/conferencia/quantitativa/${id}`)
      .then(({ data }) => {
        setProdutos(data);
        setForm(
          data.map((p) => {
            return {
              id_entrega_produto: p.id,
              peso_previsto: p.pesoPrevisto,
              especificacao: "",
              quantidade: 0,
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
    axios
      .post(`http://localhost:3000/conferencia/quantitativa/${id}`, data)
      .then(({ data }) => {
        const rota =
          data === "Etapa Concluida"
            ? `/${id}/qualitativa`
            : `/${id}/recusa-quantitativa`;
        navigate(rota);
      });
  }

  return (
    <div>
      <div className="mb-4">
        <h3 className="text-white">
          Recebimento de Produto - Conferência Quantitativa
        </h3>
      </div>
      <div className="card mx-auto col-lg-6 p-5">
        <div className="mx-auto mb-3">
          <Contador etapa={2} /> {/* posição do indicador de etapas */}
        </div>
        <Link to={"/"}>
          <FontAwesomeIcon icon="f-solid fa-angle-left" className="me-2" />
          Voltar
        </Link>

        {produtos.map((p, i) => {
          return (
            <div key={i} className="my-4">
              <CollapseComponent
                nome={`${get(p, "Produto.id")} - ${get(
                  p,
                  "Produto.nomeProduto"
                )}`}
              >
                <Produto produto={form[i]} index={i} update={update} />
              </CollapseComponent>
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
