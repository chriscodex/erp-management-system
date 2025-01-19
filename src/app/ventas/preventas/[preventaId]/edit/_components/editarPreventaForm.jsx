'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import {
  IdCardIcon,
  Loader2,
  Phone,
  Save,
  SearchIcon,
  User,
} from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { RiArrowLeftLine } from '@remixicon/react';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  onChangeCelular,
  onChangeNumero,
} from '@/components/formInputs/onChange';

import { agregarNumeracionTable, cn } from '@/lib/utils';

import { ProductsPreventaTable } from '@/app/ventas/preventas/registrar/_components/productsPreventaTable.jsx/data-table';
import { searchClientePorDniOrRucClientRequest } from '@/app/ventas/preventas/registrar/_services/requests';
import { ObsequiosPreventaTable } from '@/app/ventas/preventas/registrar/_components/obsequiosPreventaTable.jsx/data-table';
import { Textarea } from '@/components/ui/textarea';
import { createPreventaSchemaForm } from '@/app/ventas/preventas/registrar/_services/validations/createPreventaSchemaForm';

export function EditarPreventaForm({ preventaData }) {
  const router = useRouter();

  const [obsequiosPreventa, setObsequiosPreventa] = useState(
    agregarNumeracionTable(preventaData?.obsequiosPreventa) || []
  );
  const [productsPreventa, setProductsPreventa] = useState(
    agregarNumeracionTable(preventaData?.productosPreventa) || []
  );

  const productsPreventaOriginal =
    agregarNumeracionTable(preventaData?.productosPreventa) || [];
  const obsequiosPreventaOriginal =
    agregarNumeracionTable(preventaData?.obsequiosPreventa) || [];

  const preventaOriginal = {...preventaData};

  const form = useForm({
    resolver: zodResolver(createPreventaSchemaForm),
    defaultValues: {
      identificador:
        preventaData?.cliente?.datos?.dni ||
        preventaData?.cliente?.datos?.ruc ||
        '',
      tipo: preventaData?.cliente?.tipo || 'persona',
      nombres: preventaData?.cliente?.datos?.nombres || '',
      apellidos: preventaData?.cliente?.datos?.apellidos || '',
      razonSocial: preventaData?.cliente?.datos?.razonSocial || '',
      celular: preventaData?.cliente?.datos?.celular || '',
      comentarios: preventaData?.comentarios || '',
    },
  });

  const { handleSubmit, watch, setValue, control, clearErrors } = form;

  const formData = watch();

  // Estados de carga
  const [formSubmitIsLoading, setFormSubmitIsLoading] = useState(false);
  const [searchByDniOrRucIsLoading, setSearchByDniOrRucIsLoading] =
    useState(false);

  // Manejo de formulario
  const onSubmit = handleSubmit(async () => {
    // Comparar los valores actuales con los valores iniciales y construir un objeto con los cambios
    const DataToUpdate = Object.keys(formData).reduce((datosCambiados, key) => {
      if (formData[key] !== form.formState.defaultValues[key]) {
        datosCambiados[key] = formData[key];
      }
      return datosCambiados;
    }, {});

    if (Object.keys(DataToUpdate).length === 0) {
      if (
        JSON.stringify(obsequiosPreventa) ===
          JSON.stringify(obsequiosPreventaOriginal) &&
        JSON.stringify(productsPreventa) ===
          JSON.stringify(productsPreventaOriginal)
      ) {
        toast.error('No se han realizado cambios.');
        setFormSubmitIsLoading(false);
        return;
      }
    }

    let updatePreventaObject = {};

    updatePreventaObject = {
      ...DataToUpdate,
    };

    if (
      JSON.stringify(obsequiosPreventa) !==
      JSON.stringify(obsequiosPreventaOriginal)
    ) {
      updatePreventaObject['obsequiosPreventa'] = obsequiosPreventa;
    }

    if (
      JSON.stringify(productsPreventa) !==
      JSON.stringify(productsPreventaOriginal)
    ) {
      updatePreventaObject['productosPreventa'] = productsPreventa;
    }

    console.log(updatePreventaObject);
    return;

    // // Toast promise para buscar una persona
    // toast.promise(
    //   createPreventaRequestClient(createPreventaObject, setFormSubmitIsLoading),
    //   {
    //     loading: 'Editando...',
    //     success: (response) => {
    //       console.log(response);
    //       clearErrors();
    //       router.push(`/ventas/preventas/${response._id}`);
    //       return `Pre-venta editando correctamente`;
    //     },
    //     error: (error) => {
    //       setFormSubmitIsLoading(false);
    //       return error;
    //     },
    //   }
    // );
  });

  // Busqueda por DNI o RUC
  const handleSearchByDniOrRuc = async (e) => {
    e.preventDefault();
    try {
      setSearchByDniOrRucIsLoading(true);

      const tipo = formData.tipo;
      const identificador = formData.identificador;

      if (tipo === 'persona') {
        if (!identificador || identificador.length !== 8) {
          setSearchByDniOrRucIsLoading(false);
          toast.warning('Por favor, ingrese un DNI válido', {
            description: 'El DNI debe tener 8 dígitos',
          });
          return;
        }
        toast.promise(
          searchClientePorDniOrRucClientRequest(
            identificador,
            setSearchByDniOrRucIsLoading
          ),
          {
            loading: 'Buscando...',
            success: (persona) => {
              setValue('apellidos', persona?.apellidos);
              setValue('nombres', persona?.nombres);
              setValue('celular', persona?.celular);
              clearErrors('apellidos');
              clearErrors('nombres');
              clearErrors('celular');
              return `Persona encontrada`;
            },
            error: (error) => {
              setSearchByDniOrRucIsLoading(false);
              return error;
            },
          }
        );
      }

      if (tipo === 'empresa') {
        if (!identificador || identificador.length !== 11) {
          setSearchByDniOrRucIsLoading(false);
          toast.warning('Por favor, ingrese un RUC válido', {
            description: 'El RUC debe tener 11 dígitos',
          });
          return;
        }
        toast.promise(
          searchClientePorDniOrRucClientRequest(
            identificador,
            setSearchByDniOrRucIsLoading
          ),
          {
            loading: 'Buscando...',
            success: (empresa) => {
              setValue('razonSocial', empresa?.razonSocial);
              setValue('celular', empresa?.celular);
              clearErrors('razonSocial');
              clearErrors('celular');
              return `Empresa encontrada`;
            },
            error: (error) => {
              setSearchByDniOrRucIsLoading(false);
              return error;
            },
          }
        );
      }
    } catch (error) {
      setSearchByDniOrRucIsLoading(false);
      toast.error('Error al buscar persona por DNI');
      console.error('Error al buscar persona por DNI:', error);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={onSubmit} className="gap-4 pb-4">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Información del Cliente</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <FormField
                control={control}
                name="tipo"
                render={({ field }) => (
                  <FormItem className="mb-3">
                    <FormControl>
                      <RadioGroup
                        onValueChange={(value) => {
                          field.onChange(value);
                          setValue('identificador', '');
                          clearErrors('identificador');
                          clearErrors('apellidos');
                          clearErrors('nombres');
                          clearErrors('razonSocial');
                          clearErrors('celular');
                          setValue('apellidos', '');
                          setValue('nombres', '');
                          setValue('razonSocial', '');
                          setValue('celular', '');
                        }}
                        defaultValue={field.value}
                        className="flex flex-row space-x-4"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="persona" id="persona" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Persona Natural
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="empresa" id="empresa" />
                          </FormControl>
                          <FormLabel className="font-normal">Empresa</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="identificador"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>
                      {watch('tipo') === 'persona' ? 'DNI' : 'RUC'}
                    </FormLabel>
                    <div className="relative">
                      <IdCardIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <FormControl>
                        <Input
                          type="text"
                          placeholder={
                            watch('tipo') === 'persona' ? 'DNI' : 'RUC'
                          }
                          className="pl-8"
                          autoComplete="off"
                          disabled={
                            searchByDniOrRucIsLoading || formSubmitIsLoading
                          }
                          {...field}
                          onChange={(e) => {
                            onChangeNumero(e, field);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                      <div
                        className={cn(
                          'absolute right-3 top-1.5 h-auto w-auto text-muted-foreground',
                          searchByDniOrRucIsLoading
                            ? 'opacity-75 pointer-events-none'
                            : 'cursor-pointer'
                        )}
                        onClick={handleSearchByDniOrRuc}
                      >
                        {searchByDniOrRucIsLoading ? (
                          <>
                            <Loader2 className="h-6 w-6 animate-spin " />
                          </>
                        ) : (
                          <TooltipProvider delayDuration={0}>
                            <Tooltip>
                              <TooltipTrigger>
                                <SearchIcon className="h-6 w-6" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Buscar</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </div>
                    </div>
                  </FormItem>
                )}
              />
              {watch('tipo') === 'persona' ? (
                <>
                  <FormField
                    control={control}
                    name="apellidos"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel>Apellidos</FormLabel>
                        <div className="relative">
                          {searchByDniOrRucIsLoading ? (
                            <>
                              <Loader2 className="absolute left-2 top-2.5 h-4 w-4 animate-spin" />
                            </>
                          ) : (
                            <User className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                          )}
                          <FormControl>
                            <Input
                              placeholder="Apellidos"
                              className="pl-8"
                              autoComplete="off"
                              disabled={
                                searchByDniOrRucIsLoading || formSubmitIsLoading
                              }
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
                    name="nombres"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel>Nombres</FormLabel>
                        <div className="relative">
                          {searchByDniOrRucIsLoading ? (
                            <>
                              <Loader2 className="absolute left-2 top-2.5 h-4 w-4 animate-spin" />
                            </>
                          ) : (
                            <User className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                          )}
                          <FormControl>
                            <Input
                              placeholder="Nombres"
                              className="pl-8"
                              autoComplete="off"
                              disabled={
                                searchByDniOrRucIsLoading || formSubmitIsLoading
                              }
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                </>
              ) : (
                <>
                  <FormField
                    control={control}
                    name="razonSocial"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel>Razón Social</FormLabel>
                        <div className="relative">
                          {searchByDniOrRucIsLoading ? (
                            <>
                              <Loader2 className="absolute left-2 top-2.5 h-4 w-4 animate-spin" />
                            </>
                          ) : (
                            <User className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                          )}
                          <FormControl>
                            <Input
                              placeholder="Razón Social"
                              className="pl-8"
                              autoComplete="off"
                              disabled={
                                searchByDniOrRucIsLoading || formSubmitIsLoading
                              }
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                </>
              )}
              <FormField
                control={control}
                name="celular"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Celular</FormLabel>
                    <div className="relative">
                      <Phone className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <FormControl>
                        <Input
                          placeholder="Celular"
                          className="pl-8"
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
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Comentarios</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <FormField
                control={control}
                name="comentarios"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <div className="relative">
                      <FormControl>
                        <Textarea
                          disabled={formSubmitIsLoading}
                          {...field}
                          placeholder="Escriba sus comentarios de la venta aquí."
                          className="min-h-20"
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Productos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <ProductsPreventaTable
                productsVenta={productsPreventa}
                setProductsVenta={setProductsPreventa}
              />
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Obsequios</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <ObsequiosPreventaTable
                obsequiosPreventa={obsequiosPreventa}
                setObsequiosPreventa={setObsequiosPreventa}
              />
            </CardContent>
          </Card>

          <div className="flex items-center justify-end space-x-2">
            <Button
              variant="outline"
              onClick={(e) => {
                e.preventDefault();
                router.back();
              }}
              disabled={formSubmitIsLoading}
            >
              <RiArrowLeftLine className="mr-2 h-4 w-4" />
              Cancelar
            </Button>
            <Button type="submit" disabled={formSubmitIsLoading}>
              {formSubmitIsLoading ? (
                'Registrando...'
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Guardar
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
