'use client';
import { RiHome2Line } from '@remixicon/react';

function Sidebar() {
  const menuItems = [
    {
      icon: <RiHome2Line />,
      label: 'Inicio',
    },
  ];

  return (
    <section className="w-[400px] bg-rose-700 h-screen flex flex-col">
      <div>
        <p className='text-lg pl-4 pt-4 pb-2 opacity-65 font-light'>MENU</p>
        <ul>
          {menuItems.map((item) => (
            <li key={item.label} className='flex gap-2 text-xl pl-4'>
              {item.icon}
              <p>{item.label}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export { Sidebar };
