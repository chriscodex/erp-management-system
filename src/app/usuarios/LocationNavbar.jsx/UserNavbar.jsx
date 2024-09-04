import { RiShieldUserFill } from '@remixicon/react';

function UserNavbar() {
  return (
    <ul className='bg-component rounded-md text-neutral-50'>
      <li className='flex w-full gap-3 text-xl items-center py-3 px-3'>
        <RiShieldUserFill />
        <span>Usuarios</span>
      </li>
    </ul>
  );
}

export { UserNavbar };
