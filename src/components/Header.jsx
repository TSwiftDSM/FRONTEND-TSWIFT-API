import { Link } from "react-router-dom";

const Header = (props) => {
  const { titulo } = props;

  return (
    <div className="header">
      <div className="d-flex justify-content-between align-items-start">
        <div>Logo</div>
        <div className="mb-5">
          <Link className="btn" to={"/"}>
            Home
          </Link>
          <button className="btn">Sair</button>
        </div>
      </div>
      {titulo && <div>{titulo}</div>}
    </div>
  );
};

export default Header;
