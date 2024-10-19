'use client';

import { useState } from 'react';
import { MoreHorizontal, Edit } from 'lucide-react';
import { RiDeleteBinLine } from '@remixicon/react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DeleteMarcaAlert } from '@/app/inventario/marcas/_components/Dialogs/DeleteCategoryAlert';

export function DetailDropdown({ marcaId }) {
  const router = useRouter();

  /* Manejar estado del dialog de eliminar marca */
  const [isOpenDialogDelete, setIsOpenDialogDelete] = useState(false);

  return (
    <>
      <DropdownMenu>
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-8 w-8 p-0">
                  <span className="sr-only">Abrir menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p>Opciones</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <DropdownMenuContent align="center">
          <DropdownMenuLabel className="select-none">
            Acciones
          </DropdownMenuLabel>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => router.push(`/inventario/marcas/${marcaId}/edit`)}
          >
            <Edit />
            Editar
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setIsOpenDialogDelete(true)}
          >
            <RiDeleteBinLine />
            Eliminar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {/* Dialog Delete */}
      <DeleteMarcaAlert
        isOpen={isOpenDialogDelete}
        setIsOpen={setIsOpenDialogDelete}
        id={marcaId}
        actionAfterComplete="push"
      />
    </>
  );
}
