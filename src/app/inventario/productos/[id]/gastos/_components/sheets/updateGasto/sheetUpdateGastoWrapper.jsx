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

import { UpdateGastoForm } from '@/app/inventario/productos/[id]/gastos/_components/sheets/updateGasto/updateGastoForm';

export function SheetUpdateGastoWrapper({ gastoData, productId }) {
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
          <UpdateGastoForm
            onClose={handleCloseSheet}
            gastoData={gastoData}
            productId={productId}
          />
        </Sheet>
      )}
    </div>
  );
}
