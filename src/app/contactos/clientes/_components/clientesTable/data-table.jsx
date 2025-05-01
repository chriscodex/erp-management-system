"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTablePagination } from "@/components/ui/table-pagination";
import { DataTableViewOptions } from "@/components/ui/table-view-options";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { RiFileListLine, RiDeleteBinLine } from "@remixicon/react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { serverErrorToast } from "@/components/toast/serverErrorToast";
import { TIME_DEBOUNCE } from "@/lib/utils";
import { DeleteClienteAlert } from "@/app/contactos/clientes/_components/dialogs/deleteClienteAlert";
import { SheetUpdateClienteWrapper } from "@/app/contactos/clientes/_components/sheets/updateCliente/sheetUpdateClienteWrapper";

export function DataTableClientes({ data, status = 200 }) {
  const router = useRouter();

  const columns = [
    {
      accessorKey: "nombre",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nombre
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const cliente = row?.original;
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
            DNI / RUC
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const cliente = row?.original;
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
    },
    {
      accessorKey: "celular",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Celular
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const cliente = row?.original;
        return <div className="text-start">{cliente?.datos?.celular}</div>;
      },
    },
    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const cliente = row?.original;
        return <div className="text-start">{cliente?.datos?.email}</div>;
      },
    },
    // {
    //   accessorKey: "direccion",
    //   header: ({ column }) => {
    //     return (
    //       <Button
    //         variant="ghost"
    //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //       >
    //         Direción
    //         <ArrowUpDown className="ml-2 h-4 w-4" />
    //       </Button>
    //     );
    //   },
    //   cell: ({ row }) => {
    //     const cliente = row?.original;
    //     return <div className="text-start">{cliente?.datos?.direccion}</div>;
    //   },
    // },
    {
      id: "actions",
      header: "Acciones",
      cell: ({ row }) => {
        const clienteData = row.original;

        // const { _id: id } = row.original;

        console.log("Desde datatable", clienteData);

        const router = useRouter();

        const [isOpenDialogDelete, setIsOpenDialogDelete] = useState(false);

        return (
          <div className="flex items-center space-x-3">
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className="cursor-pointer flex"
                    onClick={() => router.push(`/contactos/clientes/${clienteData._id}`)}
                  >
                    <RiFileListLine className="w-5 h-5 text-muted-foreground hover:text-foreground" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Detalle</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <SheetUpdateClienteWrapper clienteData={clienteData} />

            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className="cursor-pointer"
                    onClick={() => setIsOpenDialogDelete(true)}
                  >
                    <RiDeleteBinLine className="w-5 h-5 text-muted-foreground hover:text-foreground" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Eliminar</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <DeleteClienteAlert
              isOpen={isOpenDialogDelete}
              setIsOpen={setIsOpenDialogDelete}
              actionAfterComplete="refresh"
              clienteId={clienteData._id}
            />
          </div>
        );
      },
    },
  ];

  /* Sorting */
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");

  /* Table */
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: (row, filterValue) => {
      // Filtrar por identificador (RUC/DNI) o código
      console.log("Para los filtros", row);

      const identificador =
        row.original?.tipo === "empresa"
          ? row.original?.datos?.ruc
          : row.original?.datos?.dni;

      const nombre =
        row.original?.tipo === "empresa"
          ? row.original?.datos?.razonSocial
          : row.original?.datos?.nombres + " " + row.original?.datos?.apellidos;

      return (
        identificador?.toLowerCase().includes(filterValue.toLowerCase()) ||
        nombre?.toLowerCase().includes(filterValue.toLowerCase())
      );
    },
  });

  /* Search */
  const [searchValue, setSearchValue] = useState("");

  const debouncedSearch = useDebouncedCallback((value) => {
    setGlobalFilter(value);
  }, TIME_DEBOUNCE);

  useEffect(() => {
    debouncedSearch(searchValue);
  }, [searchValue, debouncedSearch]);

  // table.getColumn('rol').getIsVisible();

  useEffect(() => {
    if (status === 500) {
      serverErrorToast();
    }
  }, [status]);

  useEffect(() => {
    // Fuerza la actualización de los datos cada vez que se accede a la página
    router.refresh();
  }, [router]);

  return (
    <div>
      {/* Input */}
      <div className="flex items-center py-4 w-full">
        <Input
          placeholder="Buscar por nombre o razón social"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="max-w-sm"
        />
        <DataTableViewOptions table={table} />
      </div>
      <div className="rounded-md border sm:min-h-[528px] min-h-[528px] w-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Sin resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
