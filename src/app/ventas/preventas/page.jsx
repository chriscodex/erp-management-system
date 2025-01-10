import { RiShoppingBag3Line } from '@remixicon/react';
import { Plus } from 'lucide-react';
import Link from 'next/link';

import { sortByUpdateDateDesc } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { NavbarDynamic } from '@/components/navbar/NavbarDynamic';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { DataTablePreventas } from '@/app/ventas/preventas/_components/preventasTable/data-table';
import { getAllPreventasRequestServer } from '@/app/ventas/preventas/_services/requests';
import { columnsPreventas } from '@/app/ventas/preventas/_components/preventasTable/columns';

export default async function PreventasPage() {
  const { preventas, status } = await getAllPreventasRequestServer();

  const preventasSorted = sortByUpdateDateDesc(preventas);

  console.log(preventasSorted);

  const titles = [
    {
      title: 'Inventario',
      href: '',
      active: false,
    },
    {
      title: 'Pre-Ventas',
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
              <Label className="sm:text-4xl text-xl font-bold">
                Pre-Ventas
              </Label>
            </div>
            <Link href="/ventas/preventas/registrar">
              <Button variant="default">
                <Plus />
                Registrar Pre-Venta
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <DataTablePreventas
              columns={columnsPreventas}
              data={preventasSorted}
              status={status}
            />
          </CardContent>
        </Card>
      </NavbarDynamic>
    </>
  );
}
