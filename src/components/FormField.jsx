import { Form } from "react-bootstrap";

export const FormField = (props) => {
  const { mudarCampo, nome, label, tipo, options, placeholder, disabled } =
    props;

  function mudar(e) {
    mudarCampo(e);
  }

  function inputField() {
    switch (tipo) {
      case "textarea":
        return (
          <Form.Control
            as="textarea"
            name={nome}
            placeholder={placeholder}
            onChange={mudar}
          />
        );
      case "number":
        return (
          <Form.Control
            type="number"
            name={nome}
            placeholder={placeholder}
            onChange={mudar}
          />
        );
      case "date":
        return (
          <Form.Control
            type="date"
            name={nome}
            placeholder={placeholder}
            onChange={mudar}
          />
        );
      case "select":
        return (
          <Form.Select
            name={nome}
            onChange={mudar}
            disabled={disabled || !options}
          >
            {options &&
              !!options.length &&
              [{ id: "", nome: "Selecione" }, ...options].map((opt) => {
                return (
                  <option key={opt.id} value={opt.id}>
                    {opt.nome}
                  </option>
                );
              })}
          </Form.Select>
        );
      default:
        return (
          <Form.Control
            name={nome}
            placeholder={placeholder}
            onChange={mudar}
          />
        );
    }
  }

  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      {inputField()}
    </Form.Group>
  );
};
