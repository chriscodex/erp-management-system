'use client';

import { ArrowUpDown } from 'lucide-react';
import { useState } from 'react';
import { formatDateShort } from '@/lib/formateador';

import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { DeleteGastoGeneralAlert } from '@/app/gastos-generales/_components/dialog/DeleteGastoGeneralAlert';
import { RiFileListLine, RiDeleteBinLine } from '@remixicon/react';
import { GastoGeneralDetail } from '@/app/gastos-generales/_components/sheets/sheetDetailGastoGeneral';
import { SheetUpdateGastoGeneralWrapper } from '@/app/gastos-generales/_components/sheets/updateGastoGeneral/sheetUpdateGastoGeneralWrapper';
import { formatMoney } from '@/lib/utils';

export const columnsGastosGenerales = [
  {
    accessorKey: 'numeracion',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="w-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          N°
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className="text-start">{row.getValue('numeracion')}</div>;
    },
  },
  {
    accessorKey: 'descripcion',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Descripción
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className="text-start">{row.getValue('descripcion')}</div>;
    },
  },
  {
    accessorKey: 'monto',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Monto
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="text-start">
          S/. {formatMoney(row.getValue('monto'))}
        </div>
      );
    },
  },
  {
    accessorKey: 'fecha',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Fecha
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="text-start">
          {formatDateShort(row.getValue('fecha'), false)}
        </div>
      );
    },
  },
  {
    id: 'actions',
    header: 'Acciones',
    cell: ({ row }) => {
      const gastoGeneralData = row.original;

      // const router = useRouter();

      /* Manejar estado de eliminar gasto general */
      const [
        isOpenDialogDeleteGastoGeneral,
        setIsOpenDialogDeleteGastoGeneral,
      ] = useState(false);

      return (
        <div className="flex items-center space-x-3">
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="cursor-pointer flex">
                  <Sheet>
                    <SheetTrigger className="text-start">
                      <RiFileListLine className="w-5 h-5 text-muted-foreground hover:text-foreground" />
                    </SheetTrigger>
                    <GastoGeneralDetail gastoGeneralData={gastoGeneralData} />
                  </Sheet>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Detalle</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <SheetUpdateGastoGeneralWrapper gastoGeneralData={gastoGeneralData} />

          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  className="cursor-pointer"
                  onClick={() => setIsOpenDialogDeleteGastoGeneral(true)}
                >
                  <RiDeleteBinLine className="w-5 h-5 text-muted-foreground hover:text-foreground" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Eliminar</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <DeleteGastoGeneralAlert
            isOpen={isOpenDialogDeleteGastoGeneral}
            setIsOpen={setIsOpenDialogDeleteGastoGeneral}
            actionAfterComplete="refresh"
            gastoGeneralId={gastoGeneralData._id}
          />
        </div>
      );
    },
  },
];
