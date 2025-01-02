import { RiShoppingBag3Line } from '@remixicon/react';

import { sortByUpdateDateDesc } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { NavbarDynamic } from '@/components/navbar/NavbarDynamic';
import {
  getAllCategoriesRequestServer,
  getAllSegmentsRequestServer,
} from '@/app/inventario/categorias/_services/requests';
import { SheetAddCategoryWrapper } from '@/app/inventario/categorias/_components/sheets/addCategory/sheetAddWrapper';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { DataTablePreventas } from '@/app/ventas/preventas/_components/preventasTable/data-table';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export default async function PreventasPage() {
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

  // eslint-disable-next-line no-undef
  const [categoriesResponse, segmentsResponse] = await Promise.all([
    getAllCategoriesRequestServer(),
    getAllSegmentsRequestServer(),
  ]);

  const { categories, status } = categoriesResponse;

  const { segments } = segmentsResponse;

  const categoriesSorted = sortByUpdateDateDesc(categories);

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
              data={categoriesSorted}
              segments={segments}
              status={status}
            />
          </CardContent>
        </Card>
      </NavbarDynamic>
    </>
  );
}
