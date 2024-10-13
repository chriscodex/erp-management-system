import { Plus } from 'lucide-react';
import { RiAppsLine } from '@remixicon/react';

import { Label } from '@/components/ui/label';
import { NavbarDynamic } from '@/components/navbar/NavbarDynamic';
import { sortByCreationDateDesc } from '@/lib/utils';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';

import { DataTableCategory } from '@/app/inventario/categorias/_components/categoriesTable/data-table';
import { columnsCategory } from '@/app/inventario/categorias/_components/categoriesTable/columns';
import {
  getAllCategories,
  getAllSegments,
} from '@/app/inventario/categorias/_services/requests';
import { AddCategory } from './_components/sheets/add-category';

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
          <Sheet>
            <SheetTrigger className="text-start cursor-pointer">
              <div className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">
                <Plus />
                Agregar Nueva Categoría
              </div>
            </SheetTrigger>
            <AddCategory segments={segments} />
          </Sheet>
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
