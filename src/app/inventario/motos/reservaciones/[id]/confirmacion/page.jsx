import { notFound } from 'next/navigation';

import { NavbarDynamic } from '@/components/navbar/NavbarDynamic';

// getCounterBoletaRequestServer
import {getReservacionRequestServer} from '@/app/inventario/motos/reservaciones/_services/requests';
import { DetailConfirmacionReservacionContent } from '@/app/inventario/motos/reservaciones/[id]/confirmacion/_components/DetailConfirmacionReservacionContent';

export default async function Page({ params }) {

  const { reservacion } = await getReservacionRequestServer(params.id);

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
      title: 'Confirmación',
      href: '',
      active: false,
    },
  ];

  return (
    <NavbarDynamic titles={navbarTitles}>
      <DetailConfirmacionReservacionContent reservacionData={reservacion}/>
    </NavbarDynamic>
  );
}
