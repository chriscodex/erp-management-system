import { notFound } from 'next/navigation';

import { getSucursalRequestServer } from '@/app/sucursales/[id]/_services/requests.js';
import { NavbarDynamic } from '@/components/navbar/NavbarDynamic';
import DetailContent from '@/app/sucursales/[id]/_components/detailContent';
import { formatDateLong } from '@/lib/formateador';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function Page({ params }) {
  const session = await getServerSession(authOptions);
  if (session?.user?.rol !== 'Administrador') {
    notFound();
  }

  const { sucursal } = await getSucursalRequestServer(params.id);
  const { nombre: sucursalName, updatedAt } = sucursal;

  if (!sucursal) {
    notFound();
  }

  const updatedAtFormated = formatDateLong(updatedAt);

  const navbarTitles = [
    {
      title: 'Sucursales',
      href: '/sucursales',
      active: true,
    },
    {
      title: sucursalName,
      href: '/sucursales',
      active: false,
    },
  ];

  return (
    <NavbarDynamic titles={navbarTitles}>
      <DetailContent sucursalData={sucursal} updatedAt={updatedAtFormated} />
    </NavbarDynamic>
  );
}
