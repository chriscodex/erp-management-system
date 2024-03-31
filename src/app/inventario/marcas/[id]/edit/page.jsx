import { notFound } from 'next/navigation';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getMarcaRequestServer } from '@/app/inventario/marcas/[id]/_services/requests.js';
import { NavbarDynamic } from '@/components/navbar/NavbarDynamic';
import { UpdateFormMarca } from '@/app/inventario/marcas/[id]/edit/_components/updateFormMarca';
import { getAllSegmentsRequestServer } from '@/app/inventario/marcas/nuevo/_services/requests.js';

export const dynamic = 'force-dynamic';

export default async function Page({ params }) {
  const { marca } = await getMarcaRequestServer(params.id);
  const { segments } = await getAllSegmentsRequestServer();

  if (!marca) {
    notFound();
  }

  const { nombre: marcaName } = marca;

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
      <div className="container mx-auto p-4">
        <Card className="w-full max-w-7xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Editar</CardTitle>
          </CardHeader>
          <CardContent>
            <UpdateFormMarca marcaData={marca} segments={segments} />
          </CardContent>
        </Card>
      </div>
    </NavbarDynamic>
  );
}
