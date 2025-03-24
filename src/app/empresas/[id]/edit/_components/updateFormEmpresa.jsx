'use client';

import { useState } from 'react';
import { RiArrowLeftLine} from '@remixicon/react';
import { Tag, Building, Text, MapPin, IdCardIcon, Phone, Mail, Save} from 'lucide-react';
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
import { updateEmpresaSchema } from '@/app/empresas/[id]/edit/_services/validations/updateEmpresaSchema';
import { Textarea } from '@/components/ui/textarea';
import { updateEmpresaRequestClient } from '@/app/empresas/[id]/_services/requests.js';

export function UpdateFormEmpresa({ empresaData }) {
  const router = useRouter();

  const updateEmpresaForm = useForm({
    resolver: zodResolver(updateEmpresaSchema),
    defaultValues: {
      nombre: empresaData?.nombre,
      ruc: empresaData?.ruc,
      descripcion: empresaData?.descripcion,
      direccion: empresaData?.direccion,
      telefono: empresaData?.telefono,
      email: empresaData?.email,
      estado: empresaData?.estado,
    },
  });

  const { handleSubmit, control, clearErrors, watch } = updateEmpresaForm;

  const [formSubmitIsLoading, setFormSubmitIsLoading] = useState(false);

  // Manejo de formulario
  const onSubmit = handleSubmit(async () => {
    setFormSubmitIsLoading(true);

    // Obtener los valores actuales del formulario
    const currentValues = watch();

    // Comparar los valores actuales con los valores iniciales y construir un objeto con los cambios
    const empresaDataToUpdate = Object.keys(currentValues).reduce(
      (datosCambiados, key) => {
        if (
          currentValues[key] !== updateEmpresaForm.formState.defaultValues[key]
        ) {
          datosCambiados[key] = currentValues[key];
        }
        return datosCambiados;
      },
      {}
    );

    if (Object.keys(empresaDataToUpdate).length === 0) {
      toast.error('No se han realizado cambios.');
      setFormSubmitIsLoading(false);
      return;
    }

    // Toast promise para buscar una persona
    toast.promise(
      updateEmpresaRequestClient(
        empresaData?._id,
        empresaDataToUpdate,
        setFormSubmitIsLoading
      ),
      {
        loading: 'Actualizando...',
        success: () => {
          clearErrors();
          // router.refresh();
          router.back();
          return `Empresa actualizada correctamente`;
        },
        error: (error) => {
          setFormSubmitIsLoading(false);
          return error;
        },
      }
    );
  });

  return (
    <Form {...updateEmpresaForm}>
      <form onSubmit={onSubmit} className="space-y-8">
      <FormField
            control={control}
            name="nombre"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Nombre</FormLabel>
                <div className="relative">
                <Building className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <FormControl>
                    <Input
                      placeholder="Razón social"
                      className="pl-8"
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
                <IdCardIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <FormControl>
                    <Input
                      placeholder="RUC"
                      className="pl-8"
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
                <Text className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <FormControl>
                    <Textarea
                      className="pl-8"
                      disabled={formSubmitIsLoading}
                      {...field}
                      placeholder="Escribe la descripción aquí"
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
                <MapPin className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <FormControl>
                    <Input
                      placeholder="Dirección"
                      className="pl-8"
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
            name="telefono"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Teléfono</FormLabel>
                <div className="relative">
                <Phone className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <FormControl>
                    <Input
                      placeholder="987654321"
                      className="pl-8"
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
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Correo electrónico</FormLabel>
                <div className="relative">
                <Mail className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <FormControl>
                    <Input
                      placeholder="correo@correo.com"
                      className="pl-8"
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
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Tag className="h-5 w-5" />
                <FormLabel>Estado</FormLabel>
              </div>
              <div className="relative">
                <Select
                  defaultValue={empresaData?.estado}
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
                disabled={formSubmitIsLoading}
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
