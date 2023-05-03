import { Form } from "react-bootstrap";

export const FormField = (props) => {
  const { mudarCampo, nome, label } = props;

  function mudar(e) {
    mudarCampo(e);
  }

  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control name={nome} onChange={mudar} />
    </Form.Group>
  );
};
