import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NovoColaborador = () => {
  const navigate = useNavigate();

  const form = Object.freeze({
    nome: "",
    cpf: "",
    DatadeNascimento: "",
    função: "",
  });

  const ref = useRef(null);

  async function submit() {
    const data = await ref.current.getForm();
    axios.post("http://localhost:3000/colaboradores", data).then(() => {
      navigate("/admin/colaboradores");
    });
  }
  return;
};

export default NovoColaborador;
