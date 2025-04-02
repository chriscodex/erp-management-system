'use client';

import { MoreHorizontal, ArrowUpDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { RiDeleteBinLine, RiFileListLine } from '@remixicon/react';

import { Button } from '@/components/ui/button';
import {DropdownMenu,DropdownMenuContent,DropdownMenuItem,DropdownMenuLabel,DropdownMenuSeparator,DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { formatDateShort, } from '@/lib/formateador';
import { formatMoney } from '@/lib/utils';
import { DeleteReservacionAlert } from '@/app/inventario/motos/reservaciones/_components/dialogs/DeleteReservacionAlert';

export const columnsReservaciones = [
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
    accessorKey: 'moto',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Moto
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const moto = row?.original?.moto;
      return <div className="text-start">{moto.nombre}</div>;
    },
  },
  {
    accessorKey: 'marca',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Marca
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const moto = row?.original?.moto;
      return <div className="text-start">{moto?.marca?.nombre}</div>;
    },
  },
  {
    accessorKey: 'cliente',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Cliente
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const cliente = row?.original?.cliente;
      return (
        <div className="text-start">
          {cliente?.tipo === 'empresa'
            ? cliente?.datos?.nombre
            : cliente?.datos?.nombres + ' ' + cliente?.datos?.apellidos}
        </div>
      );
    },
  },
  {
    accessorKey: 'clienteId',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Identificación
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const cliente = row?.original?.cliente;
      return (
        <div className="text-start flex">
          <p className="font-light mr-2 text-[0.8rem] border rounded-md px-1">
            {cliente?.tipo === 'empresa' ? 'RUC' : 'DNI'}
          </p>
          <p>
            {cliente?.tipo === 'empresa'
              ? cliente?.datos?.ruc
              : cliente?.datos?.dni}
          </p>
        </div>
      );
    },
    // Configuramos el valor de filtro personalizado
    accessorFn: (row) => {
      return row.cliente?.tipo === 'empresa'
        ? row.cliente?.datos?.ruc
        : row.cliente?.datos?.dni;
    },
  },
  
  {
    accessorKey: 'pagoInicial',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Pago Inicial
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const pago = formatMoney(row?.original?.pagoInicial);
      return <div className="text-start">{pago}</div>;
    },
  },
  {
    accessorKey: 'fechaLimite',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Fecha límite
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const fecha = formatDateShort(row?.original?.fechaLimite, false);
      return <div className="text-start">{fecha}</div>;
    },
  },
  {
    id: 'actions',
    header: 'Acciones',
    cell: ({ row }) => {
      const { _id: id } = row.original;

      const router = useRouter();

      /* Manejar estado de eliminar reservacion*/
      const [isOpenDialogDelete, setIsOpenDialogDelete] = useState(false);

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
              onClick={() => router.push(`/inventario/motos/reservaciones/${id}`)}
            >
              <RiFileListLine />
              Detalle
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
          {/* Dialog Delete */}
          <DeleteReservacionAlert
            isOpen={isOpenDialogDelete}
            setIsOpen={setIsOpenDialogDelete}
            reservacionId={id}
            actionAfterComplete="refresh"
          />
        </DropdownMenu>
      );
    },
  },
];
