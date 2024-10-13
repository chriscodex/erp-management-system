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
    <div className="cursor-pointer">
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <div onClick={handleOpenSheet}>
              <Edit />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Editar</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

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
