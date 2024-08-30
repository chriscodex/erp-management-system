'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { RiArrowRightSLine, RiBox3Line, RiHome2Line } from '@remixicon/react';
import clsx from 'clsx';

import { FormateadorNombresApellidos } from '@/utils/formateador';
import { UserPanel } from '@/app/components/Sidebar/UserPanel/UserPanel';
import { InventarioMenu } from '@/app/components/Sidebar/InventarioMenu';

function Sidebar() {
  /* Datos de la sesión */
  const { data: session, status } = useSession();

  const user = FormateadorNombresApellidos(
    session?.user?.nombres,
    session?.user?.apellidos
  );

  const rol = session?.user?.rol;

  /* Estados para los submenus */
  const [isInventarioMenuOpen, setIsInventarioMenuOpen] = useState(false);
  const [isMotosMenuOpen, setIsMotosMenuOpen] = useState(false);
  const [isProductosGeneralesMenuOpen, setIsProductosGeneralesMenuOpen] =
    useState(false);

  /* Controladores de los submenus */
  const handleInventarioMenuClick = () => {
    setIsInventarioMenuOpen(!isInventarioMenuOpen);
    setIsMotosMenuOpen(false);
    setIsProductosGeneralesMenuOpen(false);
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
              <InventarioMenu
                isMotosMenuOpen={isMotosMenuOpen}
                setIsMotosMenuOpen={setIsMotosMenuOpen}
                isProductosGeneralesMenuOpen={isProductosGeneralesMenuOpen}
                setIsProductosGeneralesMenuOpen={
                  setIsProductosGeneralesMenuOpen
                }
              />
            )}
          </AnimatePresence>
        </div>
      </div>
      <UserPanel user={user} rol={rol} status={status} />
    </section>
  );
}

export { Sidebar };
