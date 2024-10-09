import { Plus } from 'lucide-react';
import Link from 'next/link';
import { RiAppsLine } from '@remixicon/react';

import { Label } from '@/components/ui/label';
import { NavbarDynamic } from '@/components/navbar/NavbarDynamic';
import { Button } from '@/components/ui/button';
import { sortByCreationDateDesc } from '@/lib/utils';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';

import { DataTableCategory } from '@/app/inventario/categorias/_components/categoriesTable/data-table';
import { columnsCategory } from '@/app/inventario/categorias/_components/categoriesTable/columns';
import { getAllCategories } from '@/app/inventario/categorias/_services/requests';
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

  const categoriesSorted = sortByCreationDateDesc(categories);

  return (
    <>
      <NavbarDynamic titles={titles}>
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <RiAppsLine className="h-9 w-9" />
            <Label className="sm:text-4xl text-xl font-bold">Categorías</Label>
          </div>
          <Sheet className="">
            <SheetTrigger className="text-start cursor-pointer">
              <Button>
                <Plus />
                Agregar Nueva Categoría
              </Button>
            </SheetTrigger>
            <AddCategory categoryData={[]} />
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
