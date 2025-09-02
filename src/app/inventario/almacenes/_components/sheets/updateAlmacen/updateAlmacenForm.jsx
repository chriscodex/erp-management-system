'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Edit, Trash2 } from 'lucide-react';

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { updateAlmacenFormSchema } from '@/app/inventario/almacenes/_services/validations/updateAlmacenSchema';
import { updateAlmacenRequestClient } from '@/app/inventario/almacenes/_services/requests';
import { DeleteAlmacenAlert } from '@/app/inventario/almacenes/_components/dialogs/deleteAlmacenAlert';

export function UpdateAlmacenForm({ onClose, almacenData }) {
  const router = useRouter();

  const updateForm = useForm({
    resolver: zodResolver(updateAlmacenFormSchema),
    defaultValues: {
      nombre: almacenData?.nombre,
      descripcion: almacenData?.descripcion,
      ubicacion: almacenData?.ubicacion,
      estado: almacenData?.estado,
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
    const dataToUpdate = Object.keys(currentValues).reduce(
      (datosCambiados, key) => {
        if (currentValues[key] !== updateForm.formState.defaultValues[key]) {
          datosCambiados[key] = currentValues[key];
        }
        return datosCambiados;
      },
      {},
    );

    if (Object.keys(dataToUpdate).length === 0) {
      toast.error('No se han realizado cambios.');
      setFormSubmitIsLoading(false);
      return;
    }

    // Toast promise para buscar una persona
    toast.promise(
      updateAlmacenRequestClient(
        almacenData?._id,
        dataToUpdate,
        setFormSubmitIsLoading,
      ),
      {
        loading: 'Actualizando...',
        success: () => {
          clearErrors();
          resetForm();
          onClose();
          router.refresh();
          return `Almacén actualizada correctamente`;
        },
        error: (error) => {
          setFormSubmitIsLoading(false);
          return error;
        },
      },
    );
  });

  const [isOpenDialogDelete, setIsOpenDialogDelete] = useState(false);

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>{almacenData?.nombre}</SheetTitle>
        <SheetDescription>
          Modifique la información del almacén actual. Luego pulse en actualizar
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
            name="estado"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Estado</FormLabel>
                <div className="relative">
                  <Select
                    defaultValue={almacenData?.estado}
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
                <Edit />
                Actualizar
              </Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </Form>
      <div className="w-full flex justify-end">
        <Button
          variant="destructive"
          disabled={formSubmitIsLoading}
          onClick={() => setIsOpenDialogDelete(true)}
        >
          <Trash2 />
          Eliminar
        </Button>
      </div>
      <DeleteAlmacenAlert
        isOpen={isOpenDialogDelete}
        setIsOpen={setIsOpenDialogDelete}
        actionAfterComplete="refresh"
        almacenId={almacenData?._id}
      />
    </SheetContent>
  );
}
