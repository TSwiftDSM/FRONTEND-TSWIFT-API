import { Button } from "react-bootstrap";
import { FormGroup, FormField } from "../../components";
import { useEffect, useState, useRef } from "react";
import {
  useParams,
  //useNavigate
} from "react-router-dom";


const RecusaQualitativa = () => {

  const idEntrega = parseInt(useParams().id);
 // const navigate = useNavigate();

  const ref = useRef(null);

  const [testes, setTestes] = useState([]);
  const recusa = Object.freeze({
    motivo: "",
    idEntrega: idEntrega
  });


  useEffect(() => {
    window.axios
      .get(`/recusar/qualitativa/${idEntrega}`)
      .then(({ data }) => {
        setTestes(Object.values(data));
      });
  }, [idEntrega]);

  const form = Object.values(testes).map((item) => ({
    status: false,
    nomeProduto: item.Produto.nomeProduto,
    nomeTeste: item.TesteQualidade.nomeTeste,
  }));

  async function submit() {
    const data = await ref.current.getForm();
    console.log(data)
    window.axios
      .post(`/recusarQualitativaPost/simples`, data).then(() => {
        window.location.href = `/${idEntrega}/conferencia-realizada`
      })
  }

  return (
    <div className="container-cards">
      <div className="mb-4">
        <h3 className="text-white">
          Recebimento de Produto - Conferência Qualitativa
        </h3>
      </div>
      <div className="card-cadastro p-5 col-lg-6 mx-auto">
        <h3 className="d-flex mb-4 justify-content-center">RECUSAR ENTREGA</h3>

        <div>Inconsistências Encontradas</div>

        <div>

          {form.map((conjunto, i) => (
            <div key={i} className="mb-4">
              <h5>Produto: {conjunto.nomeProduto}</h5>
              <p>Teste: {conjunto.nomeTeste}</p>
            </div>
          ))}
          <FormGroup ref={ref} formFields={recusa}>
            <FormField nome="motivo" label="Observações" rows={4} required />
          </FormGroup>
        </div>
        <div className="d-flex justify-content-between">
          <div className="col-lg-5 mb-4">
            <Button
              className="w-100 py-2 text-white"
              variant="danger"
              type="submit"
              onClick={submit}
            >
              CONTINUAR
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecusaQualitativa;
