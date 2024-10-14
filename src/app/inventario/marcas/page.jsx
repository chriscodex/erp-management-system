import { Plus, User2Icon } from 'lucide-react';
import Link from 'next/link';

import { Label } from '@/components/ui/label';
import { NavbarDynamic } from '@/components/navbar/NavbarDynamic';
import { Button } from '@/components/ui/button';

import { DataTableMarcas } from '@/app/inventario/marcas/_components/MarcasTable/data-table.jsx';
import { columnsMarcas } from '@/app/inventario/marcas/_components/MarcasTable/columns.jsx';

import { sortByCreationDateDesc } from '@/lib/utils';

import { getAllUsers } from '@/app/usuarios/_services/requests';

export default async function MarcasPage() {
  const { users, status } = await getAllUsers();

  const usersSorted = sortByCreationDateDesc(users);

  /* Secciones del navbar */
  const navbarTitles = [
    {
      title: 'Inventario',
      href: '/inventario/todos',
      active: false,
    },
    {
      title: 'Marcas',
      href: '/inventario/productos/todos',
      active: false,
    },
  ];

  return (
    <>
      <NavbarDynamic titles={navbarTitles}>
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <User2Icon className="h-9 w-9" />
            <Label className="sm:text-4xl text-xl font-bold">Marcas</Label>
          </div>
          <Link href="/usuarios/nuevo" className="flex justify-end">
            <Button>
              <Plus />
              Agregar Nueva Marca
            </Button>
          </Link>
        </div>
        <DataTableMarcas
          columns={columnsMarcas}
          data={usersSorted}
          status={status}
        />
      </NavbarDynamic>
    </>
  );
}
