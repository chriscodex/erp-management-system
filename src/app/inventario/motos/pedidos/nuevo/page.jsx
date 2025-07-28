import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NavbarDynamic } from "@/components/navbar/NavbarDynamic";
import { RiBox2Fill } from "@remixicon/react";
import { NuevoPedidoForm } from "@/app/inventario/motos/pedidos/nuevo/_components/nuevoPedidoForm";
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
export default async function NuevoPedidoPage() {
  const session = await getServerSession(authOptions);

  if (session?.user?.rol !== "Administrador") {
    notFound();
  }
  
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

  const titles = [
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
      title: "Nuevo Pedido",
      href: "",
      active: false,
    },
  ];

  return (
    <NavbarDynamic titles={titles}>
      <Card className="w-full max-w-7xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <RiBox2Fill className="md:h-7 h-5 md:w-7 w-5" />
            Nuevo Pedido
          </CardTitle>
        </CardHeader>
        <CardContent>
          <NuevoPedidoForm
            modelos={modelos}
            modelosPedidos={modelosPedidos}
            proveedores={proveedores}
            almacenes={almacenes}
            categories={categories}
            marcas={marcas}
          />
        </CardContent>
      </Card>
    </NavbarDynamic>
  );
}
