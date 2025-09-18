import { notFound } from 'next/navigation';

import { NavbarDynamic } from '@/components/navbar/NavbarDynamic';
import {
  getUserRequestServer,
  getVentasHistoricasRequestServer,
} from '@/app/usuarios/[id]/_services/requests';
import { DetailSellsPerUserContent } from '@/app/usuarios/[id]/ventas/_components/detailSellsPerUserContent';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function Page({ params }) {
  const userId = params.id;
  const session = await getServerSession(authOptions);

  if (session?.user?.rol !== 'Administrador') {
    notFound();
  }
  // eslint-disable-next-line no-undef
  const results = await Promise.allSettled([
    getUserRequestServer(userId),
    getVentasHistoricasRequestServer(userId),
  ]);

  const { user } = results[0].value;
  const { ventasHistoricas } = results[1].value ?? [];

  const fullName = user.nombres + ' ' + user.apellidos;

  const navbarTitles = [
    {
      title: 'Usuarios',
      href: '/usuarios',
      active: true,
    },
    {
      title: fullName,
      href: '/usuarios/' + userId,
      active: true,
    },
    {
      title: 'Ventas',
      href: '',
      active: false,
    },
  ];

  return (
    <NavbarDynamic titles={navbarTitles}>
      <DetailSellsPerUserContent
        userData={user}
        ventasHistoricasData={ventasHistoricas}
      />
    </NavbarDynamic>
  );
}
