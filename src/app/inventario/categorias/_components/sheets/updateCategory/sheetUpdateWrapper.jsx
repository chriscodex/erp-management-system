'use client';

import { useState } from 'react';

import { Sheet } from '@/components/ui/sheet';
import { UpdateCategory } from '@/app/inventario/categorias/_components/sheets/updateCategory/update-category';

export function SheetUpdateWrapper({ segments, categoryData }) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleOpenSheet = () => {
    setIsSheetOpen(true);
  };

  const handleCloseSheet = () => {
    setIsSheetOpen(false);
  };

  return (
    <div>
      <div onClick={handleOpenSheet}>Editar</div>
      {isSheetOpen && (
        <Sheet open={isSheetOpen} onOpenChange={handleCloseSheet}>
          <UpdateCategory
            segments={segments}
            onClose={handleCloseSheet}
            categoryData={categoryData}
          />
        </Sheet>
      )}
    </div>
  );
}
