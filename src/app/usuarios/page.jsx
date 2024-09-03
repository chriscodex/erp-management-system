import { DataTable } from './data-table';
import { columns } from './columns';

import { UserLocationNavbar } from '@/app/usuarios/LocationNavbar.jsx/UserLocationNavbar';

async function getData() {
  const res = await fetch('https://6718229fb910c6a6e02b2dae.mockapi.io/users', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await res.json();

  console.log('Usuarios', data);

  return data
}

async function UsuariosPage() {
  const data = await getData();

  return (
    <>
      <UserLocationNavbar />
      <h1 className="text-3xl text-component font-bold ml-2 my-2">
        Todos los Usuarios
      </h1>
      <DataTable columns={columns} data={data} />
    </>
  );
}

export default UsuariosPage;
