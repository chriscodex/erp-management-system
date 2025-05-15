import { RiEditFill } from '@remixicon/react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { NavbarDynamic } from '@/components/navbar/NavbarDynamic';

import { getOrdenDeServicioRequestServer } from '@/app/taller/ordenes-servicio/_services/requests';

import { EditarOrdenDeServicioForm } from '@/app/taller/ordenes-servicio/[id]/edit/_components/editarOrdenDeServicioForm';

export default async function EditarOrdenDeServicioPage({ params }) {

  const { ordenDeServicio } = await getOrdenDeServicioRequestServer(params.id);

  const titles = [
    {
      title: 'Taller',
      href: '',
      active: false,
    },
    {
      title: 'Órdenes de Servicio',
      href: '/taller/ordenes-servicio',
      active: true,
    },
    {
      title: ordenDeServicio?.code,
      href: `/taller/ordenes-servicio/${params.id}`,
      active: true,
    },
    {
      title: 'Editar',
      href: '',
      active: false,
    },
  ];
  return (
    <NavbarDynamic titles={titles}>
      <Card className="w-full max-w-7xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <RiEditFill className="md:h-7 h-5 md:w-7 w-5" />
            Editar Orden de Servicio
          </CardTitle>
        </CardHeader>
        <CardContent>
          <EditarOrdenDeServicioForm ordenDeServicioData={ordenDeServicio} />
        </CardContent>
      </Card>
    </NavbarDynamic>
  );
}
