import { notFound } from "next/navigation";

import { NavbarDynamic } from "@/components/navbar/NavbarDynamic";
import {
  getClienteRequestServer,
  getVentasHistoricasRequestServer,
} from "@/app/contactos/clientes/[id]/_services/requests";
import { DetailClienteContent } from "@/app/contactos/clientes/[id]/_components/detailClienteContent";

export default async function Page({ params }) {
  // eslint-disable-next-line no-undef
  const results = await Promise.allSettled([
    getClienteRequestServer(params.id),
    getVentasHistoricasRequestServer(params.id),
  ]);
  const { cliente } = results[0].value;
  const { ventasHistoricas } = results[1].value;

  if (!cliente) {
    notFound();
  }

  const navbarTitles = [
    {
      title: "Contactos",
      href: "",
      active: false,
    },
    {
      title: "Clientes",
      href: "/contactos/clientes",
      active: true,
    },
    {
      title: cliente?._id,
      href: "",
      active: false,
    },
  ];

  return (
    <NavbarDynamic titles={navbarTitles}>
      <DetailClienteContent
        clienteData={cliente}
        ventasHistoricasData={ventasHistoricas}
      />
    </NavbarDynamic>
  );
}
