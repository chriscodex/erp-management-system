import { notFound } from 'next/navigation';

import { NavbarDynamic } from '@/components/navbar/NavbarDynamic';

// getCounterBoletaRequestServer
import {getReservacionRequestServer} from '@/app/inventario/motos/reservaciones/_services/requests';
import { DetailReservacionBoletaContent } from '@/app/inventario/motos/reservaciones/[id]/boleta/_components/DetailReservacionBoletaContent';

export default async function Page({ params }) {

  console.log("Show paramsssssssss", params);

  const { reservacion } = await getReservacionRequestServer(params.id);

  console.log("Show ID", params.id);

  if (!reservacion) {
    notFound();
  }

  const navbarTitles = [
    {
      title: 'Inventario',
      href: '',
      active: false,
    },
    {
      title: 'Motos',
      href: '',
      active: false,
    },
    {
      title: 'Reservaciones',
      href: '/inventario/motos/reservaciones',
      active: true,
    },
    {
      title: reservacion?.moto.nombre,
      href: `/inventario/motos/reservaciones/${params.id}`,
      active: true,
    },
    {
      title: 'Boleta',
      href: '',
      active: false,
    },
  ];

  return (
    <NavbarDynamic titles={navbarTitles}>
      <DetailReservacionBoletaContent reservacionData={reservacion} counterBoleta={2000}  />
    </NavbarDynamic>
  );
}
