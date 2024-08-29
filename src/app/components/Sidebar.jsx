'use client';

import {
  RiHome2Line,
  RiExpandUpDownLine,
  RiSettings3Line,
  RiLogoutBoxRLine,
} from '@remixicon/react';

import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { FormateadorNombresApellidos } from '@/utils/formateador';

function Sidebar() {
  /* Datos de la sesión */
  const { data: session, status } = useSession();

  const user = FormateadorNombresApellidos(
    session?.user?.nombres,
    session?.user?.apellidos
  );

  const rol = session?.user?.rol;

  /* Estados para los submenus */
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  /* Menu items */
  const menuItems = [
    {
      icon: <RiHome2Line />,
      label: 'Inicio',
    },
  ];

  /* Menu Animation Variants */
  const menuVariants = {
    hidden: {
      opacity: 0,
      x: -10, // Desplazamiento hacia la izquierda
    },
    visible: {
      opacity: 1,
      x: 5,
      transition: {
        duration: 0.3, // Duración de la animación
      },
    },
    exit: {
      opacity: 0,
      x: -10, // Desplazamiento hacia la izquierda al salir
      transition: {
        duration: 0.3, // Duración de la animación de salida
      },
    },
  };

  return (
    <section className="fixed w-[350px] bg-component h-screen flex flex-col">
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
      <div className="mt-auto bg-zinc-700 rounded-md mb-2 mx-2 shadow-inner select-none py-3">
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
        <div className="flex shadow-inner justify-center items-center gap-4 pl-3 pr-1">
          <img
            src="/fb.jpg"
            alt="user-profile"
            className="rounded-full w-[50px]"
          />
          <ul className="flex flex-col justify-center items-start">
            <li className="font-bold">{user}</li>
            <li className="opacity-80">{rol}</li>
          </ul>
          <div
            className="ml-auto cursor-pointer hover:bg-zinc-800 hover:shadow-inner rounded-full p-2"
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          >
            <RiExpandUpDownLine />
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isUserMenuOpen && ( // Renderizar el menú condicionalmente
          <motion.div
            className="absolute left-full bottom-1 transform -translate-y-1/2 bg-zinc-800 shadow-lg rounded select-none"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="py-1 px-1">
              <button className="px-2 py-2 cursor-pointer hover:bg-zinc-600 flex gap-1 rounded">
                <RiSettings3Line />
                Configuración
              </button>
              <button
                className="px-2 py-2 cursor-pointer hover:bg-zinc-600 flex gap-1 rounded"
                onClick={() => signOut()}
              >
                <RiLogoutBoxRLine />
                Cerrar Sesión
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export { Sidebar };
