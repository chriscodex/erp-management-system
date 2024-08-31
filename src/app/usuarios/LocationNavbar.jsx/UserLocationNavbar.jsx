import { RiShieldUserFill } from '@remixicon/react';

function UserLocationNavbar() {
  return (
    <ul className='bg-component rounded-md mb-2'>
      <li className='flex w-full gap-3 text-xl items-center py-3 px-3'>
        <RiShieldUserFill />
        <span>Usuarios</span>
      </li>
    </ul>
  );
}

export { UserLocationNavbar };
