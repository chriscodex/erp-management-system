'use client';
import { RiLogoutBoxRLine, RiSettings3Line } from '@remixicon/react';
import { motion } from 'framer-motion';

function UserPanelOptions() {
  const menuUser = {
    hidden: {
      opacity: 0,
      x: -10,
    },
    visible: {
      opacity: 1,
      x: 5,
      transition: {
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      x: -10,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
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
  );
}

export { UserPanelOptions };
