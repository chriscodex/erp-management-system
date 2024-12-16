import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Plus } from 'lucide-react';

import { NavbarDynamic } from '@/components/navbar/NavbarDynamic';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { DataTableProduct } from '@/app/inventario/productos/[id]/_components/ProductTable/data-table';
import { agregarNumeracionTable } from '@/lib/utils';
import GraphicSingleProductCard from '@/app/inventario/productos/[id]/_components/ProductCard/graphic';
import { getAllMotosByModeloIdRequestServer, getModeloByIdRequestServer } from '@/app/inventario/motos/modelos/[modeloId]/_services/requests';
import { ModeloCard } from '@/app/inventario/motos/modelos/[modeloId]/_components/modeloCard/modeloCard';
import { RiMotorbikeFill } from '@remixicon/react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { DataTableModelo } from '@/app/inventario/motos/modelos/[modeloId]/_components/modeloTable/data-table';

export default async function ModelosPage({ params }) {
  const { modelo, status } = await getModeloByIdRequestServer(params.modeloId);
  const { motosByModeloId } = await getAllMotosByModeloIdRequestServer(params.modeloId);

  if (!modelo) {
    notFound();
  }

  const { nombre: modeloName, _id: modeloId } = modelo;

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

  const motosEnumeradas = agregarNumeracionTable(motosByModeloId);

  return (
    <NavbarDynamic titles={navbarTitles}>
      <Card>
        <CardHeader className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 pb-2">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-2 col-span-2">
            <div className="flex items-center gap-2">
              <RiMotorbikeFill className="md:h-9 h-5 md:w-9 w-5" />
              <Label className="sm:text-4xl text-xl font-bold">
                {modeloName}
              </Label>
            </div>
            <Button asChild>
              <Link href={`/inventario/motos/modelos/${modeloId}/nuevo`}>
                <Plus className="h-4 w-4" /> Agregar Unidad
              </Link>
            </Button>
          </div>
          <ModeloCard modelo={modelo} />
          {/* <GraphicSingleProductCard unidades={unidades} /> */}
        </CardHeader>
        <CardContent>
          <DataTableModelo
            productData={modeloName}
            motos={motosEnumeradas}
            status={status}
          />
        </CardContent>
      </Card>
    </NavbarDynamic>
  );
}
