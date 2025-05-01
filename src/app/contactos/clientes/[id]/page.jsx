import { notFound } from 'next/navigation';

import { NavbarDynamic } from '@/components/navbar/NavbarDynamic';
import { getClienteRequestServer, getVentasHistoricasRequestServer } from '@/app/contactos/clientes/[id]/_services/requests';
import { DetailClienteContent } from '@/app/contactos/clientes/[id]/components/detailClienteContent';

export default async function Page({ params }) {
    
  const  {cliente}  = await getClienteRequestServer(params.id);

  const {ventasHistoricas} = await getVentasHistoricasRequestServer(params.id);

  if (!cliente) {
    notFound();
  }

  const navbarTitles = [
    {
      title: 'Contactos',
      href: '',
      active: false,
    },
    {
      title: 'Clientes',
      href: '/contactos/clientes',
      active: true,
    },
    {
      title: cliente?._id,
      href: '',
      active: false,
    },
  ];

  return (
    <NavbarDynamic titles={navbarTitles}>
      <DetailClienteContent clienteData={cliente} ventasHistoricasData={ventasHistoricas} />
    </NavbarDynamic>
  );
}
