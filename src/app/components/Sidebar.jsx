'use client';

import {
  RiHome2Line,
  RiExpandUpDownLine,
  RiSettings3Line,
  RiLogoutBoxRLine,
  RiBox3Line,
  RiMotorbikeLine,
  RiStackFill,
  RiStackshareFill,
  RiAppsLine,
  RiDropboxFill,
  RiArrowRightSLine,
} from '@remixicon/react';
import Skeleton from '@mui/material/Skeleton';

import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import clsx from 'clsx';

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
  const [isInventarioMenuOpen, setIsInventarioMenuOpen] = useState(false);
  const [isMotosMenuOpen, setIsMotosMenuOpen] = useState(false);
  const [isProductosGeneralesMenuOpen, setIsProductosGeneralesMenuOpen] =
    useState(false);

  /* Controladores de los submenus */
  const handleInventarioMenuClick = () => {
    setIsInventarioMenuOpen(!isInventarioMenuOpen);
    setIsMotosMenuOpen(false);
    setIsUserMenuOpen(false);
    setIsProductosGeneralesMenuOpen(false);
  };

  const motosMenuItems = [
    {
      icon: <RiStackFill />,
      label: 'Modelos',
    },
    {
      icon: <RiAppsLine />,
      label: 'Marcas',
    },
    {
      icon: <RiStackshareFill />,
      label: 'Categorías',
    },
  ];

  const productosGeneralesMenuItems = [
    {
      icon: <RiAppsLine />,
      label: 'Marcas',
    },
    {
      icon: <RiStackshareFill />,
      label: 'Categorías',
    },
  ];

  /* Menu Animation Variants */
  const menuUser = {
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
    <section className="fixed w-[350px] bg-component h-screen flex flex-col select-none">
      <div className="text-xl text-neutral-300">
        <p className="text-sm font-bold opacity-60 pl-4 pt-4 pb-4">MENU</p>
        <div>
          {/* Inicio */}
          <div className="h-10 flex items-center gap-2 rounded m-2 text-xl pl-4 pr-2 cursor-pointer hover:bg-zinc-700 transition-colors opacity-80 hover:opacity-100">
            <RiHome2Line />
            <p>Inicio</p>
          </div>
          {/* Inventario */}
          <div
            className={clsx(
              'h-10 flex items-center gap-2 rounded m-2 pl-4 pr-2 cursor-pointer hover:bg-zinc-700 transition-colors opacity-80 hover:opacity-100',
              isInventarioMenuOpen ? 'bg-zinc-700 font-bold opacity-100' : ''
            )}
            onClick={handleInventarioMenuClick}
          >
            <RiBox3Line />
            <p>Inventario</p>
            <motion.div
              animate={{ rotate: isInventarioMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.3 }}
              className="ml-auto"
            >
              <RiArrowRightSLine size={28} className="ml-auto" />
            </motion.div>
          </div>
          <AnimatePresence>
            {isInventarioMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden rounded text-xl ml-8"
              >
                <ul className="flex flex-col gap-2 justify-center pl-5 pr-2">
                  <li
                    className="h-10 flex items-center gap-2 cursor-pointer hover:text-white hover:bg-zinc-700 rounded pl-4 pr-2"
                    onClick={() => setIsMotosMenuOpen(!isMotosMenuOpen)}
                  >
                    <RiMotorbikeLine />
                    <span className="leading-3">Motos</span>
                    <motion.div
                      animate={{ rotate: isMotosMenuOpen ? 90 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="ml-auto"
                    >
                      <RiArrowRightSLine size={28} className="ml-auto" />
                    </motion.div>
                  </li>
                  <li
                    className="h-10 flex items-center gap-2 cursor-pointer hover:text-white hover:bg-zinc-700 rounded pl-4 pr-2"
                    onClick={() =>
                      setIsProductosGeneralesMenuOpen(
                        !isProductosGeneralesMenuOpen
                      )
                    }
                  >
                    <RiDropboxFill />
                    <span className="leading-3">Productos Generales</span>
                    <motion.div
                      animate={{
                        rotate: isProductosGeneralesMenuOpen ? 90 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="ml-auto"
                    >
                      <RiArrowRightSLine size={28} className="ml-auto" />
                    </motion.div>
                  </li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <div className="mt-auto bg-zinc-700 rounded-md mb-2 mx-2 shadow-inner select-none py-3">
        {status === 'authenticated' ? (
          <div className="flex shadow-inner justify-center items-center gap-4 pl-3 pr-1">
            <img
              src="/profile-placeholder.jpg"
              alt="user-profile"
              className="rounded-full w-[50px] h-[50px] object-cover"
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
        ) : (
          <div className="flex shadow-inner justify-center items-center gap-4 pl-3 pr-1">
            <Skeleton variant="circular" width={50} height={50} />
            <Skeleton variant="rounded" width={200} height={40} />
            <div
              className="ml-auto cursor-pointer hover:bg-zinc-800 hover:shadow-inner rounded-full p-2"
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            >
              <RiExpandUpDownLine />
            </div>
          </div>
        )}
      </div>
      <AnimatePresence>
        {isUserMenuOpen && ( // Renderizar el menú condicionalmente
          <motion.div
            className="absolute left-full bottom-1 transform -translate-y-1/2 bg-zinc-800 shadow-lg rounded select-none"
            variants={menuUser}
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
