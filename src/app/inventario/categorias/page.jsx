import { RiAppsLine } from '@remixicon/react';

import { sortByCreationDateDesc } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { NavbarDynamic } from '@/components/navbar/NavbarDynamic';
import { DataTableCategory } from '@/app/inventario/categorias/_components/categoriesTable/data-table';
import {
  getAllCategories,
  getAllSegmentsRequest,
} from '@/app/inventario/categorias/_services/requests';
import { SheetAddWrapper } from '@/app/inventario/categorias/_components/sheets/addCategory/sheetAddWrapper';

export default async function CategoriasPage() {
  const titles = [
    {
      title: 'Inventario',
      href: '/inventario/todos',
      active: false,
    },
    {
      title: 'Categorías',
      href: '/inventario/categorias',
      active: false,
    },
  ];

  const { categories, status } = await getAllCategories();
  const { segments } = await getAllSegmentsRequest();

  const categoriesSorted = sortByCreationDateDesc(categories);

  return (
    <>
      <NavbarDynamic titles={titles}>
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <RiAppsLine className="h-9 w-9" />
            <Label className="sm:text-4xl text-xl font-bold">Categorías</Label>
          </div>
          <SheetAddWrapper segments={segments} />
        </div>
        <DataTableCategory
          data={categoriesSorted}
          segments={segments}
          status={status}
        />
      </NavbarDynamic>
    </>
  );
}
