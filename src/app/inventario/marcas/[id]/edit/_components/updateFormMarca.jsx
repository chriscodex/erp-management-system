'use client';

import { useState } from 'react';
import { RiArrowLeftLine, RiInstanceFill } from '@remixicon/react';
import { Info, Save, Tag } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { updateMarcaSchema } from '@/app/inventario/marcas/[id]/edit/_services/validations/updateMarcaSchema';
import { Textarea } from '@/components/ui/textarea';
import { updateMarcaRequest } from '@/app/inventario/marcas/[id]/_services/requests.js';

export function UpdateFormMarca({ segments, marcaData }) {
  const router = useRouter();

  const updateMarcaForm = useForm({
    resolver: zodResolver(updateMarcaSchema),
    defaultValues: {
      nombre: marcaData?.nombre,
      descripcion: marcaData?.descripcion,
      estado: marcaData?.estado,
      segmentId: marcaData?.segmentId?._id,
    },
  });

  const { handleSubmit, control, clearErrors } = updateMarcaForm;

  const [formSubmitIsLoading, setFormSubmitIsLoading] = useState(false);

  // Manejo de formulario
  const onSubmit = handleSubmit(async (data) => {
    setFormSubmitIsLoading(true);

    // Toast promise para buscar una persona
    toast.promise(
      updateMarcaRequest(marcaData?._id, data, setFormSubmitIsLoading),
      {
        loading: 'Actualizando...',
        success: () => {
          clearErrors();
          // router.refresh();
          router.back();
          return `Marca actualizada exitosamente`;
        },
        error: (error) => {
          setFormSubmitIsLoading(false);
          return error;
        },
      }
    );
  });

  return (
    <Form {...updateMarcaForm}>
      <form onSubmit={onSubmit} className="space-y-8">
        <FormField
          control={control}
          name="nombre"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <RiInstanceFill className="h-5 w-5" />
                <FormLabel>Nombre</FormLabel>
              </div>
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
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Info className="h-5 w-5" />
                <FormLabel>Descripción (Opcional)</FormLabel>
              </div>
              <div className="relative">
                <FormControl>
                  <Textarea
                    disabled={formSubmitIsLoading}
                    {...field}
                    placeholder="Escribe una descripción para la marca aquí."
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
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Tag className="h-5 w-5" />
                <FormLabel>Segmento</FormLabel>
              </div>
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
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Tag className="h-5 w-5" />
                <FormLabel>Estado</FormLabel>
              </div>
              <div className="relative">
                <Select
                  defaultValue={marcaData?.estado}
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
        <div className="space-y-4">
          <div className="flex justify-end space-x-2 mt-4">
            <div className="flex space-x-2">
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  router.back();
                }}
                variant="outline"
              >
                <RiArrowLeftLine className="mr-2 h-4 w-4" />
                Cancelar
              </Button>
              <Button disabled={formSubmitIsLoading} onClick={onSubmit}>
                <Save className="mr-2 h-4 w-4" />
                Guardar Cambios
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
