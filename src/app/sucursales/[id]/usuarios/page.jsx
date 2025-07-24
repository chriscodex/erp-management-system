import { notFound } from "next/navigation";

import { NavbarDynamic } from "@/components/navbar/NavbarDynamic";
import {
  getSucursalRequestServer,
  getUsersPerSucursalRequestServer,
} from "@/app/sucursales/[id]/_services/requests";
import { DetailUsersPerSucursalContent } from "@/app/sucursales/[id]/usuarios/_components/detailUsersPerSucursalContent";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Page({ params }) {
  const session = await getServerSession(authOptions);
  const sucursalId = params.id;

  const { sucursal } = await getSucursalRequestServer(sucursalId);

  const { users } = await getUsersPerSucursalRequestServer(params.id);

  if (session?.user?.rol !== "Administrador") {
    notFound();
  }

  const navbarTitles = [
    {
      title: "Sucursales",
      href: "/sucursales",
      active: true,
    },
    {
      title: sucursal?.nombre,
      href: "/sucursales/" + sucursalId,
      active: true,
    },
    {
      title: "Usuarios",
      href: "",
      active: false,
    },
  ];

  return (
    <NavbarDynamic titles={navbarTitles}>
      <DetailUsersPerSucursalContent
        sucursalData={sucursal}
        usersData={users}
      />
    </NavbarDynamic>
  );
}
