import { NavbarDynamic } from '@/components/navbar/NavbarDynamic';

import { FormNewUser } from '@/app/usuarios/nuevo/_components/FormNewUser';

export default function Page() {
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
