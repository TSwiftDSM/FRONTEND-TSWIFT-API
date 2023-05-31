import { Form, Button, InputGroup } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Login = () => {
  return (
    <div className="login">
      <div>
        <Form className="d-grid gap-2 mb-3">
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
          <Button variant="secondary" className="mt-4 btn-md" type="submit">
            ENTRAR
          </Button>
        </Form>
      </div>
    </div>
  );
};
