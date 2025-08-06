import { notFound } from "next/navigation";

import { NavbarDynamic } from "@/components/navbar/NavbarDynamic";
import { getPedidoRequestServer } from "@/app/inventario/motos/pedidos/_services/requests";
import { getMarcaRequestServer } from "@/app/inventario/motos/pedidos/_services/requests";
import { getCategoryRequestServer } from "@/app/inventario/motos/pedidos/_services/requests";
import { DetailPedidoContent } from "@/app/inventario/motos/pedidos/[id]/_components/DetailPedidoContent";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
export default async function Page({ params }) {
  // eslint-disable-next-line no-undef
  const results = await Promise.allSettled([
    getServerSession(authOptions),
    getPedidoRequestServer(params.id),
  ]);

  const session = results[0].value;
  const { pedido } = results[1].value;

  if (session?.user?.rol !== "Administrador" || !pedido) {
    notFound();
  }

  // eslint-disable-next-line no-undef
  const results2 = await Promise.allSettled([
    getMarcaRequestServer(pedido.modelo.marca),
    getCategoryRequestServer(pedido.modelo.categoria),
  ]);
  const { marca } = results2[0].value;
  const { category } = results2[1].value;

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
