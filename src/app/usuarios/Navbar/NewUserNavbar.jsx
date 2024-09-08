import { RiShieldUserFill, RiArrowRightSLine } from '@remixicon/react';

function NewUserNavbar() {
  return (
    <ul className="bg-component rounded-md text-neutral-50 w-full max-w-7xl mr-auto">
      <li className="flex w-full gap-3 text-xl items-center py-3 px-3">
        <RiShieldUserFill />
        <span>Usuarios</span>
        <RiArrowRightSLine />
        <span>Nuevo Usuario</span>
      </li>
    </ul>
  );
}

export { NewUserNavbar };
