import { notFound } from 'next/navigation';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getSucursalRequestServer } from '@/app/sucursales/[id]/_services/requests.js';
import { NavbarDynamic } from '@/components/navbar/NavbarDynamic';
import { UpdateFormSucursal } from '@/app/sucursales/[id]/edit/_components/updateFormSucursal';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export const dynamic = 'force-dynamic';

export default async function Page({ params }) {
  const session = await getServerSession(authOptions);
  if (session?.user?.rol !== 'Administrador') {
    notFound();
  }
  const { sucursal } = await getSucursalRequestServer(params.id);
  const { nombre: sucursalName } = sucursal;

  if (!sucursal) {
    notFound();
  }

  const titles = [
    {
      title: 'Sucursales',
      href: '/sucursales',
      active: true,
    },
    {
      title: sucursalName,
      href: `/sucursales/${params.id}`,
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
          <CardTitle className="text-3xl font-bold">Editar</CardTitle>
        </CardHeader>
        <CardContent>
          <UpdateFormSucursal sucursalData={sucursal} />
        </CardContent>
      </Card>
    </NavbarDynamic>
  );
}
