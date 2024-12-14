import { notFound } from 'next/navigation';

import { NavbarDynamic } from '@/components/navbar/NavbarDynamic';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { DataTableProduct } from '@/app/inventario/productos/[id]/_components/ProductTable/data-table';
import { agregarNumeracionTable } from '@/lib/utils';
import GraphicSingleProductCard from '@/app/inventario/productos/[id]/_components/ProductCard/graphic';
import { getModeloByIdRequestServer } from '@/app/inventario/motos/modelos/[modeloId]/_services/requests';
import { ModeloCard } from '@/app/inventario/motos/modelos/[modeloId]/_components/modeloCard/modeloCard';

export default async function Page({ params }) {
  const { modelo, status } = await getModeloByIdRequestServer(params.modeloId);

  if (!modelo) {
    notFound();
  }

  const { nombre: modeloName, unidades } = modelo;

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
      title: 'Modelos',
      href: '/inventario/motos/modelos',
      active: true,
    },
    {
      title: modeloName,
      href: '',
      active: false,
    },
  ];

  // const unidadesEnumeradas = agregarNumeracionTable(unidades);

  return (
    <NavbarDynamic titles={navbarTitles}>
      <Card>
        <CardHeader className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 pb-2">
          <ModeloCard modelo={modelo} />
          {/* <GraphicSingleProductCard unidades={unidades} /> */}
        </CardHeader>
        <CardContent>
          {/* <DataTableProduct
            productData={modeloName}
            unidades={unidadesEnumeradas}
            status={status}
          /> */}
        </CardContent>
      </Card>
    </NavbarDynamic>
  );
}
