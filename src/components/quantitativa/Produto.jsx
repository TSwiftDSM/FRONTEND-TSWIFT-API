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
          ? parseInt(t.value)
          : t.value,
    });
  };

  useEffect(() => {
    update(form, index);
  }, [form, index, update]);

  const atualizarValorTotal = (quantidade, unidade) => {
    const valorTotal = quantidade * unidade;
    setForm({
      ...form,
      valorTotal,
    });
  };

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
          <Form.Label>Peso Unitário</Form.Label>
          <Form.Control
            onChange={atualizar}
            name="pesoUnitario"
            type="number"
            value={form.pesoUnitario}
          />
          <Form.Label>Valor Total</Form.Label>
          <Form.Control
            onChange={(e) => {
              atualizar(e);
              atualizarValorTotal(form.quantidade, form.unidade);
            }}
            readOnly
            name="valorTotal"
            type="number"
            value={(form.valorTotal = form.pesoUnitario * form.quantidade)}
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
