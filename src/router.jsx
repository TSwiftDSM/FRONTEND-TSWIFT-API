import App from "./templates/App";

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
import AlterarProduto from "./pages/admin/AlterarProduto";
import AlterarColaborador from "./pages/admin/AlterarColaborador";
import Regras from "./pages/admin/Regras";
import NovaRegra from "./pages/admin/NovaRegra";
import Transportadoras from "./pages/admin/Transportadoras";
import NovoTransportadora from "./pages/admin/NovoTransportador";

import Entrada from "./pages/etapas/Entrada";
import Qualitativa from "./pages/etapas/Qualitativa";
import Quantitativa from "./pages/etapas/Quantitativa";
import RecusaEntrega from "./pages/etapas/RecusaEntrega";
import RecusaEntrada from "./pages/etapas/RecusaEntrada";
import RecusaQualitativa from "./pages/etapas/RecusaQualitativa";
import RecusaQuantitativa from "./pages/etapas/RecusaQuantitativa";
import ConferenciaRealizada from "./pages/etapas/ConferenciaRealizada";
import CadastroRealizado from "./pages/admin/CadastroRealizado";
import Colaborador from "./pages/admin/Colaboradores";
import Menurelatorio from "./pages/admin/MenuRelatorio";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/recebimentos",
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
        path: "/admin/produtos/:id",
        element: <AlterarProduto />,
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
        path: "/admin/fornecedores/:id",
        element: <AlterarFornecedor />,
      },
      {
        path: "/admin/novo-fornecedor",
        element: <NovoFornecedor />,
      },
      {
        path: "/admin/colaboradores",
        element: <Colaborador />,
      },
      {
        path: "/admin/colaboradores/:id",
        element: <AlterarColaborador />,
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
        path: "/admin/regras",
        element: <Regras />,
      },
      {
        path: "/admin/regras/:id",
        element: <NovaRegra />,
      },
      {
        path: "/admin/transportadora",
        element: <Transportadoras />,
      },
      {
        path: "/admin/transportadora/novo",
        element: <NovoTransportadora />,
      },
      {
        path: "/admin/menu-relatorios",
        element: <Menurelatorio />,
      },
    ],
  },
];

export default routes;
