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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { updateProveedorFormSchema } from '@/app/contactos/proveedores/_services/validations/updateProveedorFormSchema';
import { updateProveedorRequestClient } from '@/app/contactos/proveedores/_services/requests';
import {
  onChangeCelular,
  onChangeNumero,
} from '@/components/formInputs/onChange';

export function UpdateProveedorForm({ onClose, proveedorData }) {
  const router = useRouter();

  const updateForm = useForm({
    resolver: zodResolver(updateProveedorFormSchema),
    defaultValues: {
      nombre: proveedorData?.nombre,
      ruc: proveedorData?.ruc,
      direccion: proveedorData?.direccion,
      celular: proveedorData?.celular,
      estado: proveedorData?.estado,
    },
  });

  const {
    handleSubmit,
    control,
    clearErrors,
    watch,
    reset: resetForm,
  } = updateForm;

  const [formSubmitIsLoading, setFormSubmitIsLoading] = useState(false);

  // Manejo de formulario
  const onSubmit = handleSubmit(async () => {
    setFormSubmitIsLoading(true);

    // Obtener los valores actuales del formulario
    const currentValues = watch();

    // Comparar los valores actuales con los valores iniciales y construir un objeto con los cambios
    const proveedorDataToUpdate = Object.keys(currentValues).reduce(
      (datosCambiados, key) => {
        if (currentValues[key] !== updateForm.formState.defaultValues[key]) {
          datosCambiados[key] = currentValues[key];
        }
        return datosCambiados;
      },
      {},
    );

    if (Object.keys(proveedorDataToUpdate).length === 0) {
      toast.error('No se han realizado cambios.');
      setFormSubmitIsLoading(false);
      return;
    }

    // Toast promise para buscar una persona
    toast.promise(
      updateProveedorRequestClient(
        proveedorData?._id,
        proveedorDataToUpdate,
        setFormSubmitIsLoading,
      ),
      {
        loading: 'Actualizando...',
        success: () => {
          clearErrors();
          resetForm();
          onClose();
          router.refresh();
          return `Proveedor actualizado correctamente`;
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
        <SheetTitle>{proveedorData?.nombre}</SheetTitle>
        <SheetDescription>
          Modifique la información del proveedor actual. Luego pulse en
          actualizar
        </SheetDescription>
      </SheetHeader>
      <Form {...updateForm}>
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
          <FormField
            control={control}
            name="estado"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Estado</FormLabel>
                <div className="relative">
                  <Select
                    defaultValue={proveedorData?.estado}
                    onValueChange={field.onChange}
                    disabled={formSubmitIsLoading}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full pl-2">
                        <SelectValue placeholder="Seleccione un estado" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="activo">Activo</SelectItem>
                      <SelectItem value="inactivo">Inactivo</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
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
