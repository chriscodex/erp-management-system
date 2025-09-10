import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Label } from '@radix-ui/react-label';
import { Plus } from 'lucide-react';
import { RiBuilding4Line } from '@remixicon/react';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { columns } from '@/app/sucursales/_components/sucursalesTable/columns';
import { NavbarSimple } from '@/components/navbar/NavbarSimple';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/app/sucursales/_components/sucursalesTable/data-table';
import { sortByUpdateDateDesc } from '@/lib/utils';
import { getAllSucursalesRequestServer } from '@/app/sucursales/_services/requests';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (session?.user?.rol !== 'Administrador') {
    notFound();
  }
  const { sucursales, status } = await getAllSucursalesRequestServer();
  const sucursalesSorted = sortByUpdateDateDesc(sucursales);

  return (
    <>
      <NavbarSimple title="Sucursales">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="flex items-center gap-2">
              <RiBuilding4Line className="h-9 w-9" />
              <Label className="sm:text-4xl text-xl font-bold">
                Sucursales
              </Label>
            </div>
            <Link href="/sucursales/nuevo" className="flex justify-end">
              <Button>
                <Plus />
                Agregar Sucursal
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={columns}
              data={sucursalesSorted}
              status={status}
            />
          </CardContent>
        </Card>
      </NavbarSimple>
    </>
  );
}
