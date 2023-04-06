import { Form } from "react-bootstrap";

const Login = () => {
  return (
    <div className="Login">
      <div className="text-center">
        <span className="titulo">LOGIN</span>
      </div>
      <div>
        <Form className="d-grid gap-2">
          <Form.Group className="my-3">
            <Form.Label>Usuário</Form.Label>
            <Form.Control id="usuario" placeholder="Usuário" />
            <Form.Label>Senha</Form.Label>
            <Form.Control id="senha" placeholder="Senha" type="password" />
          </Form.Group>
          <button className="btn btn-secondary py-2" type="submit">
            ENTRAR
          </button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
