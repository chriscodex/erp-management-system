'use client';

import { Plus } from 'lucide-react';
import { useState } from 'react';

import { Sheet } from '@/components/ui/sheet';
import { AddCaracteristicasMotoForm } from '@/app/inventario/motos/modelos/[modeloId]/_components/sheets/addCaracteristicasMoto/addCaracteristicasMotoForm';

export function SheetAddCaracteristicasMotoWrapper({ onSave, defaultValues }) {

  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleOpenSheet = () => {
    setIsSheetOpen(true);
  };

  const handleCloseSheet = () => {
    setIsSheetOpen(false);
  };

  const handleSave = (data) => {
    onSave(data); // ← se guarda en el estado `caracteristicas` del form principal
    handleCloseSheet(); // ← cierra el sheet
  };

  return (
    <div>
      <div
        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 cursor-pointer"
        onClick={handleOpenSheet}
      >
        <Plus />
        Agregar Características
      </div>
      {isSheetOpen && (
        <Sheet open={isSheetOpen} onOpenChange={handleCloseSheet}>
          <AddCaracteristicasMotoForm onSave={handleSave} onClose={handleCloseSheet} defaultValues={defaultValues}/>
        </Sheet>
      )}
    </div>
  );
}