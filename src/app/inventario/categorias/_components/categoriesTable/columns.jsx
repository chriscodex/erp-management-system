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
import { DeleteUserAlert } from '@/app/usuarios/_components/Modal/DeleteUserAlert';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';
import { CategoryDetail } from '@/app/inventario/categorias/_components/sheets/category-detail';

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
      return <div className="text-start">{row.getValue('estado')}</div>;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const categoryData = row.original;

      const router = useRouter();

      const [isOpenDialogDeleteUser, setIsOpenDialogDeleteUser] =
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
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => setIsOpenDialogDeleteUser(true)}
            >
              Editar
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => setIsOpenDialogDeleteUser(true)}
            >
              Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
          <DeleteUserAlert
            isOpen={isOpenDialogDeleteUser}
            setIsOpen={setIsOpenDialogDeleteUser}
            actionAfterComplete="refresh"
          />
        </DropdownMenu>
      );
    },
  },
];
