import logo from "../assets/img/logo.svg";
import styled from "styled-components";
import { Login } from "../components/Login";

const Auth = () => {
  return (
    <div className="auth">
      <header className="container header d-flex">
        <div>
          <Logo src={logo} alt="Logo" />
        </div>
      </header>
      <div className="container d-flex align-items-center justify-content-center content">
        <Login />
      </div>
      <footer className="text-center mx-5 py-3">
        © 2023 Todos os direitos reservados
      </footer>
    </div>
  );
};

export default Auth;

const Logo = styled.img`
  height: 70px;
  width: 100px;
`;
