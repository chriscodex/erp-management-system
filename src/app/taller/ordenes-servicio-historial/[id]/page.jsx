import { notFound } from 'next/navigation';

import { NavbarDynamic } from '@/components/navbar/NavbarDynamic';
import { getOrdenDeServicioHistoricaRequestServer } from '@/app/taller/ordenes-servicio-historial/_services/requests';
import { DetailOrdenDeServicioHistoricaContent } from '@/app/taller/ordenes-servicio-historial/[id]/_components/detailOrdenDeServicioHistoricaContent';

export default async function Page({ params }) {

  const { ordenDeServicioHistorica } = await getOrdenDeServicioHistoricaRequestServer(params.id);

  if (!ordenDeServicioHistorica) {
    notFound();
  }

  const navbarTitles = [
    {
      title: 'Taller',
      href: '',
      active: false,
    },
    {
      title: 'Historial de Órdenes de Servicio',
      href: '/taller/ordenes-servicio-historial',
      active: true,
    },
    {
      title: ordenDeServicioHistorica?.code,
      href: '',
      active: false,
    },
  ];

  return (
    <NavbarDynamic titles={navbarTitles}>
      <DetailOrdenDeServicioHistoricaContent ordenDeServicioHistoricaData={ordenDeServicioHistorica} />
    </NavbarDynamic>
  );
}