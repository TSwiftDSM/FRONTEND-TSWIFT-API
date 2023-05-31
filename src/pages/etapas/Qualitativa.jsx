import CollapseComponent from "../../components/qualitativa/CollapseComponent";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Contador } from "../../components";
import { Button } from "react-bootstrap";
import axios from "axios";

const Qualitativa = () => {
  const idEntrega = parseInt(useParams().id);
  const navigate = useNavigate();

  const [testes, setTestes] = useState([]);

  useEffect(() => {
    axios
      .get(`conferencia/qualitativa/api/qualitativa/${idEntrega}`)
      .then(({ data }) => {
        setTestes(Object.values(data));
      });
  }, [idEntrega]);

  let form = testes
    .map((c) =>
      c.TesteQualidade.map((t) => {
        return {
          idEntrega: idEntrega,
          status: false,
          idProduto: c.id,
          idQualidade: t.id,
        };
      })
    )
    .flat(1);

  function atualizarConjunto(c) {
    let index = form.findIndex(
      (i) => i["idProduto"] == c.idProduto && i.idQualidade == c.idQualidade
    );
    form[index] = { ...c, idEntrega: idEntrega };
  }

  function submit() {
    axios
      .post(`conferencia/qualitativa/api/PersistenciaQualitativa`, {
        qualidadeProdutos: form,
      })
      .then(() => {
        navigate(`/${idEntrega}/relatorio`);
      });
    // .then(({ data }) => {
    //   const route =
    //     data === "Entrega Aprovada"
    //       ? `/${idEntrega}/conferencia-realizada`
    //       : `/${idEntrega}/recusa-qualitativa`;
    //   navigate(route);
    // }
    // );
  }

  return (
    <div>
      <div className="mb-4">
        <h3 className="text-white">
          Recebimento de Produto - Conferência Qualitativa
        </h3>
      </div>

      <div className="card mx-auto col-lg-6 p-5">
        <div className="mx-auto mb-3">
          <Contador etapa={3} />
        </div>

        {/* <div className="card amarelo border-secondary text-center mb-5">
          <div style={{ fontSize: "36px" }} className="text-secondary">
            <FontAwesomeIcon icon="fa-solid fa-triangle-exclamation" />
          </div>
          <span>
            Respostas marcadas com SIM confirmam a existência de inconsistências
            na qualidade dos produtos.
          </span>
        </div> */}

        <div className="mb-4">
          {testes.map((conjunto, i) => {
            return (
              <div key={i} className="mb-4">
                <CollapseComponent
                  conjunto={conjunto}
                  atualizar={atualizarConjunto}
                />
              </div>
            );
          })}
        </div>
        <div className="d-flex justify-content-center">
          <Button
            className="text-white py-2 px-4"
            type="submit"
            onClick={submit}
          >
            CONTINUAR
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Qualitativa;
