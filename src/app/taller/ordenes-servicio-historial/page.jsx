import { notFound } from 'next/navigation';
import { RiFolderHistoryLine } from '@remixicon/react';

import { sortByUpdateDateDesc } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { NavbarDynamic } from '@/components/navbar/NavbarDynamic';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

import { columnsOrdenesDeServicioHistoricas } from '@/app/taller/ordenes-servicio-historial/_components/ordenesDeServicioHistoricasTable/columns';
import { DataTableOrdenesDeServicioHistoricas } from '@/app/taller/ordenes-servicio-historial/_components/ordenesDeServicioHistoricasTable/data-table';
import { getAllOrdenesDeServicioHistoricasRequestServer } from '@/app/taller/ordenes-servicio-historial/_services/requests';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function OrdenesDeServicioHistoricasPage() {
  const session = await getServerSession(authOptions);
  if (
    session?.user?.rol !== 'Administrador' &&
    session?.user?.rol !== 'Tecnico'
  ) {
    notFound();
  }
  const { ordenesDeServicioHistoricas, status } =
    await getAllOrdenesDeServicioHistoricasRequestServer();

  const ordenesDeServicioHistoricasSorted = sortByUpdateDateDesc(
    ordenesDeServicioHistoricas,
  );

  const titles = [
    {
      title: 'Taller',
      href: '',
      active: false,
    },
    {
      title: 'Historial de Órdenes de Servicio',
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
                Historial de Órdenes de Servicio
              </Label>
            </div>
          </CardHeader>
          <CardContent>
            <DataTableOrdenesDeServicioHistoricas
              columns={columnsOrdenesDeServicioHistoricas}
              data={ordenesDeServicioHistoricasSorted}
              status={status}
            />
          </CardContent>
        </Card>
      </NavbarDynamic>
    </>
  );
}
