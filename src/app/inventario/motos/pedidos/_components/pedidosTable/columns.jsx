"use client";

import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RiDeleteBinLine, RiFileListLine } from "@remixicon/react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { formatDateShort } from "@/lib/formateador";
import { formatMoney } from "@/lib/utils";
import { DeletePedidoAlert } from "@/app/inventario/motos/pedidos/_components/dialogs/DeletePedidoAlert";

export const columnsPedidos = [
  {
    accessorKey: "numeracion",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="w-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          N°
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className="text-start">{row.getValue("numeracion")}</div>;
    },
  },
  {
    accessorKey: "code",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Código
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const code = row?.original?.code;
      return <div className="text-start">{code}</div>;
    },
  },
  {
    accessorKey: "fechaCreacion",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Fecha de creación
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const fechaCreacion = row?.original?.createdAt;
      return (
        <div className="text-start">
          {formatDateShort(fechaCreacion, false)}
        </div>
      );
    },
  },
  {
    accessorKey: "Cantidad de motos",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Cantidad de motos
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const cantidad = row?.original?.moto?.cantidad;
      return <div className="text-start">{cantidad}</div>;
    },
  },
  {
    accessorKey: "montoPagadoYTotal",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Monto Pagado / Total
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const montoPagado = formatMoney(row?.original?.montoPagado);
      const montoTotal = formatMoney(row?.original?.montoTotal);
      return (
        <div className="text-start">{`S/.${montoPagado} de S/.${montoTotal}`}</div>
      );
    },
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {

      // const { _id: id } = row.original._id;

      const id = row.original._id;

      console.log("XXXXXXXXXXXXXXXXXXXXXXXXXX", row.original);
      console.log(id);

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
              onClick={() => router.push(`/inventario/motos/pedidos/${id}`)}
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
          <DeletePedidoAlert
            isOpen={isOpenDialogDelete}
            setIsOpen={setIsOpenDialogDelete}
            pedidoId={id}
            actionAfterComplete="refresh"
          />
        </DropdownMenu>
      );
    },
  },
];
