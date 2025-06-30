import { notFound } from 'next/navigation';
import { NavbarDynamic } from '@/components/navbar/NavbarDynamic';

import { FormNewUser } from '@/app/usuarios/nuevo/_components/FormNewUser';

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Page() {
  
  const session = await getServerSession(authOptions);

  if (session?.user?.rol !== "Administrador") {
      notFound();
    }
  /* Secciones del navbar */
  const navbarTitles = [
    {
      title: 'Usuarios',
      href: '/usuarios',
      active: true,
    },
    {
      title: 'Nuevo Usuario',
      href: '',
      active: false,
    },
  ];

  return (
    <>
      <NavbarDynamic titles={navbarTitles}>
        <FormNewUser />
      </NavbarDynamic>
    </>
  );
}
