import { notFound } from "next/navigation";

import { NavbarDynamic } from "@/components/navbar/NavbarDynamic";
import { getPedidoRequestServer } from "@/app/inventario/motos/pedidos/_services/requests";
import { getMarcaRequestServer } from "@/app/inventario/motos/pedidos/_services/requests";
import { getCategoryRequestServer } from "@/app/inventario/motos/pedidos/_services/requests";
import { DetailPedidoContent } from "@/app/inventario/motos/pedidos/[id]/_components/DetailPedidoContent";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
export default async function Page({ params }) {
  
  const session = await getServerSession(authOptions);
  if (session?.user?.rol !== "Administrador") {
    notFound();
  }
  const { pedido } = await getPedidoRequestServer(params.id);
  const { marca } = await getMarcaRequestServer(pedido.modelo.marca);
  const { category } = await getCategoryRequestServer(pedido.modelo.categoria);

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
  ];

  return (
    <NavbarDynamic titles={navbarTitles}>
      <DetailPedidoContent
        pedidoData={pedido}
        marcaData={marca}
        categoryData={category}
      />
    </NavbarDynamic>
  );
}
