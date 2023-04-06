import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="container-fluid content">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;
