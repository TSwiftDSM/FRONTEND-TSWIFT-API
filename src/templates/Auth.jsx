import styled from "styled-components";
import Login from "../components/Login";
import logo from "../assets/img/logo-tswift.png";

const Logo = styled.img`
  height: 70px;
  width: 100px;
  position: absolute;
  top: 20px;
  right: 20px;
`;

function Auth() {
  return (
    <div className="Auth">
      <Logo src={logo} alt="Logo" />
      <div className="container-fluid d-flex align-items-center justify-content-center content">
        <Login />
      </div>
      <footer className="text-center mx-5 py-3">
        © 2023 Todos os direitos reservados
      </footer>
    </div>
  );
}

export default Auth;
