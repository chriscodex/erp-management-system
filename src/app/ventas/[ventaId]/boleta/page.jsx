import { notFound } from 'next/navigation';

import { NavbarDynamic } from '@/components/navbar/NavbarDynamic';
import { getVentaRequestServer } from '@/app/ventas/_services/requests';

export default async function Page({ params }) {
  const { preventa } = await getVentaRequestServer(params.preventaId);

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
      title: preventa?.code,
      href: '',
      active: false,
    },
  ];

  return (
    <NavbarDynamic titles={navbarTitles}>
      {/* <DetailVentaContent ventaData={preventa} /> */}
    </NavbarDynamic>
  );
}
