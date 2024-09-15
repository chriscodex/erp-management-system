import Link from 'next/link';

import { DataTable } from '@/app/usuarios/UsersTable/data-table';
import { columns } from '@/app/usuarios/UsersTable/columns';
import { NavbarSimple } from '@/components/navbar/NavbarSimple';
import { Button } from '@/components/ui/button';

import { getAllUsers } from '@/app/usuarios/Infraestructura/apiClient';

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
        <Link href="/usuarios/nuevo" className="flex justify-end">
          <Button>Agregar Nuevo Usuario</Button>
        </Link>
        <DataTable columns={columns} data={dataFormated} />
      </NavbarSimple>
    </>
  );
}
