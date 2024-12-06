import { notFound } from 'next/navigation';
import { RiAuctionFill } from '@remixicon/react';

import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { getProductByIdRequestServer } from '@/app/inventario/productos/[id]/_services/requests';
import { NavbarDynamic } from '@/components/navbar/NavbarDynamic';
import { DataTableGastos } from '@/app/inventario/productos/[id]/gastos/_components/gastosTable/data-table';
import { sortByUpdateDateDesc } from '@/lib/utils';
import { SheetAddGastoWrapper } from '@/app/inventario/productos/[id]/gastos/_components/sheets/addGasto/sheetAddGastoWrapper';

export default async function ProductGastoPage({ params }) {
  const { product, status } = await getProductByIdRequestServer(params.id);

  if (!product) {
    notFound();
  }

  const { gastos, nombre } = product;

  /* Secciones del navbar */
  const navbarTitles = [
    {
      title: 'Inventario',
      href: '',
      active: false,
    },
    {
      title: 'Productos',
      href: '/inventario/productos',
      active: true,
    },
    {
      title: nombre,
      href: `/inventario/productos/${params.id}`,
      active: true,
    },
    {
      title: 'Gastos',
      href: '',
      active: false,
    },
  ];
  const gastosSorted = sortByUpdateDateDesc(gastos);
  return (
    <NavbarDynamic titles={navbarTitles}>
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex items-center gap-2">
            <RiAuctionFill className="h-9 w-9" />
            <Label className="sm:text-4xl text-xl font-bold">Gastos</Label>
          </div>
          <SheetAddGastoWrapper productId={params.id} />
        </CardHeader>
        <CardContent>
          <DataTableGastos data={gastosSorted} status={status} />
        </CardContent>
      </Card>
    </NavbarDynamic>
  );
}
