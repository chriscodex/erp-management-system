'use client';

import { useState } from 'react';

import { Sheet } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { RiIndeterminateCircleLine } from '@remixicon/react';
import { ReduceStockProductForm } from '@/app/inventario/productos/[id]/_components/Sheets/reduceStock/reduceStockProductForm';

export function SheetReduceStockProductWrapper({ productData }) {
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
        <RiIndeterminateCircleLine className="h-5 w-5" />
        Disminuir Stock
      </Button>

      {isSheetOpen && (
        <Sheet open={isSheetOpen} onOpenChange={handleCloseSheet}>
          <ReduceStockProductForm
            productData={productData}
            onClose={handleCloseSheet}
          />
        </Sheet>
      )}
    </div>
  );
}
