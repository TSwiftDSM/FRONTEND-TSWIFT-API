import { Outlet } from "react-router";
import { Header, HeaderAdmin } from "../components";

function App(props) {
  const { admin = false } = props;
  return (
    <div className="app">
      {admin ? <HeaderAdmin /> : <Header />}
      {/* if (admin) {<HeaderAdmin/>} else {<Header/>} */}

      <div className="container content">
        <Outlet />
      </div>
      <footer className="container text-center py-3">
        © 2023 Todos os direitos reservados
      </footer>
    </div>
  );
}

export default App;
