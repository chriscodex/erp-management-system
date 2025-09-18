'use client';

import { useState} from "react";
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
} from '@tanstack/react-table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
export function MecanicosTallerTable({
  mecanicosTaller,
  setMecanicosTaller,
  mecanicos = [],
}) {
  const deleteMecanico = (id) => {
    setMecanicosTaller((prevData) => {
      // Filtra el producto a eliminar
      const updatedData = prevData.filter((row) => row._id !== id);
      // Reasigna la numeración
      return updatedData.map((row, index) => ({
        ...row,
        numeracion: index + 1, // Actualiza la numeración basada en el índice
      }));
    });
  };

  const columns = [
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
      accessorKey: 'dni',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            DNI
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return <div className="text-start">{row.getValue('dni')}</div>;
      },
    },
    {
      accessorKey: 'nombre',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
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
      id: 'actions',
      header: 'Acciones',
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

  /* Nuevo estado: ID del mecánico seleccionado */
  const [selectedMecanicoId, setSelectedMecanicoId] = useState("");

  const handleAgregarMecanico = () => {
    if (!selectedMecanicoId) {
      toast.error("Seleccione un mecánico");
      return;
    }

    // Verificar duplicado
    const duplicado = mecanicosTaller.some(
      (mecanico) => mecanico._id === selectedMecanicoId
    );
    if (duplicado) {
      toast.error("El mecánico ya está en la lista");
      return;
    }

    // Buscar el mecánico en la lista global
    const mecanicoToAdd = mecanicos.find(
      (mecanico) => mecanico._id === selectedMecanicoId
    );
    if (!mecanicoToAdd) {
      toast.error("No se encontró el mecánico seleccionado");
      return;
    }

    // Agregar con numeración
    setMecanicosTaller((prev) => [
      ...prev,
      { ...mecanicoToAdd, numeracion: prev.length + 1 },
    ]);

    // Limpiar selección
    setSelectedMecanicoId("");
    toast.success("Mecánico agregado");
  };

  return (
    <div>
      <div className="flex gap-2 items-center py-4 w-full">
        <Select
          value={selectedMecanicoId}
          onValueChange={(value) => setSelectedMecanicoId(value)}
        >
          {/* <FormControl> */}
          <SelectTrigger className="w-full pl-2">
            <SelectValue placeholder="Seleccione un mecánico" />
          </SelectTrigger>
          {/* </FormControl> */}
          <SelectContent>
            {mecanicos?.map((mecanico) => (
              <SelectItem key={mecanico._id} value={mecanico._id}>
                {mecanico.apellidos} {mecanico.nombres}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div>
          <Button
            type="button"
            disabled={!selectedMecanicoId}
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
                            header.getContext(),
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
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
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
