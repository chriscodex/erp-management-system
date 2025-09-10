'use client';

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from '@tanstack/react-table';
import { useEffect, useState, useMemo, useRef } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { useRouter } from 'next/navigation';

import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { FiltroAvanzadoVentasModal } from '@/app/ventas/ventas-historicas/_components/FiltroAvanzadoVentasModal';
import { DataTablePagination } from '@/components/ui/table-pagination';
import { DataTableViewOptions } from '@/components/ui/table-view-options';
import { serverErrorToast } from '@/components/toast/serverErrorToast';
import { TIME_DEBOUNCE } from '@/lib/utils';

export function DataTableVentasHistoricas({ columns, data, status = 200 }) {
  const router = useRouter();

  const [filtrosAvanzados, setFiltrosAvanzados] = useState(false);
  const [modalAbierto, setModalAbierto] = useState(false);

  /* Sorting */
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');

  /*Filtrar datos*/

  const datosFiltrados = useMemo(() => {
    return data.filter((ventaHistorica) => {
      const codigoFiltro = filtrosAvanzados?.codigo;
      const montoMinimo = filtrosAvanzados?.montoMinimo
        ? parseFloat(filtrosAvanzados?.montoMinimo)
        : null;
      const montoMaximo = filtrosAvanzados?.montoMaximo
        ? parseFloat(filtrosAvanzados?.montoMaximo)
        : null;
      const fechaDesde = filtrosAvanzados?.fechaDesde
        ? new Date(filtrosAvanzados?.fechaDesde)
        : null;
      const fechaHasta = filtrosAvanzados.fechaHasta
        ? new Date(filtrosAvanzados?.fechaHasta)
        : null;
      const tipoFiltro = filtrosAvanzados?.tipo;
      const identificadorFiltro = filtrosAvanzados?.identificador?.trim();

      // Extraemos datos de la ventaHistorica
      const codigo = ventaHistorica?.code || '';
      const montoTotal =
        ventaHistorica?.productos.reduce((sum, prod) => {
          const precio = prod.precioVenta || 0;
          const cantidad = prod.cantidad || 0;
          return sum + precio * cantidad;
        }, 0) || 0;
      const fechaVenta = new Date(ventaHistorica?.fecha);
      const tipoCliente = ventaHistorica?.cliente?.tipo;
      const datosCliente = ventaHistorica?.cliente?.datos || {};
      const dniCliente = datosCliente?.dni || '';
      const rucCliente = datosCliente?.ruc || '';

      //Comparamos

      const coincideCodigo = !codigoFiltro || codigo.includes(codigoFiltro);
      const coincideMonto =
        (montoMinimo === null || montoTotal >= montoMinimo) &&
        (montoMaximo === null || montoTotal <= montoMaximo);
      const coincideDesde = !fechaDesde || fechaVenta >= fechaDesde;
      const coincideHasta = !fechaHasta || fechaVenta <= fechaHasta;
      const coincideTipo = !tipoFiltro || tipoCliente === tipoFiltro;
      const coincideIdentificador =
        !identificadorFiltro ||
        (tipoCliente === 'persona' &&
          dniCliente.includes(identificadorFiltro)) ||
        (tipoCliente === 'empresa' && rucCliente.includes(identificadorFiltro));

      return (
        coincideCodigo &&
        coincideMonto &&
        coincideDesde &&
        coincideHasta &&
        coincideTipo &&
        coincideIdentificador
      );
    });
  }, [data, filtrosAvanzados]);

  const obtenerFiltrosAplicados = () => {
    const filtros = [];

    if (filtrosAvanzados?.montoMinimo)
      filtros.push(`Monto Mínimo: ${filtrosAvanzados.montoMinimo}`);
    if (filtrosAvanzados?.montoMaximo)
      filtros.push(`Monto Máximo: ${filtrosAvanzados.montoMaximo}`);
    if (filtrosAvanzados?.fechaDesde)
      filtros.push(
        `Fecha Desde: ${format(new Date(filtrosAvanzados.fechaDesde), 'PPP', {
          locale: es,
        })}`,
      );
    if (filtrosAvanzados?.fechaHasta)
      filtros.push(
        `Fecha Hasta: ${format(new Date(filtrosAvanzados.fechaHasta), 'PPP', {
          locale: es,
        })}`,
      );
    if (filtrosAvanzados?.tipo)
      filtros.push(
        `Cliente: ${
          filtrosAvanzados.tipo === 'persona' ? 'Persona' : 'Empresa'
        }`,
      );
    if (filtrosAvanzados?.identificador) {
      const labelIdentificador =
        filtrosAvanzados.tipo === 'persona'
          ? 'DNI'
          : filtrosAvanzados.tipo === 'empresa'
            ? 'RUC'
            : 'Identificador';
      filtros.push(`${labelIdentificador}: ${filtrosAvanzados.identificador}`);
    }
    if (filtrosAvanzados?.codigo)
      filtros.push(`Código: ${filtrosAvanzados.codigo}`);

    return filtros;
  };

  /* Table */
  const table = useReactTable({
    data: datosFiltrados,
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
    globalFilterFn: (row, columnId, filterValue) => {
      // Filtrar por identificador (RUC/DNI) o código
      const identificador =
        row.original.cliente?.tipo === 'empresa'
          ? row.original.cliente?.datos?.ruc
          : row.original.cliente?.datos?.dni;

      const codigo = row.original.code;

      return (
        identificador?.toLowerCase().includes(filterValue.toLowerCase()) ||
        codigo?.toLowerCase().includes(filterValue.toLowerCase())
      );
    },
  });

  /* Search */
  const [searchValue, setSearchValue] = useState('');

  const debouncedSearch = useDebouncedCallback((value) => {
    setGlobalFilter(value);
  }, TIME_DEBOUNCE);

  //Acceder al limpiar del modal

  const modalRef = useRef();

  //

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
          placeholder="Buscar por DNI/RUC o código"
          value={searchValue}
          onChange={(e) => {
            const trimmedValue = e.target.value.trim();
            setSearchValue(trimmedValue);
          }}
          className="max-w-sm"
        />
        <Button
          className="opacity-100 ml-2"
          onClick={() => setModalAbierto(true)}
        >
          Filtros avanzados
        </Button>
        <Button
          variant="secondary"
          className={`ml-2 transition-opacity border ${
            filtrosAvanzados ? 'opacity-100' : 'opacity-70 cursor-not-allowed'
          }`}
          onClick={() => {
            setFiltrosAvanzados(false);
            modalRef.current?.limpiarFiltroAvanzadoVentasModal();
          }}
        >
          Limpiar filtros
        </Button>
        <DataTableViewOptions table={table} />
      </div>

      {/* Mostrar filtros */}
      {Object.keys(filtrosAvanzados).some((key) => filtrosAvanzados[key]) && (
        <div className="flex gap-2 items-center mb-4">
          <p className="font-semibold text-sm">Filtros aplicados:</p>
          <div className="flex gap-2 flex-wrap">
            {obtenerFiltrosAplicados().map((filtro, index) => (
              <Badge
                key={index}
                variant="outline"
                className="text-sm font-thin"
              >
                {filtro}
              </Badge>
            ))}
          </div>
        </div>
      )}

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
                  Sin resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
      <FiltroAvanzadoVentasModal
        abierto={modalAbierto}
        setAbierto={setModalAbierto}
        onAplicarFiltros={(filtros) => {
          setFiltrosAvanzados(filtros);
          setModalAbierto(false);
        }}
        ref={modalRef}
      />
    </div>
  );
}
