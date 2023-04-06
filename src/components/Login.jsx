import { Form, Button, InputGroup } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
            <InputGroup>
              <InputGroup.Text>
                <FontAwesomeIcon icon="fa-regular fa-user" />
              </InputGroup.Text>
              <Form.Control placeholder="Usuário" />
            </InputGroup>
          </Form.Group>
          <Form.Group controlId="senha">
            <Form.Label>Senha</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <FontAwesomeIcon icon="fa-solid fa-lock" />
              </InputGroup.Text>
              <Form.Control placeholder="Senha" type="password" />
            </InputGroup>
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
