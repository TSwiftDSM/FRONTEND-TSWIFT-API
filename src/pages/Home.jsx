import CardEntrega from "../components/CardEntrega";
import Busca from "../components/Busca";

const Hello = () => {
  return (
    <div>
      <div className="row justify-content-between mb-4">
        <div className="col-lg-4">
          <h3 className="text-white">Entregas agendadas</h3>
        </div>
        <div className="col-lg-4">
          <Busca />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-4 mb-3">
          <CardEntrega variante="vermelho" />
        </div>
        <div className="col-lg-4 mb-3">
          <CardEntrega variante="verde" />
        </div>
        <div className="col-lg-4 mb-3">
          <CardEntrega variante="azul" />
        </div>
        <div className="col-lg-4 mb-3">
          <CardEntrega />
        </div>
        <div className="col-lg-4 mb-3">
          <CardEntrega />
        </div>
        <div className="col-lg-4 mb-3">
          <CardEntrega />
        </div>
      </div>
    </div>
  );
};

export default Hello;
