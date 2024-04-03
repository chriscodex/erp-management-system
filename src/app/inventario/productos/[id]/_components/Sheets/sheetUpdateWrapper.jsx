'use client';

import { useState } from 'react';

import { Edit } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Sheet } from '@/components/ui/sheet';

import { UpdateUnitProductForm } from '@/app/inventario/productos/[id]/_components/Sheets/updateUnitProductForm';

export function SheetUpdateUnitProductWrapper({
  productData,
  unitProductData,
}) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleOpenSheet = () => {
    setIsSheetOpen(true);
  };

  const handleCloseSheet = () => {
    setIsSheetOpen(false);
  };

  return (
    <div className="cursor-pointer">
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <div onClick={handleOpenSheet}>
              <Edit className="w-5 h-5 text-muted-foreground hover:text-foreground" />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Editar</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {isSheetOpen && (
        <Sheet open={isSheetOpen} onOpenChange={handleCloseSheet}>
          <UpdateUnitProductForm
            unitProductData={unitProductData}
            productData={productData}
            onClose={handleCloseSheet}
          />
        </Sheet>
      )}
    </div>
  );
}
