'use client';

import { MoreHorizontal, ArrowUpDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DeleteCategoryAlert } from '@/app/inventario/categorias/_components/dialogs/DeleteCategoryAlert';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';
import { CategoryDetail } from '@/app/inventario/categorias/_components/sheets/category-detail';
import { Badge } from '@/components/ui/badge';

export const columnsCategory = [
  {
    accessorKey: 'nombre',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Nombre
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className="text-start">{row.getValue('nombre')}</div>;
    },
  },
  {
    accessorFn: (row) => row?.segmentId?.nombre,
    id: 'segmentName',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Segmento
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const segment = row?.original?.segmentId?.nombre;
      return <div className="text-start">{segment}</div>;
    },
  },
  {
    accessorKey: 'estado',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Estado
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="text-start">
          {row.getValue('estado') === 'activo' ? (
            <Badge variant="success" className="text-sm">
              Activo
            </Badge>
          ) : (
            <Badge variant="error" className="text-sm">
              Inactivo
            </Badge>
          )}
        </div>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const categoryData = row.original;

      const router = useRouter();

      const [isOpenDialogDeleteCategory, setIsOpenDialogDeleteCategory] =
        useState(false);

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center">
            <DropdownMenuLabel className="select-none">
              Acciones
            </DropdownMenuLabel>
            <DropdownMenuItem onClick={(e) => e.preventDefault()} className>
              <Sheet className="w-full h-full">
                <SheetTrigger className="w-full h-full text-start cursor-pointer">
                  Detalle
                </SheetTrigger>
                <CategoryDetail categoryData={categoryData} />
              </Sheet>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              Editar
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => setIsOpenDialogDeleteCategory(true)}
            >
              Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
          <DeleteCategoryAlert
            isOpen={isOpenDialogDeleteCategory}
            setIsOpen={setIsOpenDialogDeleteCategory}
            actionAfterComplete="refresh"
            id={categoryData._id}
          />
        </DropdownMenu>
      );
    },
  },
];
