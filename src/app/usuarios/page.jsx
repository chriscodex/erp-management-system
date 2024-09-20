import Link from 'next/link';

import { DataTable } from '@/app/usuarios/_components/UsersTable/data-table';
import { columns } from '@/app/usuarios/_components/UsersTable/columns';
import { NavbarSimple } from '@/components/navbar/NavbarSimple';
import { Button } from '@/components/ui/button';
import { Label } from '@radix-ui/react-label';
import { User2Icon, Plus } from 'lucide-react';

import { getAllUsers } from '@/app/usuarios/_services/apiClient';

export default async function Page() {
  const data = await getAllUsers();

  const dataFormated = data.map((user) => {
    const fullName = {
      fullName: user.nombres + ' ' + user.apellidos,
      ...user,
    };
    delete fullName.apellidos;
    delete fullName.nombres;
    return fullName;
  });

  return (
    <>
      <NavbarSimple title="Usuarios">
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <User2Icon className="h-9 w-9" />
            <Label className="sm:text-4xl text-xl font-bold">Usuarios</Label>
          </div>
          <Link href="/usuarios/nuevo" className="flex justify-end">
            <Button>
              <Plus />
              Agregar Nuevo Usuario
            </Button>
          </Link>
        </div>
        <DataTable columns={columns} data={dataFormated} />
      </NavbarSimple>
    </>
  );
}
