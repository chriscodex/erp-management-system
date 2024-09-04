import { notFound } from 'next/navigation';

import { UserDetailNavbar } from '@/app/usuarios/Navbar/UserDetailNavbar';

function UserDetail({ params }) {
  if (params.userDetail === '8484') {
    notFound();
  }
  return (
    <>
      <UserDetailNavbar userDni={params.userDetail} />
      <div>userDetail</div>
    </>
  );
}

export default UserDetail;
