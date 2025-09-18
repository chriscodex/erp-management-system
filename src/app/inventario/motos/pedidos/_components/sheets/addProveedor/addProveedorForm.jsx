'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { toast } from 'sonner';

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
import { addProveedorFormSchema } from '@/app/contactos/proveedores/_services/validations/addProveedorFormSchema';
import {
  onChangeCelular,
  onChangeNumero,
} from '@/components/formInputs/onChange';
import { createProveedorRequestClient } from '@/app/contactos/proveedores/_services/requests';
import { Button } from '@/components/ui/button';

export function AddProveedorForm({ onClose, onAddProveedor }) {
  // const router = useRouter();

  const addForm = useForm({
    resolver: zodResolver(addProveedorFormSchema),
    defaultValues: {},
  });

  const { handleSubmit, control, clearErrors, reset: resetForm } = addForm;

  const [formSubmitIsLoading, setFormSubmitIsLoading] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    setFormSubmitIsLoading(true);

    toast.promise(createProveedorRequestClient(data, setFormSubmitIsLoading), {
      loading: 'Creando...',
      success: (nuevoProveedor) => {
        if (nuevoProveedor && onAddProveedor) {
          onAddProveedor(nuevoProveedor);
        }
        clearErrors();
        resetForm();
        onClose();
        console.log(nuevoProveedor);
        return 'Proveedor creado correctamente';
      },

      error: (error) => {
        console.error('❌ Error inesperado:', error);
        return typeof error === 'string'
          ? error
          : error?.message || 'Error desconocido';
      },
    });
  });

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Agregar Proveedor</SheetTitle>
        <SheetDescription>
          Complete los detalles del nuevo proveedor
        </SheetDescription>
      </SheetHeader>
      <Form {...addForm}>
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
            name="ruc"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>RUC</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input
                      placeholder="12345678910"
                      autoComplete="off"
                      disabled={formSubmitIsLoading}
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
          <FormField
            control={control}
            name="direccion"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Dirección</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input
                      placeholder="Dirección"
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
            name="celular"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Celular</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input
                      placeholder="987654321"
                      autoComplete="off"
                      disabled={formSubmitIsLoading}
                      {...field}
                      onChange={(e) => {
                        onChangeCelular(e, field);
                      }}
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
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
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
