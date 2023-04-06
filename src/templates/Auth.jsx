import styled from "styled-components";
import Footer from "../components/Footer";
import Login from "../components/Login";
import logo from "../assets/img/logo-tswift.png";

function Auth() {
  const Logo = styled.img`
    height: 70px;
    width: 100px;
    position: absolute;
    top: 20px;
    right: 20px;
  `;
  return (
    <div className="Auth">
      <Logo src={logo} alt="Logo" />
      <div className="container-fluid d-flex align-items-center justify-content-center content">
        <Login />
      </div>
      <Footer />
    </div>
  );
}

export default Auth;
