import { notFound } from 'next/navigation';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getMarcaRequestServer } from '@/app/inventario/marcas/[id]/_services/requests.js';
import { NavbarDynamic } from '@/components/navbar/NavbarDynamic';
import { UpdateFormMarca } from '@/app/inventario/marcas/[id]/edit/_components/updateFormMarca';
import { getAllSegmentsRequestServer } from '@/app/inventario/marcas/nuevo/_services/requests.js';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export const dynamic = 'force-dynamic';

export default async function Page({ params }) {
  const session = await getServerSession(authOptions);
  if (session?.user?.rol !== 'Administrador') {
    notFound();
  }
  // eslint-disable-next-line no-undef
  const results = await Promise.allSettled([
    getMarcaRequestServer(params.id),
    getAllSegmentsRequestServer(),
  ]);

  const { marca } = results[0].value;
  const { segments } = results[1].value;
  const { nombre: marcaName } = marca;

  if (!marca) {
    notFound();
  }

  const titles = [
    {
      title: 'Inventario',
      href: '/inventario/todos',
      active: false,
    },
    {
      title: 'Marcas',
      href: '/inventario/marcas',
      active: true,
    },
    {
      title: marcaName,
      href: `/inventario/marcas/${params.id}`,
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
          <UpdateFormMarca marcaData={marca} segments={segments} />
        </CardContent>
      </Card>
    </NavbarDynamic>
  );
}
