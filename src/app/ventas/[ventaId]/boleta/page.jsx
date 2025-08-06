import { notFound } from "next/navigation";

import { NavbarDynamic } from "@/components/navbar/NavbarDynamic";
import { getVentaRequestServer } from "@/app/ventas/_services/requests";
import { DetailBoletaContent } from "@/app/ventas/[ventaId]/boleta/_components/detailBoletaContent";
import { getAllEmpresasForComprobanteVentaRequestServer } from "@/app/ventas/[ventaId]/_services/requests";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
export default async function Page({ params }) {
  const session = await getServerSession(authOptions);
  if (
    session?.user?.rol !== "Administrador" &&
    session?.user?.rol !== "Vendedor"
  ) {
    notFound();
  }

  // eslint-disable-next-line no-undef
  const results = await Promise.allSettled([
    getVentaRequestServer(params.ventaId),
    getAllEmpresasForComprobanteVentaRequestServer(),
  ]);

  const { venta } = results[0].value;
  const { empresas } = results[1].value;

  const facturaEmitida = venta.comprobante.toLowerCase().includes("factura");

  if (!venta || facturaEmitida) {
    notFound();
  }

  const navbarTitles = [
    {
      title: "Inventario",
      href: "/inventario/todos",
      active: false,
    },
    {
      title: "Ventas",
      href: "/ventas",
      active: true,
    },
    {
      title: venta?.code,
      href: `/ventas/${params.ventaId}`,
      active: true,
    },
    {
      title: "Boleta",
      href: "",
      active: false,
    },
  ];

  return (
    <NavbarDynamic titles={navbarTitles}>
      <DetailBoletaContent ventaData={venta} empresas={empresas} />
    </NavbarDynamic>
  );
}
