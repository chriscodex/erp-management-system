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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import {
  IdCardIcon,
  Loader2,
  Mail,
  MapPin,
  Phone,
  SearchIcon,
  User,
  UserCheck,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { addClienteFormSchema } from '@/app/contactos/clientes/_services/validations/addClienteFormSchema';
import {
  onChangeCelular,
  onChangeNumero,
} from '@/components/formInputs/onChange';
import {
  createClienteRequestClient,
  searchClientePorDniOrRucClientRequest,
} from '@/app/contactos/clientes/_services/requests';
import { Button } from '@/components/ui/button';

export function AddClienteForm({ onClose }) {
  const router = useRouter();

  const addForm = useForm({
    resolver: zodResolver(addClienteFormSchema),
    defaultValues: {
      tipo: 'persona',
      identificador: '',
      nombres: '',
      apellidos: '',
      razonSocial: '',
      representanteLegal: '',
      email: '',
      direccion: '',
      celular: '',
    },
  });

  const {
    handleSubmit,
    watch,
    setValue,
    control,
    clearErrors,
    reset: resetForm,
  } = addForm;

  const formData = watch();

  // Estados de carga
  const [formSubmitIsLoading, setFormSubmitIsLoading] = useState(false);
  const [searchByDniOrRucIsLoading, setSearchByDniOrRucIsLoading] =
    useState(false);

  // Manejo de formulario
  const onSubmit = handleSubmit(async (data) => {
    setFormSubmitIsLoading(true);

    // Toast promise para buscar una persona
    toast.promise(createClienteRequestClient(data, setFormSubmitIsLoading), {
      loading: 'Creando...',
      success: () => {
        clearErrors();
        resetForm();
        onClose();
        router.refresh();
        return `Cliente creado correctamente`;
      },
      error: (error) => {
        setFormSubmitIsLoading(false);
        return error;
      },
    });
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
            setSearchByDniOrRucIsLoading,
          ),
          {
            loading: 'Buscando...',
            success: (persona) => {
              console.log('persona', persona);
              setValue(
                'apellidos',
                persona?.apellidos || persona?.datos?.apellidos,
              );
              setValue('nombres', persona?.nombres || persona?.datos?.nombres);
              setValue(
                'direccion',
                persona?.direccion || persona?.datos?.direccion,
              );
              setValue('email', persona?.email || persona?.datos?.email);
              setValue('celular', persona?.celular || persona?.datos?.celular);

              clearErrors('apellidos');
              clearErrors('nombres');
              clearErrors('direccion');
              clearErrors('email');
              clearErrors('celular');
              return `Persona encontrada`;
            },
            error: (error) => {
              setSearchByDniOrRucIsLoading(false);
              return error;
            },
          },
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
            setSearchByDniOrRucIsLoading,
          ),
          {
            loading: 'Buscando...',
            success: (empresa) => {
              console.log('empresa', empresa);

              setValue('cliente.datos.nombre', empresa?.razonSocial);
              setValue('telefono', empresa?.telefono);
              clearErrors('nombre');
              clearErrors('telefono');
              return `Empresa encontrada`;
            },
            error: (error) => {
              setSearchByDniOrRucIsLoading(false);
              return error;
            },
          },
        );
      }
    } catch (error) {
      setSearchByDniOrRucIsLoading(false);
      toast.error('Error al buscar persona por DNI');
      console.error('Error al buscar persona por DNI:', error);
    }
  };

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Agregar Cliente</SheetTitle>
        <SheetDescription>
          Complete los detalles para agregar una nuevo cliente.
        </SheetDescription>
      </SheetHeader>
      <Form {...addForm}>
        <form onSubmit={onSubmit} className="grid gap-4 py-4">
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
                      clearErrors('representanteLegal');
                      clearErrors('direccion');
                      clearErrors('celular');
                      setValue('apellidos', '');
                      setValue('nombres', '');
                      setValue('razonSocial', '');
                      setValue('representanteLegal', '');
                      setValue('direccion', '');
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
                      placeholder={watch('tipo') === 'persona' ? 'DNI' : 'RUC'}
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
                        : 'cursor-pointer',
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
              <FormField
                control={control}
                name="representanteLegal"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Representante Legal</FormLabel>
                    <div className="relative">
                      <UserCheck className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <FormControl>
                        <Input
                          placeholder="Representante Legal"
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
            </>
          )}
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
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Email</FormLabel>
                <div className="relative">
                  <Mail className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Email"
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
