import { DataTable } from '@/app/usuarios/UsersTable/data-table';
import { columns } from '@/app/usuarios/UsersTable//columns';

import { UserNavbar } from '@/app/usuarios/Navbar/UserNavbar';
import { Button } from '@/components/ui/button';

import { getAllUsers } from './Infraestructura/apiClient';

async function UsuariosPage() {
  const data = await getAllUsers();

  return (
    <>
      <UserNavbar />
      <div className="flex justify-between ml-2 my-2">
        <h1 className="text-3xl text-component font-bold">
          Todos los Usuarios
        </h1>
        <Button>Agregar Usuario</Button>
      </div>
      <div className='w-full max-w-3xl mx-auto'>
        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
}

export default UsuariosPage;
