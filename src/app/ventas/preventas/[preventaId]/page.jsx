import { notFound } from 'next/navigation';

import { NavbarDynamic } from '@/components/navbar/NavbarDynamic';
import { getPreventaRequestServer } from '@/app/ventas/preventas/_services/requests';
import { DetailPreventaContent } from '@/app/ventas/preventas/[preventaId]/_components/detailPreventaContent';

export default async function Page({ params }) {
  const { preventa } = await getPreventaRequestServer(params.preventaId);

  if (!preventa) {
    notFound();
  }

  const navbarTitles = [
    {
      title: 'Inventario',
      href: '/inventario/todos',
      active: false,
    },
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
      <DetailPreventaContent preventaData={preventa} />
    </NavbarDynamic>
  );
}
