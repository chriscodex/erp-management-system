'use client';

import { ArrowUpDown, ExternalLink } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { RiFileListLine } from '@remixicon/react';

import { Button } from '@/components/ui/button';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { formatDateShort } from '@/lib/formateador';

export const columnsOrdenesDeServicioHistoricas = [
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
            ? cliente?.datos?.razonSocial
            : cliente?.datos?.nombres + ' ' + cliente?.datos?.apellidos}
        </div>
      );
    },
  },
  {
    accessorKey: 'identificador',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Identificador
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
    accessorKey: 'fecha',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Fecha de ingreso
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
    accessorKey: 'origenServicio',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Origen del servicio
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const origenServicio = row?.original?.origenServicio;

      const origenServicioMap = {
        garantia: 'Garantía',
        pagado: 'Pagado',
        interno: 'Interno',
      };

      const displayOrigenServicio = origenServicioMap[origenServicio];

      return <div className="text-start">{displayOrigenServicio}</div>;
    },
  },
  {
    accessorKey: 'tipoServicio',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Tipo de servicio
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const tipoServicio = row?.original?.tipoServicio;

      const tipoServicioMap = {
        mantenimiento: 'Mantenimiento',
        reparacion: 'Reparación',
      };

      const displayTipoServicio = tipoServicioMap[tipoServicio];

      return <div className="text-start">{displayTipoServicio}</div>;
    },
  },
  {
    accessorFn: (row) => row?.code,
    id: 'Código',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
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
    id: 'ProductosServicios',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Productos / Servicios
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const productos = row.original?.productos || [];
      const totalProductos = productos.reduce(
        (sum, prod) => sum + (prod.cantidad || 0),
        0,
      );

      const servicios = row.original?.servicios || [];
      const totalServicios = servicios.length;

      return (
        <div className="text-center">
          {totalProductos} / {totalServicios}
        </div>
      );
    },
  },
  {
    id: 'Total',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Total
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const productos = row.original?.productos || [];

      const servicios = row.original?.servicios || [];

      const totalProductos = productos.reduce((sum, prod) => {
        const precio = prod.precioVenta || 0;
        const cantidad = prod.cantidad || 0;
        return sum + precio * cantidad;
      }, 0);

      const totalServicios = servicios.reduce((sum, ser) => {
        const precio = ser.precio || 0;
        return sum + precio;
      }, 0);

      const totalOrdenDeServicio = totalProductos + totalServicios;

      return (
        <div className="text-start">S/ {totalOrdenDeServicio.toFixed(2)}</div>
      );
    },
  },
  {
    id: 'actions',
    header: 'Acciones',
    cell: ({ row }) => {
      const { _id: id } = row.original;

      const router = useRouter();

      /* Manejar estado de eliminar marca */
      //   const [isOpenDialogDelete, setIsOpenDialogDelete] = useState(false);

      return (
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className="cursor-pointer flex"
                onClick={() =>
                  router.push(`/taller/ordenes-servicio-historial/${id}`)
                }
              >
                <RiFileListLine className="w-5 h-5 text-muted-foreground hover:text-foreground" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="flex items-center justify-center gap-1">
                Detalle
                <ExternalLink className="h-3 w-3" />
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
];
