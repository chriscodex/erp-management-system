'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { updateGastoSchema } from '@/app/inventario/productos/[id]/gastos/_services/validations/updateGastoSchema';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { MoneyInputField } from '@/components/formInputs/MoneyInputField';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { UpdateFormCalendar } from '@/components/calendars/updateFormCalendar';
import { updateGastoRequestClient } from '@/app/inventario/productos/[id]/gastos/_services/requests';

export function UpdateGastoForm({ onClose, gastoData, productId }) {
  const router = useRouter();
  const [date, setDate] = useState(new Date(gastoData?.fecha));

  const updateGastoProductoForm = useForm({
    resolver: zodResolver(updateGastoSchema),
    defaultValues: {
      descripcion: gastoData?.descripcion,
      monto: gastoData?.monto,
      fecha: gastoData?.fecha,
    },
  });

  const {
    handleSubmit,
    control,
    clearErrors,
    watch,
    reset: resetForm,
  } = updateGastoProductoForm;

  const [formSubmitIsLoading, setFormSubmitIsLoading] = useState(false);

  // Manejo de formulario
  const onSubmit = handleSubmit(async (gastoDataForm) => {
    setFormSubmitIsLoading(true);

    // Obtener los valores actuales del formulario
    const currentValues = watch();

    // Comparar los valores actuales con los valores iniciales y construir un objeto con los cambios
    const gastoDataToUpdate = Object.keys(currentValues).reduce(
      (datosCambiados, key) => {
        if (
          currentValues[key] !==
          updateGastoProductoForm.formState.defaultValues[key]
        ) {
          datosCambiados[key] = currentValues[key];
        }
        return datosCambiados;
      },
      {},
    );
    if (new Date(gastoData?.fecha).getTime() !== date.getTime()) {
      gastoDataToUpdate['fecha'] = date;
    }

    if (Object.keys(gastoDataToUpdate).length === 0) {
      toast.error('No se han realizado cambios.');
      setFormSubmitIsLoading(false);
      return;
    }
    console.log(gastoDataToUpdate);

    gastoDataForm['fecha'] = date;

    toast.promise(
      updateGastoRequestClient(
        gastoData?._id,
        productId,
        gastoDataForm,
        setFormSubmitIsLoading,
      ),
      {
        loading: 'Actualizando...',
        success: () => {
          clearErrors();
          resetForm();
          onClose();
          router.refresh();
          return `Gasto actualizado correctamente`;
        },
        error: (error) => {
          setFormSubmitIsLoading(false);
          return error;
        },
      },
    );
  });

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Actualizar Gasto</SheetTitle>
        <SheetDescription>
          Modifique la información del gasto actual. Luego pulse en actualizar
        </SheetDescription>
      </SheetHeader>
      <Form {...updateGastoProductoForm}>
        <form onSubmit={onSubmit} className="grid gap-4 py-4">
          <FormField
            control={control}
            name="descripcion"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Descripción</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Textarea
                      disabled={formSubmitIsLoading}
                      {...field}
                      placeholder="Escribe la descripción aquí."
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <MoneyInputField
            control={control}
            name="monto"
            title="Monto"
            formSubmitIsLoading={formSubmitIsLoading}
          />
          <div className="col-span-1 flex flex-col space-y-3">
            <Label>Fecha</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={'outline'}
                  className={cn(
                    'w-[280px] justify-start text-left font-normal',
                    !date && 'text-muted-foreground',
                    formSubmitIsLoading ? 'opacity-50 cursor-not-allowed' : '',
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
                <UpdateFormCalendar
                  captionLayout="dropdown-buttons"
                  fromYear={2020}
                  toYear={new Date().getFullYear()}
                  mode="single"
                  defaultMonth={new Date(gastoData?.fecha)}
                  selected={date}
                  onSelect={setDate}
                  locale={es}
                  calendarDate={gastoData?.fecha}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button disabled={formSubmitIsLoading} onClick={onSubmit}>
                Actualizar
              </Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </Form>
    </SheetContent>
  );
}
