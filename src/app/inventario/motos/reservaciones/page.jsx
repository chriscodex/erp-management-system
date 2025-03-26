import { RiCalendarScheduleLine} from '@remixicon/react';
import { Plus } from 'lucide-react';
import Link from 'next/link';

import { sortByUpdateDateDesc } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { NavbarDynamic } from '@/components/navbar/NavbarDynamic';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { columnsReservaciones } from '@/app/inventario/motos/reservaciones/_components/reservacionesTable/columns';
import { DataTableReservaciones } from '@/app/inventario/motos/reservaciones/_components/reservacionesTable/data-table';
import { getAllReservacionesRequestServer } from '@/app/inventario/motos/reservaciones/_services/requests';


export default async function ReservacionesPage() {
  const { reservaciones, status } = await getAllReservacionesRequestServer();

  const reservacionesSorted = sortByUpdateDateDesc(reservaciones);

  const titles = [
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
      title: 'Reservaciones',
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
              <RiCalendarScheduleLine className="h-9 w-9" />
              <Label className="sm:text-4xl text-xl font-bold">
                Reservaciones
              </Label>
            </div>
            <Link href="/inventario/motos/reservaciones/nuevo">
              <Button variant="default">
                <Plus />
                Nueva Reservación
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <DataTableReservaciones
              columns={columnsReservaciones}
              data={reservacionesSorted}
              status={status}
            />
          </CardContent>
        </Card>
      </NavbarDynamic>
    </>
  );
}
