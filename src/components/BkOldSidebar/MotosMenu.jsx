'use client';
import { RiDropboxFill, RiMotorbikeLine } from '@remixicon/react';
import { motion } from 'framer-motion';

function MotosMenu() {
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden text-xl ml-8 flex items-center"
    >
      <span
        style={{ height: 'calc(7.5rem - 20px)' }}
        className="w-[2px] bg-white"
      ></span>
      <div className="w-full flex flex-col gap-2 justify-center pl-5 pr-2">
        <div className="h-10 flex items-center gap-2 cursor-pointer hover:text-white hover:bg-zinc-700 rounded pl-4 pr-2">
          <RiMotorbikeLine />
          <span className="leading-3">Modelos</span>
        </div>
        <div className="h-10 flex items-center gap-2 cursor-pointer hover:text-white hover:bg-zinc-700 rounded pl-4 pr-2">
          <RiDropboxFill />
          <span className="leading-3">Marcas</span>
        </div>
        <div className="h-10 flex items-center gap-2 cursor-pointer hover:text-white hover:bg-zinc-700 rounded pl-4 pr-2">
          <span className="bg-green-500 absolute translate-x-[-41px] w-2 h-2 rounded-full"></span>
          <RiDropboxFill />
          <span className="leading-3">Categorías</span>
        </div>
      </div>
    </motion.div>
  );
}

export { MotosMenu };
