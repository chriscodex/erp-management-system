// Librerías base
import { useForm, useWatch } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { AddFormCalendar } from '@/components/calendars/addFormCalendar';
import { IdCardIcon } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { forwardRef, useImperativeHandle } from 'react';
import { onChangeNumero } from '@/components/formInputs/onChange';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { MoneyInputField } from '@/components/formInputs/MoneyInputField';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarIcon } from 'lucide-react';
import { RiCalendarTodoLine, RiHashtag, RiUser3Line } from '@remixicon/react';
import { filtroAvanzadoSchema } from '@/app/ventas/ventas-historicas/_services/validations/filtroAvanzadoSchema';

export const FiltroAvanzadoVentasModal = forwardRef(
  ({ abierto, setAbierto, onAplicarFiltros }, ref) => {
    const [fechaDesdeDate, setFechaDesdeDate] = useState(undefined);
    const [fechaHastaDate, setFechaHastaDate] = useState(undefined);

    const [openDesde, setOpenDesde] = useState(false);
    const [openHasta, setOpenHasta] = useState(false);

    const form = useForm({
      resolver: zodResolver(filtroAvanzadoSchema),
      defaultValues: {
        codigo: '',
        montoMinimo: '',
        montoMaximo: '',
        fechaDesde: undefined,
        fechaHasta: undefined,
        tipo: undefined,
        identificador: '',
      },
    });

    const {
      handleSubmit,
      // register,
      watch,
      setValue,
      control,
      clearErrors,
      // setError,
    } = form;

    const onSubmit = (data) => {
      onAplicarFiltros(data);
    };

    //Si codigo esta lleno, desactiva los otros inputs

    const codigoActivo = watch('codigo')?.trim().length > 0;

    //Controlar si algún campo está lleno, para activar el input de código
    const [codigoDeshabilitado, setCodigoDeshabilitado] = useState(false);

    // Observamos los valores individuales con useWatch
    const montoMinimo = useWatch({ control, name: 'montoMinimo' });
    const montoMaximo = useWatch({ control, name: 'montoMaximo' });
    const fechaDesde = useWatch({ control, name: 'fechaDesde' });
    const fechaHasta = useWatch({ control, name: 'fechaHasta' });
    const tipo = useWatch({ control, name: 'tipo' });
    const identificador = useWatch({ control, name: 'identificador' });

    useEffect(() => {
      const otrosCampos = [
        montoMinimo,
        montoMaximo,
        fechaDesde,
        fechaHasta,
        tipo,
        identificador,
      ];

      const hayAlgunCampoLleno = otrosCampos.some(
        (valor) =>
          valor !== undefined &&
          valor !== null &&
          valor !== '' &&
          !(typeof valor === 'string' && valor.trim() === ''),
      );

      setCodigoDeshabilitado(hayAlgunCampoLleno);
    }, [montoMinimo, montoMaximo, fechaDesde, fechaHasta, tipo, identificador]);

    // function limpiarFiltroAvanzadoVentasModal(form) {
    //   form.reset();
    //   setFechaDesdeDate(new Date());
    //   setFechaHastaDate(new Date());
    // }

    // La función que limpia el formulario
    function limpiarFiltroAvanzadoVentasModal() {
      // Aquí nos aseguramos de que form esté correctamente definido antes de intentar usarlo
      if (form) {
        form.reset(); // Limpiar formulario
        setFechaDesdeDate(undefined);
        setFechaHastaDate(undefined);
      } else {
        console.error('Formulario no definido');
      }
    }

    useImperativeHandle(ref, () => ({
      limpiarFiltroAvanzadoVentasModal,
    }));

    return (
      <>
        <Dialog
          className="grid gap-4 py-4"
          open={abierto}
          onOpenChange={setAbierto}
        >
          <DialogContent className="w-full max-w-[95vw] sm:max-w-2xl">
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <DialogHeader className={'text-left mb-4'}>
                  <DialogTitle>Filtrar Ventas en el Historial</DialogTitle>
                  <DialogDescription>
                    Puedes buscar por código de venta o usar los filtros
                    avanzados.
                  </DialogDescription>
                </DialogHeader>
                <div className="relative grid grid-cols-2 gap-2">
                  <FormField
                    control={control}
                    name="codigo"
                    render={({ field }) => (
                      <FormItem className="space-y-2 col-span-2">
                        <FormLabel>Código de Venta</FormLabel>
                        <div className="relative">
                          <RiHashtag className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                          <FormControl>
                            <Input
                              placeholder="Escriba el código de la venta"
                              className="pl-8"
                              autoComplete="off"
                              disabled={codigoDeshabilitado}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </div>
                        {codigoActivo && (
                          <p className="text-sm text-muted-foreground italic">
                            Se desactivaron los demás filtros porque estás
                            buscando por un código único.
                          </p>
                        )}
                      </FormItem>
                    )}
                  />
                  <MoneyInputField
                    control={control}
                    name="montoMinimo"
                    title="Monto Mínimo"
                    formSubmitIsLoading={codigoActivo}
                  />
                  <MoneyInputField
                    control={control}
                    name="montoMaximo"
                    title="Monto Máximo"
                    formSubmitIsLoading={codigoActivo}
                  />
                  <Card className="space-y-2 col-span-2">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <div className="flex items-center gap-2">
                        <RiCalendarTodoLine className="h-4 w-4" />
                        <CardTitle>Rango de Fechas</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={control}
                        name="fechaDesde"
                        render={({ field }) => (
                          <FormItem className="flex flex-col space-y-2">
                            <FormLabel>Fecha Desde</FormLabel>
                            <FormControl>
                              <Popover
                                open={openDesde}
                                onOpenChange={setOpenDesde}
                              >
                                <PopoverTrigger asChild>
                                  <Button
                                    variant={'outline'}
                                    disabled={codigoActivo}
                                    className={cn(
                                      'w-[280px] justify-start text-left font-normal',
                                      !fechaDesdeDate &&
                                        'text-muted-foreground',
                                    )}
                                  >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {fechaDesdeDate ? (
                                      format(fechaDesdeDate, 'PPP', {
                                        locale: es,
                                      })
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
                                    selected={fechaDesdeDate}
                                    onSelect={(selectedDate) => {
                                      if (selectedDate) {
                                        field.onChange(selectedDate);
                                        setFechaDesdeDate(selectedDate);
                                        setOpenDesde(false);
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
                      <FormField
                        control={control}
                        name="fechaHasta"
                        render={({ field }) => (
                          <FormItem className="flex flex-col space-y-2">
                            <FormLabel>Fecha Hasta</FormLabel>
                            <FormControl>
                              <Popover
                                open={openHasta}
                                onOpenChange={setOpenHasta}
                              >
                                <PopoverTrigger asChild>
                                  <Button
                                    variant={'outline'}
                                    disabled={codigoActivo}
                                    className={cn(
                                      'w-[280px] justify-start text-left font-normal',
                                      !fechaHastaDate &&
                                        'text-muted-foreground',
                                    )}
                                  >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {fechaHastaDate ? (
                                      format(fechaHastaDate, 'PPP', {
                                        locale: es,
                                      })
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
                                    selected={fechaHastaDate}
                                    onSelect={(selectedDate) => {
                                      if (selectedDate) {
                                        field.onChange(selectedDate);
                                        setFechaHastaDate(selectedDate);
                                        setOpenHasta(false);
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
                    </CardContent>
                  </Card>
                  <Card className="space-y-2 col-span-2">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <div className="flex items-center gap-2">
                        <RiUser3Line className="h-4 w-4" />
                        <CardTitle>Información del cliente</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="grid  gap-4">
                      <FormField
                        control={control}
                        name="tipo"
                        render={({ field }) => (
                          <FormItem className="mb-3">
                            <FormControl>
                              <RadioGroup
                                onValueChange={(value) => {
                                  field.onChange(value);
                                  setValue('identificador', '');
                                  clearErrors('identificador');
                                }}
                                // defaultValue={field.value}
                                value={field.value}
                                className="flex flex-row items-center space-x-4"
                                disabled={codigoActivo}
                              >
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem
                                      value="persona"
                                      id="persona"
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    Persona Natural
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem
                                      value="empresa"
                                      id="empresa"
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    Empresa
                                  </FormLabel>
                                </FormItem>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={control}
                        name="identificador"
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            {/* <FormLabel>
                            {watch("tipo") === "persona" ? "DNI" : "RUC"}
                          </FormLabel> */}
                            <div className="relative">
                              <IdCardIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                              <FormControl>
                                <Input
                                  type="text"
                                  placeholder={
                                    watch('tipo') === 'persona' ? 'DNI' : 'RUC'
                                  }
                                  className="pl-8"
                                  autoComplete="off"
                                  disabled={codigoActivo}
                                  {...field}
                                  onChange={(e) => {
                                    onChangeNumero(e, field);
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </div>
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                  <div className="col-span-2 flex flex-row gap-2 justify-end">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        limpiarFiltroAvanzadoVentasModal();
                      }}
                    >
                      Limpiar
                    </Button>
                    <Button type="submit">Aplicar</Button>
                  </div>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </>
    );
  },
);

//Asignar displayName
FiltroAvanzadoVentasModal.displayName = 'FiltroAvanzadoVentasModal';
