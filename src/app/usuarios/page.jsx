import { DataTable } from './data-table';
import { columns } from './columns';

import { UserNavbar } from '@/app/usuarios/Navbar/UserNavbar';

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms)); // eslint-disable-line
}

async function getData() {
  const res = await fetch('https://6718229fb910c6a6e02b2dae.mockapi.io/users', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await res.json();

  // Esperar 3 segundos antes de continuar
  await delay(8000);

  console.log('Usuarios', data);

  return data;
}

async function UsuariosPage() {
  const data = await getData();

  return (
    <>
      <UserNavbar />
      <h1 className="text-3xl text-component font-bold ml-2 my-2">
        Todos los Usuarios
      </h1>
      <DataTable columns={columns} data={data} />
    </>
  );
}

export default UsuariosPage;
