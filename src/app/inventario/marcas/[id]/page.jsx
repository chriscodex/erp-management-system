import { notFound } from "next/navigation";

import { getMarcaRequestServer } from "@/app/inventario/marcas/[id]/_services/requests.js";
import { NavbarDynamic } from "@/components/navbar/NavbarDynamic";
import DetailContent from "@/app/inventario/marcas/[id]/_components/detailContent";
import { formatDateLong } from "@/lib/formateador";

export default async function Page({ params }) {
  const { marca } = await getMarcaRequestServer(params.id);
  const { nombre: marcaName, updatedAt } = marca;

  if (!marca) {
    notFound();
  }

  const updatedAtFormated = formatDateLong(updatedAt);

  const navbarTitles = [
    {
      title: "Inventario",
      href: "/inventario/todos",
      active: false,
    },
    {
      title: "Marcas",
      href: "/inventario/marcas",
      active: true,
    },
    {
      title: marcaName,
      href: "/inventario/marcas",
      active: false,
    },
  ];

  return (
    <NavbarDynamic titles={navbarTitles}>
      <DetailContent marcaData={marca} updatedAt={updatedAtFormated} />
    </NavbarDynamic>
  );
}
