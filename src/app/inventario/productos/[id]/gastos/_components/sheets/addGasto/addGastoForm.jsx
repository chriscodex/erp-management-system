'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

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

export function AddGastoForm({ onClose, productId }) {
  const router = useRouter();

  const addCategoryForm = useForm({
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
  } = addCategoryForm;

  const [formSubmitIsLoading, setFormSubmitIsLoading] = useState(false);

  // Manejo de formulario
  const onSubmit = handleSubmit(async (data) => {
    setFormSubmitIsLoading(true);

    // Toast promise para buscar una persona
    toast.promise(
      addGastoRequestClient(productId, data, setFormSubmitIsLoading),
      {
        loading: 'Creando...',
        success: () => {
          clearErrors();
          resetForm();
          onClose();
          router.refresh();
          return `Gasto creado exitosamente`;
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
        <SheetTitle>Agregar Gasto</SheetTitle>
        <SheetDescription>
          Complete los detalles para crear una nuevo gasto.
        </SheetDescription>
      </SheetHeader>
      <Form {...addCategoryForm}>
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
