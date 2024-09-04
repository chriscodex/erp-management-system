import { RiShieldUserFill, RiArrowRightSLine } from '@remixicon/react';

function UserDetailNavbar({ userDni }) {
  return (
    <ul className="bg-component rounded-md text-neutral-50">
      <li className="flex w-full gap-3 text-xl items-center py-3 px-3">
        <RiShieldUserFill />
        <span>Usuarios</span>
        <RiArrowRightSLine />
        <span>{userDni}</span>
      </li>
    </ul>
  );
}

export { UserDetailNavbar };
