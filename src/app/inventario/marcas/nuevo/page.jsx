import { notFound } from 'next/navigation';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { NavbarDynamic } from '@/components/navbar/NavbarDynamic';
import { CreateFormMarca } from '@/app/inventario/marcas/nuevo/_components/createFormMarca';
import { getAllSegmentsRequestServer } from '@/app/inventario/marcas/nuevo/_services/requests';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (session?.user?.rol !== 'Administrador') {
    notFound();
  }
  const { segments } = await getAllSegmentsRequestServer();

  const titles = [
    {
      title: 'Inventario',
      href: '',
      active: false,
    },
    {
      title: 'Marcas',
      href: '/inventario/marcas',
      active: true,
    },
    {
      title: 'Agregar Marca',
      href: '',
      active: false,
    },
  ];
  return (
    <NavbarDynamic titles={titles}>
      <Card className="w-full max-w-7xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Agregar Marca</CardTitle>
        </CardHeader>
        <CardContent>
          <CreateFormMarca segments={segments} />
        </CardContent>
      </Card>
    </NavbarDynamic>
  );
}
