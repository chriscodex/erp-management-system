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
import { updateGastoGeneralSchema } from '@/app/gastos-generales/_services/validations/updateGastoGeneralSchema';
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
import { updateGastoGeneralRequestClient } from '@/app/gastos-generales/_services/requests';

export function UpdateGastoGeneralForm({ onClose, gastoGeneralData}) {

  const router = useRouter();
  const [date, setDate] = useState(new Date(gastoGeneralData?.fecha));

  const updateGastoGeneralForm = useForm({
    resolver: zodResolver(updateGastoGeneralSchema),
    defaultValues: {
      descripcion: gastoGeneralData?.descripcion,
      monto: gastoGeneralData?.monto,
      fecha: gastoGeneralData?.fecha,
    },
  });

  const {
    handleSubmit,
    control,
    clearErrors,
    watch,
    reset: resetForm,
  } = updateGastoGeneralForm;

  const [formSubmitIsLoading, setFormSubmitIsLoading] = useState(false);

  // Manejo de formulario
  const onSubmit = handleSubmit(async (gastoGeneralDataForm) => {
    setFormSubmitIsLoading(true);

    // Obtener los valores actuales del formulario
    const currentValues = watch();

    // Comparar los valores actuales con los valores iniciales y construir un objeto con los cambios
    const gastoGeneralDataToUpdate = Object.keys(currentValues).reduce(
      (datosCambiados, key) => {
        if (
          currentValues[key] !== updateGastoGeneralForm.formState.defaultValues[key]
        ) {
          datosCambiados[key] = currentValues[key];
        }
        return datosCambiados;
      },
      {}
    );
    if (new Date(gastoGeneralData?.fecha).getTime() !== date.getTime()) {
      gastoGeneralDataToUpdate['fecha'] = date;
    }

    if (Object.keys(gastoGeneralDataToUpdate).length === 0) {
      toast.error('No se han realizado cambios.');
      setFormSubmitIsLoading(false);
      return;
    }

    gastoGeneralDataForm['fecha'] = date;

    toast.promise(
      updateGastoGeneralRequestClient(
        gastoGeneralData?._id,
        gastoGeneralDataForm,
        setFormSubmitIsLoading
      ),
      {
        loading: 'Actualizando...',
        success: () => {
          clearErrors();
          resetForm();
          onClose();
          router.refresh();
          return `Gasto general actualizado correctamente`;
        },
        error: (error) => {
          setFormSubmitIsLoading(false);
          return error;
        },
      }
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
      <Form {...updateGastoGeneralForm}>
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
                    formSubmitIsLoading ? 'opacity-50 cursor-not-allowed' : ''
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
                  defaultMonth={new Date(gastoGeneralData?.fecha)}
                  selected={date}
                  onSelect={setDate}
                  locale={es}
                  calendarDate={gastoGeneralData?.fecha}
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
