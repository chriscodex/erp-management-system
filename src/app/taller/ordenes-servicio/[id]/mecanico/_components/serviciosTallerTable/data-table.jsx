'use client';

import { useEffect, useState } from 'react';
import { ArrowUpDown, CalendarIcon, Edit, Text } from 'lucide-react';
import { RiDeleteBinLine } from '@remixicon/react';

import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from '@tanstack/react-table';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';

import { AddFormCalendar } from '@/components/calendars/addFormCalendar';
import { format } from 'date-fns'; //Calendar
import { es } from 'date-fns/locale'; //Calendar

import { cn } from '@/lib/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
  SheetFooter,
} from '@/components/ui/sheet';
import { formatMoney, generarNumeroAleatorioSeisDigitos } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { SheetAddServicioWrapper } from '@/app/taller/ordenes-servicio/[id]/mecanico/_components/sheets/addServicio/sheetAddServicioWrapper';
import { MoneyInputField } from '@/components/formInputs/MoneyInputField';
import { formatDateShort } from '@/lib/formateador';
import { zodResolver } from '@hookform/resolvers/zod';
import { servicioSchema } from '@/app/taller/ordenes-servicio/[id]/mecanico/_services/validations/servicioSchemaForm';

export function ServiciosTallerTable({ serviciosTaller, setServiciosTaller }) {
  const updateRowValue = (internalId, key, value) => {
    setServiciosTaller((prevData) =>
      prevData.map((row) =>
        row.internalId === internalId ? { ...row, [key]: value } : row,
      ),
    );
  };

  const deleteProduct = (internalId) => {
    setServiciosTaller((prevData) => {
      // Filtra el producto a eliminar
      const updatedData = prevData.filter(
        (row) => row.internalId !== internalId,
      );
      // Reasigna la numeración
      return updatedData.map((row, index) => ({
        ...row,
        numeracion: index + 1,
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
      accessorKey: 'descripcion',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Descripcion
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return <div className="text-start">{row.getValue('descripcion')}</div>;
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
            Fecha
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="text-start">
            {formatDateShort(row.getValue('fecha'), false)}
          </div>
        );
      },
    },
    {
      accessorKey: 'precio',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Precio
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const precio = row.getValue('precio');
        return <div className="text-start">S/. {formatMoney(precio)}</div>;
      },
    },
    {
      id: 'actions',
      header: 'Acciones',
      cell: ({ row }) => {
        const servicioData = row.original;

        const defaultDate = servicioData.fecha
          ? new Date(servicioData.fecha)
          : null;

        const [date, setDate] = useState(defaultDate); //Date Calendar
        const [open, setOpen] = useState(false); //Close calendar

        // Estados de carga
        const [formSubmitIsLoading, setFormSubmitIsLoading] = useState(false);

        const updateForm = useForm({
          resolver: zodResolver(servicioSchema),
          defaultValues: {
            descripcion: servicioData.descripcion || '',
            precio: servicioData.precio || '',
            fecha: new Date(servicioData.fecha),
          },
        });

        const { control, handleSubmit } = updateForm;

        const onSubmit = handleSubmit(async (data) => {
          setFormSubmitIsLoading(true);

          updateRowValue(
            servicioData.internalId,
            'descripcion',
            data.descripcion,
          );
          updateRowValue(
            servicioData.internalId,
            'precio',
            parseFloat(data.precio),
          );
          updateRowValue(
            servicioData.internalId,
            'fecha',
            data.fecha.toISOString(),
          );
        });

        return (
          <div className="flex items-center space-x-3">
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="cursor-pointer flex">
                    <Sheet>
                      <SheetTrigger className="text-start">
                        <Edit className="w-5 h-5 text-muted-foreground hover:text-foreground" />
                      </SheetTrigger>
                      <SheetContent>
                        <SheetHeader>
                          <SheetTitle>
                            Servicio N°{servicioData?.numeracion}
                          </SheetTitle>
                          <SheetDescription>
                            Modifique la información del servicio actual. Luego
                            pulse en actualizar
                          </SheetDescription>
                        </SheetHeader>
                        <Form {...updateForm}>
                          <form onSubmit={onSubmit} className="grid gap-4 py-4">
                            <FormField
                              control={control}
                              name="descripcion"
                              render={({ field }) => (
                                <FormItem className="space-y-2">
                                  <FormLabel>Descripción</FormLabel>
                                  <div className="relative">
                                    <Text className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <FormControl>
                                      <Textarea
                                        className="pl-8"
                                        disabled={formSubmitIsLoading}
                                        {...field}
                                        placeholder="Escribe la descripción aquí"
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </div>
                                </FormItem>
                              )}
                            />
                            <MoneyInputField
                              control={control}
                              name="precio"
                              title="Precio"
                              formSubmitIsLoading={formSubmitIsLoading}
                            />
                            <FormField
                              control={control}
                              name="fecha"
                              render={({ field }) => (
                                <FormItem className="flex flex-col space-y-2">
                                  <FormLabel>Fecha</FormLabel>
                                  <FormControl>
                                    <Popover open={open} onOpenChange={setOpen}>
                                      <PopoverTrigger asChild>
                                        <Button
                                          variant={'outline'}
                                          className={cn(
                                            'w-[280px] justify-start text-left font-normal',
                                            !date && 'text-muted-foreground',
                                          )}
                                        >
                                          <CalendarIcon className="mr-2 h-4 w-4" />
                                          {date ? (
                                            format(date, 'PPP', { locale: es })
                                          ) : (
                                            <span>Selecciona una fecha</span>
                                          )}
                                        </Button>
                                      </PopoverTrigger>
                                      <PopoverContent className="w-auto p-0">
                                        <AddFormCalendar
                                          captionLayout="dropdown-buttons"
                                          fromYear={2020}
                                          toYear={new Date().getFullYear()}
                                          mode="single"
                                          selected={date}
                                          onSelect={(selectedDate) => {
                                            if (selectedDate) {
                                              field.onChange(selectedDate); // 🔹 Actualiza el valor en el formulario
                                              setDate(selectedDate); // Guarda la fecha seleccionada
                                              setOpen(false); // Cierra el Popover
                                            }
                                          }}
                                          locale={es}
                                          calendarDate={field.value}
                                          initialFocus
                                        />
                                      </PopoverContent>
                                    </Popover>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <SheetFooter>
                              <SheetClose asChild>
                                <Button
                                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
                                  role="button"
                                  type="submit"
                                  disabled={formSubmitIsLoading}
                                  onClick={onSubmit}
                                >
                                  Actualizar
                                </Button>
                              </SheetClose>
                            </SheetFooter>
                          </form>
                        </Form>
                      </SheetContent>
                    </Sheet>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Editar</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className="cursor-pointer"
                    onClick={() => deleteProduct(servicioData?.internalId)}
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
    data: serviciosTaller,
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

  const handleAgregarServicio = (nuevoServicio) => {
    const servicioFromateado = {
      ...nuevoServicio,
      internalId: generarNumeroAleatorioSeisDigitos(),
      numeracion: serviciosTaller.length + 1,
      precio: Number(nuevoServicio.precio),
      fecha: new Date(nuevoServicio.fecha).toISOString(),
    };
    setServiciosTaller((prev) => [...prev, servicioFromateado]);
  };

  const [totalPrecio, setTotalPrecio] = useState(0);

  useEffect(() => {
    console.log(serviciosTaller);
    const total = serviciosTaller.reduce((acc, servicio) => {
      return acc + servicio.precio;
    }, 0);
    setTotalPrecio(total);
  }, [serviciosTaller]);

  return (
    <div>
      {/* Input */}
      <div className="flex gap-2 items-center py-4 w-full">
        <SheetAddServicioWrapper onAgregarServicio={handleAgregarServicio} />
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
                  Sin servicios.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="w-full flex justify-end mt-4">
        <Label className="font-bold">
          Total: S/. {formatMoney(totalPrecio)}
        </Label>
      </div>
    </div>
  );
}
