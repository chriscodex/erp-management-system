import { notFound } from "next/navigation";

import { getUserRequestServer } from "@/app/usuarios/[id]/_services/requests";
import { NavbarDynamic } from "@/components/navbar/NavbarDynamic";
import { FormUserDetail } from "@/app/usuarios/[id]/_components/FormUserDetail";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Page({ params }) {
  const session = await getServerSession(authOptions);

  const userId = params.id;
  const { user } = await getUserRequestServer(userId);

  const fullName = user.nombres + " " + user.apellidos;

  if (session?.user?.rol !== "Administrador") {
    notFound();
  }
  
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

  if (!user) {
    notFound();
  }

  return (
    <NavbarDynamic titles={titles}>
      <FormUserDetail userDetail={user} />
    </NavbarDynamic>
  );
}
