import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/img/logo-tswift.png";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Header = () => {
  return (
    <header>
      <div className="container d-flex justify-content-between align-items-center">
        <div>
          <Logo src={logo} alt="Logo" />
        </div>
        <div className="mb-5">
          <Link className="btn text-white" to={"/admin"}>
            Home
          </Link>
          {/* <button className="btn text-white">
            <span className="pe-2">Sair </span>
            <FontAwesomeIcon icon="fa-solid fa-arrow-right-from-bracket" />
          </button> */}
        </div>
      </div>
    </header>
  );
};

const Logo = styled.img`
  height: 70px;
  width: 100px;
`;
