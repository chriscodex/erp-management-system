'use client';
import { AnimatePresence, motion } from 'framer-motion';
import {
  RiArrowRightSLine,
  RiDropboxFill,
  RiMotorbikeLine,
} from '@remixicon/react';

import { MotosMenu } from './MotosMenu';
import { ProductosGeneralesMenu } from './ProductosGeneralesMenu';

function InventarioMenu({
  isMotosMenuOpen,
  setIsMotosMenuOpen,
  isProductosGeneralesMenuOpen,
  setIsProductosGeneralesMenuOpen,
}) {
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden rounded text-xl ml-8"
    >
      <div className="flex flex-col gap-2 justify-center pl-5 pr-2">
        <div
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
        </div>
        <AnimatePresence>
          {isMotosMenuOpen ? <MotosMenu /> : null}
        </AnimatePresence>
        <div
          className="h-10 flex items-center gap-2 cursor-pointer hover:text-white hover:bg-zinc-700 rounded pl-4 pr-2"
          onClick={() =>
            setIsProductosGeneralesMenuOpen(!isProductosGeneralesMenuOpen)
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
        </div>
        <AnimatePresence>
          {isProductosGeneralesMenuOpen ? <ProductosGeneralesMenu /> : null}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export { InventarioMenu };
