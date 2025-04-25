import { RiFolderHistoryLine} from '@remixicon/react';

import { sortByUpdateDateDesc } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { NavbarDynamic } from '@/components/navbar/NavbarDynamic';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

import { DataTableVentasHistoricas } from '@/app/ventas/ventas-historicas/_components/ventasHistoricasTable/data-table';
import { getAllVentasHistoricasRequestServer } from '@/app/ventas/ventas-historicas/_services/requests';
import { columnsVentasHistoricas } from '@/app/ventas/ventas-historicas/_components/ventasHistoricasTable/columns';

export default async function PreventasPage() {

  const { ventasHistoricas, status } = await getAllVentasHistoricasRequestServer();

  const ventasHistoricasSorted = sortByUpdateDateDesc(ventasHistoricas);

  const titles = [
    {
      title: 'Ventas',
      href: '',
      active: false,
    },
    {
      title: 'Historial de Ventas',
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
              <RiFolderHistoryLine className="h-9 w-9" />
              <Label className="sm:text-4xl text-xl font-bold">
                Historial de Ventas
              </Label>
            </div>
          </CardHeader>
          <CardContent>
            <DataTableVentasHistoricas
              columns={columnsVentasHistoricas}
              data={ventasHistoricasSorted}
              status={status}
            />
          </CardContent>
        </Card>
      </NavbarDynamic>
    </>
  );
}
