import { Plus } from 'lucide-react';
import Link from 'next/link';
import { RiAppsLine } from '@remixicon/react';

import { Label } from '@/components/ui/label';
import { NavbarDynamic } from '@/components/navbar/NavbarDynamic';
import { Button } from '@/components/ui/button';
import { sortByCreationDateDesc } from '@/lib/utils';

import { DataTableCategory } from '@/app/inventario/categorias/_components/categoriesTable/data-table';
import { columnsCategory } from '@/app/inventario/categorias/_components/categoriesTable/columns';
import { getAllCategories } from '@/app/inventario/categorias/_services/requests';

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
          <Link href="/usuarios/nuevo" className="flex justify-end">
            <Button>
              <Plus />
              Agregar Nueva Categoría
            </Button>
          </Link>
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
