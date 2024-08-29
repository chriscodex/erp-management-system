'use client';
import { useSession } from 'next-auth/react';

import { RiHome2Line, RiExpandUpDownLine } from '@remixicon/react';

import { FormateadorNombresApellidos } from '@/utils/formateador';

function Sidebar() {
  const { data: session, status } = useSession();

  const user = FormateadorNombresApellidos(
    session?.user?.nombres,
    session?.user?.apellidos
  );

  const rol = session?.user?.rol;

  const menuItems = [
    {
      icon: <RiHome2Line />,
      label: 'Inicio',
    },
  ];

  return (
    <section className="w-[400px] bg-rose-700 h-screen flex flex-col">
      <div>
        <p className="text-sm font-bold opacity-80 pl-4 pt-4 pb-4">MENU</p>
        <ul>
          {menuItems.map((item) => (
            <li key={item.label} className="flex gap-2 text-xl pl-4">
              {item.icon}
              <p>{item.label}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full mt-auto">
        {/* {status === 'authenticated' ? (
          <div className="flex justify-center items-center gap-4 border-t py-4">
            <img
              src="/fb.jpg"
              alt="user-profile"
              className="rounded-full w-[50px]"
            />
            <ul className="flex flex-col justify-center items-start">
              <li className='font-bold'>{user}</li>
              <li className='opacity-80'>{rol}</li>
            </ul>
            <RiExpandUpDownLine className=''/>
          </div>
        ) : (
          <p className="text-sm font-bold opacity-80 pl-4 pt-4 pb-4">
            Cargando ...{' '}
          </p>
        )} */}
        <div className="flex justify-center items-center gap-4 border-t py-4 px-4">
          <img
            src="/fb.jpg"
            alt="user-profile"
            className="rounded-full w-[50px]"
          />
          <ul className="flex flex-col justify-center items-start">
            <li className="font-bold">{user}</li>
            <li className="opacity-80">{rol}</li>
          </ul>
          <RiExpandUpDownLine className="ml-auto cursor-pointer" />
        </div>
      </div>
    </section>
  );
}

export { Sidebar };
