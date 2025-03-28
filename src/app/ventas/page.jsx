import { RiShoppingBag3Line } from '@remixicon/react';

import { sortByUpdateDateDesc } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { NavbarDynamic } from '@/components/navbar/NavbarDynamic';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

import { getAllVentasRequestServer } from '@/app/ventas/_services/requests';
import { DataTableVentas } from '@/app/ventas/_components/ventasTable/data-table';
import { columnsVentas } from '@/app/ventas/_components/ventasTable/columns';

export default async function VentasPage() {
  const { ventas, status } = await getAllVentasRequestServer();

  const ventasSorted = sortByUpdateDateDesc(ventas);

  console.log('ventas', ventasSorted);

  const titles = [
    {
      title: 'Ventas',
      href: '',
      active: false,
    },
  ];

  return (
    <>
      <NavbarDynamic titles={titles}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="flex items-center gap-2">
              <RiShoppingBag3Line className="h-9 w-9" />
              <Label className="sm:text-4xl text-xl font-bold">Ventas</Label>
            </div>
          </CardHeader>
          <CardContent>
            <DataTableVentas
              columns={columnsVentas}
              data={ventasSorted}
              status={status}
            />
          </CardContent>
        </Card>
      </NavbarDynamic>
    </>
  );
}
