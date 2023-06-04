import CollapseComponent from "../../components/qualitativa/CollapseComponent";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Contador } from "../../components";
import { Button } from "react-bootstrap";

const Qualitativa = () => {
  const idEntrega = parseInt(useParams().id);
  const navigate = useNavigate();

  const [testes, setTestes] = useState([]);

  useEffect(() => {
    window.axios
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
    window.axios
      .post(`conferencia/qualitativa/api/PersistenciaQualitativa`, {
        qualidadeProdutos: form,
      })
      .then(({ data }) => {
        const route =
          data === "Entrega Aprovada"
            ? `/${idEntrega}/conferencia-realizada`
            : `/${idEntrega}/recusa-qualitativa`;
        navigate(route);
      }
      );
  }

  return (
    <div className="container-cards">
      <div className="mb-4">
        <h3 className="text-white">
          Recebimento de Produto - Conferência Qualitativa
        </h3>
      </div>

      <div className="card-cadastro p-5 col-lg-6 mx-auto">
        <div className="mb-3 d-flex justify-content-center">
          <Contador etapa={3} />
        </div>

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
