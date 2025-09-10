import { notFound } from 'next/navigation';

import { NavbarDynamic } from '@/components/navbar/NavbarDynamic';
import { getPreventaRequestServer } from '@/app/ventas/preventas/_services/requests';
import { DetailPreventaContent } from '@/app/ventas/preventas/[preventaId]/_components/detailPreventaContent';
import { getFirstEmpresaForCotizacionRequestServer } from '@/app/ventas/preventas/[preventaId]/_services/requests';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
export default async function Page({ params }) {
  const session = await getServerSession(authOptions);
  if (
    session?.user?.rol !== 'Administrador' &&
    session?.user?.rol !== 'Vendedor'
  ) {
    notFound();
  }
  // eslint-disable-next-line no-undef
  const results = await Promise.allSettled([
    getPreventaRequestServer(params.preventaId),
    getFirstEmpresaForCotizacionRequestServer(),
  ]);

  const { preventa } = results[0].value;
  const { empresa } = results[1].value;

  if (!preventa) {
    notFound();
  }

  const navbarTitles = [
    {
      title: 'Ventas',
      href: '',
      active: false,
    },
    {
      title: 'Preventas',
      href: '/ventas/preventas',
      active: true,
    },
    {
      title: preventa?.code,
      href: '',
      active: false,
    },
  ];

  return (
    <NavbarDynamic titles={navbarTitles}>
      <DetailPreventaContent preventaData={preventa} empresa={empresa} />
    </NavbarDynamic>
  );
}
