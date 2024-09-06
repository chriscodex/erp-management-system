import { notFound } from 'next/navigation';

import { UserDetailNavbar } from '@/app/usuarios/Navbar/UserDetailNavbar';

function UserDetail({ params }) {
  if (params.userDetail === '8484') {
    notFound();
  }
  return (
    <>
      <UserDetailNavbar userDni={params.userDetail} />
      <div className='mt-2 flex flex-col'>
        <h1></h1>
      </div>
    </>
  );
}

export default UserDetail;
