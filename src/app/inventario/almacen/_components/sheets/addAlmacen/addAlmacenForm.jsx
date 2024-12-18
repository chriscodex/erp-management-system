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
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { addAlmacenSchema } from '@/app/inventario/almacen/_services/validations/addAlmacenSchema';
import { createAlmacenRequestClient } from '@/app/inventario/almacen/_services/requests';
import { Button } from '@/components/ui/button';

export function AddAlmacenForm({ onClose }) {
  const router = useRouter();

  const addAlmacenForm = useForm({
    resolver: zodResolver(addAlmacenSchema),
    defaultValues: {
      nombre: '',
      descripcion: '',
      ubicacion: '',
    },
  });

  const {
    handleSubmit,
    control,
    clearErrors,
    reset: resetForm,
  } = addAlmacenForm;

  const [formSubmitIsLoading, setFormSubmitIsLoading] = useState(false);

  // Manejo de formulario
  const onSubmit = handleSubmit(async (data) => {
    setFormSubmitIsLoading(true);

    // Toast promise para buscar una persona
    toast.promise(createAlmacenRequestClient(data, setFormSubmitIsLoading), {
      loading: 'Creando...',
      success: () => {
        clearErrors();
        resetForm();
        onClose();
        router.refresh();
        return `Almacén creado correctamente`;
      },
      error: (error) => {
        setFormSubmitIsLoading(false);
        return error;
      },
    });
  });

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Agregar Almacen</SheetTitle>
        <SheetDescription>
          Complete los detalles para crear un nuevo almacen.
        </SheetDescription>
      </SheetHeader>
      <Form {...addAlmacenForm}>
        <form onSubmit={onSubmit} className="grid gap-4 py-4">
          <FormField
            control={control}
            name="nombre"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Nombre</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input
                      placeholder="Nombre"
                      className="pl-2"
                      autoComplete="off"
                      disabled={formSubmitIsLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="descripcion"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Descripción (Opcional)</FormLabel>
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
          <FormField
            control={control}
            name="ubicacion"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Ubicación</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input
                      placeholder="Ubicación"
                      className="pl-2"
                      autoComplete="off"
                      disabled={formSubmitIsLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <SheetFooter>
            <SheetClose asChild>
              <Button
                className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2`}
                role="button"
                type="submit"
                disabled={formSubmitIsLoading}
                onClick={onSubmit}
              >
                Agregar
              </Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </Form>
    </SheetContent>
  );
}
