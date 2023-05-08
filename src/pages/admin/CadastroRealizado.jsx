import { Button } from "react-bootstrap";

const CadastroRealizado = () => {
  return (
    <div>
      <div className="mb-4">
        <h3 className="text-white">Cadastrar</h3>
      </div>
      <div className="card mx-auto col-lg-6 p-5">
        <span className="mb-5 text-center">
          Cadastro realizado com sucesso.
        </span>
        <div className="d-flex  justify-content-center">
          <Button className="py-2 text-white" variant="primary">
            CONCLUIR
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CadastroRealizado;
