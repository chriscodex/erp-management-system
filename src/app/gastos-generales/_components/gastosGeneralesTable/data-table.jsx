"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { useEffect, useState, useMemo } from "react";
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
import { serverErrorToast } from "@/components/toast/serverErrorToast";

import { DataTablePagination } from "@/components/ui/table-pagination";
import { DataTableViewOptions } from "@/components/ui/table-view-options";
import { TIME_DEBOUNCE } from "@/lib/utils";
import { MesAnioPicker } from "@/components/calendars/MesAnioPicker";

export function DataTableGastosGenerales({ columns, data, status = 200 }) {
  const router = useRouter();

  /* Sorting */
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);


  const [mes, setMes] = useState(new Date().getMonth() + 1);
  const [anio, setAnio] = useState(new Date().getFullYear());
  const [filtroActivo, setFiltroActivo] = useState(false);
  
  function handleDateChange(month, year) {
    setMes(month);
    setAnio(year);
    setFiltroActivo(true);
  }

 
  function filtrarDataPorMes(data, mes, anio){
    return data.filter((item) => {
      const fecha = new Date(item.fecha);
      return (
        fecha.getMonth() + 1 === mes &&
        fecha.getFullYear() === anio
      );
    });
  }

  const dataFiltrada = useMemo(() => {
    if (!filtroActivo) return data;
    return filtrarDataPorMes(data, mes, anio);
  }, [data, mes, anio, filtroActivo])
  
  /* Table */
  const table = useReactTable({
    data: dataFiltrada,
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

  const debouncedSearch = useDebouncedCallback((value) => {
    table.getColumn("descripcion")?.setFilterValue(value);
  }, TIME_DEBOUNCE);

  useEffect(() => {
    debouncedSearch(searchValue);
  }, [searchValue, debouncedSearch]);

  // table.getColumn('rol').getIsVisible();

  useEffect(() => {
    if (status !== 200) {
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
        <div className="flex gap-2">
          <Input
            placeholder="Buscar por descripción"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="max-w-sm"
          />
          <MesAnioPicker onChange={handleDateChange}/>
        </div>

        <DataTableViewOptions table={table} />
      </div>
      <div className="rounded-md border sm:min-h-[528px] min-h-[528px]">
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
