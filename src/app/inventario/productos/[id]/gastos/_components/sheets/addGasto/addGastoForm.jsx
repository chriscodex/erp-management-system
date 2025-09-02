'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { AddFormCalendar } from '@/components/calendars/addFormCalendar';
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
import {
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { addGastoSchema } from '@/app/inventario/productos/[id]/gastos/_services/validations/addGastoSchema';
import { Textarea } from '@/components/ui/textarea';
import { MoneyInputField } from '@/components/formInputs/MoneyInputField';
import { addGastoRequestClient } from '@/app/inventario/productos/[id]/gastos/_services/requests';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';

export function AddGastoForm({ onClose, productId }) {
  const router = useRouter();

  const [date, setDate] = useState(new Date());

  const addGastoProductoForm = useForm({
    resolver: zodResolver(addGastoSchema),
    defaultValues: {
      descripcion: '',
      monto: '',
      fecha: new Date(),
    },
  });

  const {
    handleSubmit,
    control,
    clearErrors,
    reset: resetForm,
  } = addGastoProductoForm;

  const [formSubmitIsLoading, setFormSubmitIsLoading] = useState(false);

  // Manejo de formulario
  const onSubmit = handleSubmit(async (data) => {
    setFormSubmitIsLoading(true);

    const gastoData = {
      ...data,
      fecha: new Date(date),
    };

    // Toast promise para buscar una persona
    toast.promise(
      addGastoRequestClient(productId, gastoData, setFormSubmitIsLoading),
      {
        loading: 'Creando...',
        success: () => {
          clearErrors();
          resetForm();
          onClose();
          router.refresh();
          return `Gasto creado correctamente`;
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
        <SheetTitle>Agregar Gasto</SheetTitle>
        <SheetDescription>
          Complete los detalles para crear una nuevo gasto.
        </SheetDescription>
      </SheetHeader>
      <Form {...addGastoProductoForm}>
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
                  onSelect={setDate}
                  locale={es}
                  calendarDate={date}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <div
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
                role="button"
                type="submit"
                disabled={formSubmitIsLoading}
                onClick={onSubmit}
              >
                Agregar
              </div>
            </SheetClose>
          </SheetFooter>
        </form>
      </Form>
    </SheetContent>
  );
}
