"use client";

import { useState, useRef } from "react";
import { ArrowUpDown, Plus } from "lucide-react";
import { toast } from "sonner";
import { RiDeleteBinLine } from "@remixicon/react";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { getMecanicoByDNIClientRequest } from "@/app/taller/ordenes-servicio/nuevo/_services/requests";


export function MecanicosTallerTable({ mecanicosTaller, setMecanicosTaller }) {
  const searchMecanicosInputRef = useRef(null);

  const deleteMecanico = (id) => {
    setMecanicosTaller((prevData) => {
      // Filtra el producto a eliminar
      const updatedData = prevData.filter(
        (row) => row._id !== id
      );
      // Reasigna la numeración
      return updatedData.map((row, index) => ({
        ...row,
        numeracion: index + 1, // Actualiza la numeración basada en el índice
      }));
    });
  };

  const columns = [
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
      accessorKey: "dni",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            DNI
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return <div className="text-start">{row.getValue("dni")}</div>;
      },
    },
    {
      accessorKey: "nombre",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nombre completo
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const nombres = row.original.nombres; // Acceso directo al objeto original
        const apellidos = row.original.apellidos;
        const fullname = `${nombres} ${apellidos}`;
        return <div className="text-start">{fullname}</div>;
      },
    },
    {
      id: "actions",
      header: "Acciones",
      cell: ({ row }) => {
        const mecanicoData = row.original;
        return (
          <div className="flex items-center space-x-3">
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className="cursor-pointer"
                    onClick={() => deleteMecanico(mecanicoData?._id)}
                  >
                    <RiDeleteBinLine className="w-5 h-5 text-red-500 hover:text-foreground" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Eliminar</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        );
      },
    },
  ];

  /* Sorting */
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);

  const table = useReactTable({
    data: mecanicosTaller,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  /* Search */
  const [searchValue, setSearchValue] = useState("");

  /* Agregar Mecánico */
  const [searchMecanicoIsLoading, setSearchMecanicoIsLoading] = useState(false);
  const handleAgregarMecanico = async (event) => {
    event.preventDefault();

    if (!searchValue) {
      toast.error("Ingrese el DNI del mecánico");
      return;
    }
    if (searchValue.length === !8) {
      toast.error("El DNI debe tener 8 caracteres");
      return;
    }

    const duplicado = mecanicosTaller.some(
      (mecanico) => mecanico?.dni === searchValue
    );
    if (duplicado) {
      toast.error("El mecanico ya se encuentra en la lista");
      return;
    }

    setSearchMecanicoIsLoading(true);

    // Toast para buscar mecanico
    toast.promise(
      getMecanicoByDNIClientRequest(searchValue, setSearchMecanicoIsLoading),
      {
        loading: "Buscando...",
        success: (response) => {
          console.log("RESPONSE", response);
          setMecanicosTaller([
            ...mecanicosTaller,
            {
              ...response,
              dni: searchValue,
              numeracion: mecanicosTaller.length + 1,
            },
          ]);
          setSearchValue("");
          if (searchMecanicosInputRef.current) {
            searchMecanicosInputRef.current.focus();
          }
          setSearchMecanicoIsLoading(false);
          return `Mecánico asignado a la orden de servicio correctamente`;
        },
        error: (error) => {
          setSearchMecanicoIsLoading(false);
          return error;
        },
      }
    );
  };

  return (
    <div>
      {/* Input */}
      <div className="flex gap-2 items-center py-4 w-full">
        <Input
          ref={searchMecanicosInputRef}
          placeholder="Ingrese el DNI del mecánico"
          value={searchValue}
          onChange={(e) => {
            const trimmedValue = e.target.value.trim();
            setSearchValue(trimmedValue);
          }}
          className="max-w-sm"
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              handleAgregarMecanico(event);
            }
          }}
        />
        <div>
          <Button
            type="button"
            disabled={searchMecanicoIsLoading}
            onClick={(event) => handleAgregarMecanico(event)}
          >
            Agregar
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="rounded-md border w-auto">
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
                  Sin mecánicos.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
