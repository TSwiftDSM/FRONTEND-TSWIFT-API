import { useState } from "react";
import { Form } from "react-bootstrap";

const Fileira = (props) => {
  const { regra, atualizar } = props;

  const [form, setForm] = useState(regra);

  async function mudarStatus(v) {
    setForm({ ...form, status: v });
    atualizar({ ...form, status: v });
  }

  return (
    <>
      <tr>
        <th>{regra.texto}</th>
        <th className="text-center">
          <Form.Check
            checked={form.status}
            onChange={() => {
              mudarStatus(true);
            }}
          />
        </th>
        <th className="text-center">
          <Form.Check
            checked={!form.status}
            onChange={() => {
              mudarStatus(false);
            }}
          />
        </th>
      </tr>
    </>
  );
};

export default Fileira;
