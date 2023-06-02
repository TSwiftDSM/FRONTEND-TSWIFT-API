import { Outlet } from "react-router";
import { HeaderAdmin } from "../components";

function App() {
  return (
    <div className="app">
      <HeaderAdmin />

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
