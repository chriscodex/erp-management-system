import { notFound } from "next/navigation";
import { RiEditFill } from "@remixicon/react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NavbarDynamic } from "@/components/navbar/NavbarDynamic";
import { getPedidoRequestServer } from "@/app/inventario/motos/pedidos/_services/requests";
// import { getMarcaRequestServer } from "@/app/inventario/motos/pedidos/_services/requests";
// import { getCategoryRequestServer } from "@/app/inventario/motos/pedidos/_services/requests";
import { EditarPedidoForm } from "@/app/inventario/motos/pedidos/[id]/edit/_components/EditarPedidoForm";
import {
  getAllModelosRequestServer,
  getAllModelosPedidosRequestServer,
  getAllProveedoresRequestServer,
  getAllAlmacenesRequestServer,
  getCategoriesBySegmentDataForModelosRequestServer,
  getMarcasBySegmentDataForModelosRequestServer,
} from "@/app/inventario/motos/pedidos/_services/requests";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
export default async function Page({ params }) {
  const session = await getServerSession(authOptions);
  if (session?.user?.rol !== "Administrador") {
    notFound();
  }
  const { pedido } = await getPedidoRequestServer(params.id);
  
  if (!pedido) {
    notFound();
  }

  const navbarTitles = [
    {
      title: "Inventario",
      href: "",
      active: false,
    },
    {
      title: "Motos",
      href: "",
      active: false,
    },
    {
      title: "Pedidos",
      href: "/inventario/motos/pedidos",
      active: true,
    },
    {
      title: pedido?.code,
      href: "",
      active: false,
    },
    {
      title: "Editar",
      href: "",
      active: false,
    },
  ];
  const [
    modelosPedidoResponse,
    modelosPedidosResponse,
    proveedoresPedidoResponse,
    almacenesPedidoResponse,
    categoriesPedidoResponse,
    marcasPedidoResponse,
    // eslint-disable-next-line no-undef
  ] = await Promise.all([
    getAllModelosRequestServer(),
    getAllModelosPedidosRequestServer(),
    getAllProveedoresRequestServer(),
    getAllAlmacenesRequestServer(),
    getCategoriesBySegmentDataForModelosRequestServer({
      segmentName: "Motos",
      categoryEstado: "activo",
    }),
    getMarcasBySegmentDataForModelosRequestServer({
      nombre: "Motos",
      marcaEstado: "activo",
    }),
  ]);

  const { modelos = [] } = modelosPedidoResponse || {};
  const { modelosPedidos = [] } = modelosPedidosResponse || {};
  const { proveedores = [] } = proveedoresPedidoResponse || {};
  const { almacenes = [] } = almacenesPedidoResponse || {};
  const { categories = [] } = categoriesPedidoResponse || {};
  const { marcas = [] } = marcasPedidoResponse || {};
  return (
    <NavbarDynamic titles={navbarTitles}>
      <Card className="w-full max-w-7xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <RiEditFill className="md:h-7 h-5 md:w-7 w-5" />
            Editar Pedido
          </CardTitle>
        </CardHeader>
        <CardContent>
          <EditarPedidoForm
            modelos={modelos}
            modelosPedidos={modelosPedidos}
            proveedores={proveedores}
            almacenes={almacenes}
            categories={categories}
            marcas={marcas}
            pedidoData={pedido}
          />
        </CardContent>
      </Card>
    </NavbarDynamic>
  );
}
