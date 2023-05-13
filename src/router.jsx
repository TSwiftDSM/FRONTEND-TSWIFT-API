import App from "./templates/App";
// import Auth from "./templates/Auth";

import EntregasAgendadas from "./pages/EntregasAgendadas";

import Home from "./pages/admin/Home";
import Produtos from "./pages/admin/Produtos";
import Relatorio from "./pages/admin/Relatorio";
import NovoPedido from "./pages/admin/NovoPedido";
import NovoProduto from "./pages/admin/NovoProduto";
import Fornecedores from "./pages/admin/Fornecedores";
import PedidosAdmin from "./pages/admin/PedidosAdmin";
import NovoFornecedor from "./pages/admin/NovoFornecedor";
import NovoColaborador from "./pages/admin/NovoColaborador";
import AlterarFornecedor from "./pages/admin/AlterarFornecedor";
import AlterarProduto from "./pages/admin/AlterarProduto"

import Entrada from "./pages/etapas/Entrada";
import Qualitativa from "./pages/etapas/Qualitativa";
import Quantitativa from "./pages/etapas/Quantitativa";
import RecusaEntrega from "./pages/etapas/RecusaEntrega";
import RecusaEntrada from "./pages/etapas/RecusaEntrada";
import RecusaQualitativa from "./pages/etapas/RecusaQualitativa";
import RecusaQuantitativa from "./pages/etapas/RecusaQuantitativa";
import ConferenciaRealizada from "./pages/etapas/ConferenciaRealizada";
import CadastroRealizado from "./pages/admin/CadastroRealizado";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <EntregasAgendadas />,
      },
      {
        path: "/:id/entrada",
        element: <Entrada />,
      },
      {
        path: "/:id/recusa-entrada",
        element: <RecusaEntrada />,
      },
      {
        path: "/:id/quantitativa" /* criando a rota qualitativa  */,
        element: <Quantitativa /> /* chamando a pagina qualitativa */,
      },
      {
        path: "/:id/recusa-quantitativa",
        element: <RecusaQuantitativa />,
      },
      {
        path: "/:id/qualitativa",
        element: <Qualitativa />,
      },
      {
        path: "/:id/recusa-qualitativa",
        element: <RecusaQualitativa />,
      },
      {
        path: "/:id/conferencia-realizada",
        element: <ConferenciaRealizada />,
      },
      {
        path: "/:id/recusa-entrega",
        element: <RecusaEntrega />,
      },
      {
        path: "/:id/relatorio",
        element: <Relatorio />,
      },
    ],
  },
  // {
  //   path: "/login",
  //   element: <Auth />,
  // },
  {
    path: "/admin",
    element: <App admin={true} />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/admin/pedidos",
        element: <PedidosAdmin />,
      },
      {
        path: "/admin/novo-pedido",
        element: <NovoPedido />,
      },
      {
        path: "/admin/produtos",
        element: <Produtos />,
      },
      {
        path: "/admin/novo-produto",
        element: <NovoProduto />,
      },
      {
        path: "/admin/fornecedores",
        element: <Fornecedores />,
      },
      {
        path: "/admin/novo-fornecedor",
        element: <NovoFornecedor />,
      },
      {
        path: "/admin/novo-colaborador",
        element: <NovoColaborador />,
      },
      {
        path: "/admin/cadastro-realizado",
        element: <CadastroRealizado />,
      },
      {
        path: "/admin/fornecedor/alterar/:id",
        element: <AlterarFornecedor />,
      },
      {
        path: "/admin/produto/alterar/:id",
        element: <AlterarProduto />,
      }
    ],
  },
];

export default routes;
