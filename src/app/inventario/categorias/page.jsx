import { RiAppsLine } from '@remixicon/react';

import { sortByCreationDateDesc } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { NavbarDynamic } from '@/components/navbar/NavbarDynamic';
import { DataTableCategory } from '@/app/inventario/categorias/_components/categoriesTable/data-table';
import { columnsCategory } from '@/app/inventario/categorias/_components/categoriesTable/columns';
import {
  getAllCategories,
  getAllSegments,
} from '@/app/inventario/categorias/_services/requests';
import { SheetWrapper } from '@/app/inventario/categorias/_components/sheets/sheetWrapper';

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
  const { segments } = await getAllSegments();

  const categoriesSorted = sortByCreationDateDesc(categories);

  return (
    <>
      <NavbarDynamic titles={titles}>
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <RiAppsLine className="h-9 w-9" />
            <Label className="sm:text-4xl text-xl font-bold">Categorías</Label>
          </div>
          <SheetWrapper segments={segments} />
        </div>
        <DataTableCategory
          columns={columnsCategory}
          data={categoriesSorted}
          status={status}
        />
      </NavbarDynamic>
    </>
  );
}
