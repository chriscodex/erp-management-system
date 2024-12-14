'use client';

import { MoreHorizontal, ArrowUpDown, Edit, Trash2 } from 'lucide-react';
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
import { RiFileListLine } from '@remixicon/react';
import { DeleteModeloAlert } from '../Dialogs/DeleteModeloAlert';

export const columnsModelos = [
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
    accessorFn: (row) => row?.categoryId?.nombre,
    id: 'category',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Categoría
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
    header: 'Acciones',
    cell: ({ row }) => {
      const { _id: modeloId } = row.original;

      const router = useRouter();

      /* Manejar estado de eliminar */
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
              onClick={() => router.push(`/inventario/productos/${modeloId}`)}
            >
              <RiFileListLine />
              Ver
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => router.push(`/inventario/marcas/${modeloId}/edit`)}
            >
              <Edit />
              Editar
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => setIsOpenDialogDeleteUser(true)}
            >
              <Trash2 />
              Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
          {/* Dialog Delete */}
          <DeleteModeloAlert
            isOpen={isOpenDialogDeleteUser}
            setIsOpen={setIsOpenDialogDeleteUser}
            id={modeloId}
            actionAfterComplete="refresh"
          />
        </DropdownMenu>
      );
    },
  },
];
