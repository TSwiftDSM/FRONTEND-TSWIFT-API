import { Form, Button } from "react-bootstrap";

const Login = () => {
  return (
    <div className="Login">
      <div className="text-center">
        <span className="titulo">LOGIN</span>
      </div>
      <div>
        <Form className="d-grid gap-2 my-3">
          <Form.Group controlId="usuario">
            <Form.Label>Usuário</Form.Label>
            <Form.Control placeholder="Usuário" />
          </Form.Group>
          <Form.Group controlId="senha">
            <Form.Label>Senha</Form.Label>
            <Form.Control placeholder="Senha" type="password" />
          </Form.Group>
          <Button variant="secondary" className="mt-3">
            ENTRAR
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
