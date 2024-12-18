import { RiAppsLine } from '@remixicon/react';

import { sortByUpdateDateDesc } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { NavbarDynamic } from '@/components/navbar/NavbarDynamic';
import { DataTableCategory } from '@/app/inventario/categorias/_components/categoriesTable/data-table';
import {
  getAllCategoriesRequestServer,
  getAllSegmentsRequestServer,
} from '@/app/inventario/categorias/_services/requests';
import { SheetAddCategoryWrapper } from '@/app/inventario/categorias/_components/sheets/addCategory/sheetAddWrapper';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default async function CategoriasPage() {
  const titles = [
    {
      title: 'Inventario',
      href: '',
      active: false,
    },
    {
      title: 'Categorías',
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
              <RiAppsLine className="h-9 w-9" />
              <Label className="sm:text-4xl text-xl font-bold">
                Categorías
              </Label>
            </div>
            <SheetAddCategoryWrapper segments={segments} />
          </CardHeader>
          <CardContent>
            <DataTableCategory
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
