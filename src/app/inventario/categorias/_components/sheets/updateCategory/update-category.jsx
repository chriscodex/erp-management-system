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
import { updateCategorySchema } from '@/app/inventario/categorias/_services/validations/updateCategorySchema';
import { Input } from '@/components/ui/input';
import { updateCategory } from '@/app/inventario/categorias/_services/requests';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function UpdateCategory({ segments, onClose, categoryData }) {
  const router = useRouter();

  const updateCategoryForm = useForm({
    resolver: zodResolver(updateCategorySchema),
    defaultValues: {
      nombre: categoryData?.nombre,
      descripcion: categoryData?.descripcion,
      estado: categoryData?.estado,
      segmentId: categoryData?.segmentId?._id,
    },
  });

  const {
    handleSubmit,
    control,
    clearErrors,
    reset: resetForm,
  } = updateCategoryForm;

  const [formSubmitIsLoading, setFormSubmitIsLoading] = useState(false);

  // Manejo de formulario
  const onSubmit = handleSubmit(async (data) => {
    const categoryObject = {
      ...data,
      _id: categoryData?._id,
    };
    setFormSubmitIsLoading(true);

    // Toast promise para buscar una persona
    toast.promise(updateCategory(categoryObject, setFormSubmitIsLoading), {
      loading: 'Actualizando...',
      success: () => {
        clearErrors();
        resetForm();
        onClose();
        router.refresh();
        return `Categoría actualizada exitosamente`;
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
        <SheetTitle>{categoryData?.nombre}</SheetTitle>
        <SheetDescription>
          Modifique la información de la categoría actual. Luego pulse en
          actualizar
        </SheetDescription>
      </SheetHeader>
      <Form {...updateCategoryForm}>
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
            name="segmentId"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Segmento</FormLabel>
                <div className="relative">
                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                    disabled={formSubmitIsLoading}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full pl-2">
                        <SelectValue placeholder="Seleccione un segmento" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {segments?.map((segment) => (
                        <SelectItem key={segment?._id} value={segment?._id}>
                          {segment?.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                    defaultValue={categoryData?.estado}
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
              <div
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
                role="button"
                type="submit"
                disabled={formSubmitIsLoading}
                onClick={onSubmit}
              >
                Actualizar
              </div>
            </SheetClose>
          </SheetFooter>
        </form>
      </Form>
    </SheetContent>
  );
}
