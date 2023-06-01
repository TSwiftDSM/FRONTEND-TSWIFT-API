import { useAuth } from "../main";

import { FormGroup } from "./FormGroup";
import { FormField } from "./FormField";

import { useRef } from "react";

export const Login = () => {
  const context = useAuth();

  async function login() {
    const data = await ref.current.getForm();
    context.login(data).then();
  }
  const form = Object.freeze({
    login: "",
    senha: "",
  });
  const ref = useRef(null);

  return (
    <div className="login">
      <div>
        <FormGroup ref={ref} formFields={form}>
          <FormField
            nome="login"
            label="Usuário"
            placeholder="Usuário"
            required
            icon="fa-regular fa-user"
          />
          <FormField
            nome="senha"
            label="Senha"
            placeholder="Senha"
            required
            icon="fa-solid fa-lock"
            tipo="password"
          />
        </FormGroup>
        <button className="btn btn-secondary col-12 mt-2" onClick={login}>
          ENTRAR
        </button>
      </div>
    </div>
  );
};
