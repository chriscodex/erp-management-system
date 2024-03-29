import { Plus } from 'lucide-react';
import Link from 'next/link';
import { RiInstanceFill } from '@remixicon/react';

import { Label } from '@/components/ui/label';
import { NavbarDynamic } from '@/components/navbar/NavbarDynamic';
import { Button } from '@/components/ui/button';
import { DataTableMarcas } from '@/app/inventario/marcas/_components/MarcasTable/data-table.jsx';
import { columnsMarcas } from '@/app/inventario/marcas/_components/MarcasTable/columns.jsx';
import { sortByUpdateDateDesc } from '@/lib/utils';
import { getAllMarcasRequestServer } from '@/app/inventario/marcas/_services/requests';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default async function MarcasPage() {
  const { marcas, status } = await getAllMarcasRequestServer();

  const marcasSorted = sortByUpdateDateDesc(marcas);

  /* Secciones del navbar */
  const navbarTitles = [
    {
      title: 'Inventario',
      href: '',
      active: false,
    },
    {
      title: 'Marcas',
      href: '',
      active: false,
    },
  ];

  return (
    <>
      <NavbarDynamic titles={navbarTitles}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="flex items-center gap-2">
              <RiInstanceFill className="h-9 w-9" />
              <Label className="sm:text-4xl text-xl font-bold">Marcas</Label>
            </div>
            <Button>
              <Link
                href="/inventario/marcas/nuevo"
                className="flex justify-end"
              >
                <Plus />
                Agregar Marca
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <DataTableMarcas
              columns={columnsMarcas}
              data={marcasSorted}
              status={status}
            />
          </CardContent>
        </Card>
      </NavbarDynamic>
    </>
  );
}
