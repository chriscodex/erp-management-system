'use client';

import { MoreHorizontal, ArrowUpDown, Edit } from 'lucide-react';
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
import { Badge } from '@/components/ui/badge';
import { DeleteMarcaAlert } from '@/app/inventario/marcas/_components/Dialogs/DeleteCategoryAlert.jsx';
import { RiFileListLine } from '@remixicon/react';

export const columnsProducts = [
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
    accessorKey: 'stock',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Stock
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className="text-start">{row.getValue('stock')}</div>;
    },
  },
  {
    accessorFn: (row) => row?.categoryId?.nombre,
    id: 'category',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Categorí
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const segment = row?.original?.categoryId?.nombre;
      return <div className="text-start">{segment}</div>;
    },
  },

  {
    id: 'actions',
    cell: ({ row }) => {
      const { _id: id } = row.original;

      const router = useRouter();

      /* Manejar estado de eliminar marca */
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
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => router.push(`/inventario/productos/${id}`)}
            >
              <RiFileListLine />
              Ver
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => router.push(`/inventario/marcas/${id}/edit`)}
            >
              <Edit />
              Editar
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
          {/* Dialog Delete */}
          <DeleteMarcaAlert
            isOpen={isOpenDialogDeleteUser}
            setIsOpen={setIsOpenDialogDeleteUser}
            id={id}
            actionAfterComplete="refresh"
          />
        </DropdownMenu>
      );
    },
  },
];
