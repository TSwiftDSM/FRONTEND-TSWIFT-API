import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";

export const Produto = (props) => {
  const { produto, index, update } = props;

  const [form, setForm] = useState(produto);

  const atualizar = (e) => {
    const t = e.target;
    setForm({
      ...form,
      [t.name]:
        t.type === "checkbox"
          ? t.checked
          : t.type === "number"
          ? parseInt(t.value.trim())
          : t.value.trim(),
    });
  };

  useEffect(() => {
    update(form, index);
  }, [form, index, update]);

  return (
    <div>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Especificação do Produto</Form.Label>
          <Form.Control onChange={atualizar} name="especificacao" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Quantidade</Form.Label>
          <Form.Control
            onChange={atualizar}
            name="quantidade"
            type="number"
            value={form.quantidade}
          />
        </Form.Group>
        {/* <Form.Group>
          <Form.Label>Unidade</Form.Label>
          <Form.Control onChange={atualizar} name="especificacao" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Valor Total</Form.Label>
          <Form.Control onChange={atualizar} name="especificacao" />
        </Form.Group> */}
      </Form>
    </div>
  );
};
