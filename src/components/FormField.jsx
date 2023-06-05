import { Form, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const FormField = (props) => {
  const {
    placeholder,
    required,
    mudarCampo,
    className,
    disabled,
    options,
    value,
    label,
    icon,
    nome,
    tipo,
    rows,
  } = props;

  function mudar(e) {
    mudarCampo(e);
  }

  const childProps = {
    placeholder: placeholder,
    className: className,
    required: required,
    disabled: disabled,
    onChange: mudar,
    value: value,
    type: tipo,
    name: nome,
    rows: rows
  };

  function inputField() {
    switch (tipo) {
      case "textarea":
        return <Form.Control as="textarea" {...childProps} />;
      case "select":
        return (
          <Form.Select
            name={nome}
            onChange={mudar}
            disabled={disabled || !options}
            required={required}
            className={className}
            value={value}
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
      case "check":
        return <Form.Check name={nome} checked={value} onChange={mudar} />;
      default:
        return (
          <InputGroup>
            {icon && (
              <InputGroup.Text className={className}>
                <FontAwesomeIcon icon={icon} />
              </InputGroup.Text>
            )}
            <Form.Control {...childProps} />
          </InputGroup>
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
