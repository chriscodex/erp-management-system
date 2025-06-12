import { RiMotorbikeFill } from '@remixicon/react';

import { Label } from '@/components/ui/label';
import { NavbarDynamic } from '@/components/navbar/NavbarDynamic';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { sortByUpdateDateDesc } from '@/lib/utils';
import { getAllMotosRequestServer } from '@/app/inventario/motos/todas/_services/requests';
import { TodasMotosTable } from '@/app/inventario/motos/todas/_components/todasMotosTable/data-table';
import { columnsTodasMotos } from '@/app/inventario/motos/todas/_components/todasMotosTable/columns';

export default async function MotosTodasPage() {
  const { motos } = await getAllMotosRequestServer();

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
      title: 'Todas',
      href: '',
      active: false,
    },
  ];

  const motosSorted = sortByUpdateDateDesc(motos);

  return (
    <>
      <NavbarDynamic titles={titles}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 gap-2">
            <div className="flex items-center gap-2">
              <RiMotorbikeFill className="md:h-9 h-5 md:w-9 w-5" />
              <Label className="sm:text-4xl text-xl font-bold">
                Todas las Motos
              </Label>
            </div>
          </CardHeader>
          <CardContent>
            <TodasMotosTable columns={columnsTodasMotos} data={motosSorted} />
          </CardContent>
        </Card>
      </NavbarDynamic>
    </>
  );
}
