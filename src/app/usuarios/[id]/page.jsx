import { notFound } from "next/navigation";

import { getUserRequestServer } from "@/app/usuarios/[id]/_services/requests";
import { NavbarDynamic } from "@/components/navbar/NavbarDynamic";
import { FormUserDetail } from "@/app/usuarios/[id]/_components/FormUserDetail";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getAllSucursalesRequestServer } from "@/app/usuarios/_services/requests";

export default async function Page({ params }) {
  const session = await getServerSession(authOptions);
  if (session?.user?.rol !== "Administrador") {
    notFound();
  }

  // eslint-disable-next-line no-undef
  const results = await Promise.allSettled([
    getUserRequestServer(params.id),
    getAllSucursalesRequestServer(),
  ]);

  const { user } = results[0].value;
  const { sucursales } = results[1].value ?? [];

  if (!user) {
    notFound();
  }

  const fullName = user.nombres + " " + user.apellidos;

  const titles = [
    {
      title: "Usuarios",
      href: "/usuarios",
      active: true,
    },
    {
      title: fullName,
      href: "",
      active: false,
    },
  ];

  return (
    <NavbarDynamic titles={titles}>
      <FormUserDetail userDetail={user} sucursales={sucursales} />
    </NavbarDynamic>
  );
}
