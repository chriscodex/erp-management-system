import { notFound } from 'next/navigation';
import { RiEditFill } from '@remixicon/react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { NavbarDynamic } from '@/components/navbar/NavbarDynamic';

import { getPreventaRequestServer } from '@/app/ventas/preventas/_services/requests';
import { EditarPreventaForm } from '@/app/ventas/preventas/[preventaId]/edit/_components/editarPreventaForm';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function EditarPreventaPage({ params }) {
  const session = await getServerSession(authOptions);
  if (
    session?.user?.rol !== 'Administrador' &&
    session?.user?.rol !== 'Vendedor'
  ) {
    notFound();
  }
  const { preventa } = await getPreventaRequestServer(params.preventaId);

  const titles = [
    {
      title: 'Ventas',
      href: '',
      active: false,
    },
    {
      title: 'Pre-Ventas',
      href: '/ventas/preventas',
      active: true,
    },
    {
      title: preventa?.code,
      href: `/ventas/preventas/${params.preventaId}`,
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
            Editar Pre-Venta
          </CardTitle>
        </CardHeader>
        <CardContent>
          <EditarPreventaForm preventaData={preventa} />
        </CardContent>
      </Card>
    </NavbarDynamic>
  );
}
