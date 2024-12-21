'use client';

import { useState } from 'react';

import { Sheet } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { RiAddCircleLine } from '@remixicon/react';
import { AddStockProductForm } from '@/app/inventario/productos/[id]/_components/Sheets/addStock/addStockProductForm';

export function SheetAddStockProductWrapper({ productData }) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleOpenSheet = () => {
    setIsSheetOpen(true);
  };

  const handleCloseSheet = () => {
    setIsSheetOpen(false);
  };

  return (
    <div className="cursor-pointer">
      <Button variant="outline" onClick={handleOpenSheet}>
        <RiAddCircleLine className="h-5 w-5" />
        Aumentar Stock
      </Button>

      {isSheetOpen && (
        <Sheet open={isSheetOpen} onOpenChange={handleCloseSheet}>
          <AddStockProductForm
            productData={productData}
            onClose={handleCloseSheet}
          />
        </Sheet>
      )}
    </div>
  );
}
