import { notFound } from 'next/navigation';
import { Label } from '@radix-ui/react-label';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { NavbarSimple } from '@/components/navbar/NavbarSimple';
import { agregarNumeracionTable, sortByUpdateDateDesc } from '@/lib/utils';
import { columnsGastosGenerales } from '@/app/gastos-generales/_components/gastosGeneralesTable/columns';
import { DataTableGastosGenerales } from '@/app/gastos-generales/_components/gastosGeneralesTable/data-table';
import { getAllGastosGeneralesRequestServer } from '@/app/gastos-generales/_services/requests';
import { RiWallet2Fill } from '@remixicon/react';
import { SheetCreateGastoGeneralWrapper } from '@/app/gastos-generales/_components/sheets/createGastoGeneral/sheetCreateGastoGeneralWrapper';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (session?.user?.rol !== 'Administrador') {
    notFound();
  }

  const { gastosGenerales, status } =
    await getAllGastosGeneralesRequestServer();

  const gastosGeneralesSorted = sortByUpdateDateDesc(gastosGenerales);

  const gastosGeneralesEnumerados = agregarNumeracionTable(
    gastosGeneralesSorted,
  );

  return (
    <>
      <NavbarSimple title="Gastos Generales">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="w-full flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center gap-2">
                <RiWallet2Fill className="h-9 w-9" />
                <Label className="sm:text-4xl text-xl font-bold">
                  Gastos Generales
                </Label>
              </div>
              <SheetCreateGastoGeneralWrapper />
            </div>
          </CardHeader>
          <CardContent>
            <DataTableGastosGenerales
              columns={columnsGastosGenerales}
              data={gastosGeneralesEnumerados}
              status={status}
            />
          </CardContent>
        </Card>
      </NavbarSimple>
    </>
  );
}
