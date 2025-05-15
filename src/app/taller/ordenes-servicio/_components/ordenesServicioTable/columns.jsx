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
import { DeleteOrdenDeServicioAlert } from "@/app/taller/ordenes-servicio/[id]/_components/dialogs/deleteOrdenDeServicioAlert";

export const columnsOrdenesDeServicio = [
  {
    accessorFn: (row) => row?.code,
    id: "Código",
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
    accessorKey: "cliente",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Cliente
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      console.log(row?.original);
      const cliente = row?.original?.cliente.id;
      return (
        <div className="text-start">
          {cliente?.tipo === "empresa"
            ? cliente?.datos?.razonSocial
            : cliente?.datos?.nombres + " " + cliente?.datos?.apellidos}
        </div>
      );
    },
  },
  {
    accessorKey: "identificador",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Identificador
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const cliente = row?.original?.cliente.id;
      return (
        <div className="text-start flex">
          <p className="font-light mr-2 text-[0.8rem] border rounded-md px-1">
            {cliente?.tipo === "empresa" ? "RUC" : "DNI"}
          </p>
          <p>
            {cliente?.tipo === "empresa"
              ? cliente?.datos?.ruc
              : cliente?.datos?.dni}
          </p>
        </div>
      );
    },
    // Configuramos el valor de filtro personalizado
    accessorFn: (row) => {
      return row.cliente?.tipo === "empresa"
        ? row.cliente?.datos?.ruc
        : row.cliente?.datos?.dni;
    },
  },
  {
    accessorKey: "fecha",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Fecha
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const fecha = formatDateShort(row?.original?.fechaIngreso, false);
      return <div className="text-start">{fecha}</div>;
    },
  },
  {
    accessorKey: "mecanicos",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Mecánicos
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const mecanicos = row.getValue("mecanicos");

      return (
        <div className="text-start">
          {Array.isArray(mecanicos) &&
            mecanicos.map((mec, i) => (
              <div key={i}>
                {mec.nombres} {mec.apellidos}
              </div>
            ))}
        </div>
      );
    },
  },

  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const { _id: id } = row.original;

      const router = useRouter();

      /* Manejar estado de eliminar marca */
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
              onClick={() => router.push(`/taller/ordenes-servicio/${id}`)}
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
          <DeleteOrdenDeServicioAlert
            isOpen={isOpenDialogDelete}
            setIsOpen={setIsOpenDialogDelete}
            ordenDeServicioId={id}
            actionAfterComplete="refresh"
          />
        </DropdownMenu>
      );
    },
  },
];
