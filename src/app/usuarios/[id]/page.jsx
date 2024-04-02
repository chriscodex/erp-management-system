import { notFound } from 'next/navigation';

import { getUserRequestServer } from '@/app/usuarios/[id]/_services/requests';
import { NavbarDynamic } from '@/components/navbar/NavbarDynamic';
import { FormUserDetail } from '@/app/usuarios/[id]/_components/FormUserDetail';

export default async function Page({ params }) {
  const userId = params.id;
  const { user } = await getUserRequestServer(userId);

  const fullName = user.nombres + ' ' + user.apellidos;

  const titles = [
    {
      title: 'Usuarios',
      href: '/usuarios',
      active: true,
    },
    {
      title: fullName,
      href: '',
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
