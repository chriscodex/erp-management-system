'use client';

import { useState } from 'react';

import { Edit } from 'lucide-react';
import { Sheet } from '@/components/ui/sheet';
import { UpdateAlmacenForm } from '@/app/inventario/almacen/_components/sheets/updateAlmacen/updateAlmacenForm';

export function SheetUpdateAlmacenWrapper({ almacenData }) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleOpenSheet = () => {
    setIsSheetOpen(true);
  };

  const handleCloseSheet = () => {
    setIsSheetOpen(false);
  };

  return (
    <div className="cursor-pointer">
      <div
        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground p-2"
        onClick={handleOpenSheet}
      >
        <Edit />
        Editar
      </div>

      {isSheetOpen && (
        <Sheet open={isSheetOpen} onOpenChange={handleCloseSheet}>
          <UpdateAlmacenForm
            onClose={handleCloseSheet}
            almacenData={almacenData}
          />
        </Sheet>
      )}
    </div>
  );
}
