"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import {
  IdCardIcon,
  Loader2,
  Mail,
  MapPin,
  Phone,
  SearchIcon,
  User,
  UserCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { updateClienteFormSchema } from "@/app/contactos/clientes/_services/validations/updateClienteFormSchema";
import {
  updateClienteRequestClient,
  searchClientePorDniOrRucClientRequest,
} from "@/app/contactos/clientes/_services/requests";
import {
  onChangeCelular,
  onChangeNumero,
} from "@/components/formInputs/onChange";

export function UpdateClienteForm({ onClose, clienteData }) {
  const router = useRouter();

  const updateForm = useForm({
    resolver: zodResolver(updateClienteFormSchema),
    defaultValues: {
      tipo: clienteData?.tipo,
      identificador: clienteData?.datos?.dni || clienteData?.datos?.ruc || "",
      nombres: clienteData?.datos?.nombres || "",
      apellidos: clienteData?.datos?.apellidos || "",
      razonSocial: clienteData?.datos?.razonSocial || "",
      representanteLegal: clienteData?.datos?.representanteLegal || "",
      email: clienteData?.datos?.email || "",
      direccion: clienteData?.datos?.direccion || "",
      celular: clienteData?.datos?.celular || "",
    },
  });

  const {
    handleSubmit,
    watch,
    setValue,
    control,
    clearErrors,
    reset: resetForm,
  } = updateForm;

  const formData = watch();

  // Estados de carga
  const [formSubmitIsLoading, setFormSubmitIsLoading] = useState(false);
  const [searchByDniOrRucIsLoading, setSearchByDniOrRucIsLoading] =
    useState(false);

  // Manejo de formulario
  const onSubmit = handleSubmit(async () => {
    setFormSubmitIsLoading(true);

    // Obtener los valores actuales del formulario
    const currentValues = watch();

    // Comparar los valores actuales con los valores iniciales y construir un objeto con los cambios
    const clienteDataToUpdate = Object.keys(currentValues).reduce(
      (datosCambiados, key) => {
        if (currentValues[key] !== updateForm.formState.defaultValues[key]) {
          datosCambiados[key] = currentValues[key];
        }
        return datosCambiados;
      },
      {}
    );

    if (Object.keys(clienteDataToUpdate).length === 0) {
      toast.error("No se han realizado cambios.");
      setFormSubmitIsLoading(false);
      return;
    }

    let updateObject = {
      ...clienteData,
    };

    if (clienteData?.tipo === "persona") {
      updateObject = {
        ...updateObject,
        tipo: formData?.tipo,
        datos: {
          dni: formData?.identificador,
          nombres: formData?.nombres,
          apellidos: formData?.apellidos,
        },
      };
    }

    if (clienteData?.tipo === "empresa") {
      updateObject = {
        ...updateObject,
        tipo: formData?.tipo,
        datos: {
          ruc: formData?.identificador,
          razonSocial: formData?.razonSocial,
          representanteLegal: formData?.representanteLegal,
        },
      };
    }
    updateObject = {
      ...updateObject,
      datos: {
        ...updateObject?.datos,
        direccion: formData?.direccion,
        email: formData?.email,
        celular: formData?.celular,
      },
    };

    // Toast promise para buscar una persona
    toast.promise(
      updateClienteRequestClient(updateObject, setFormSubmitIsLoading),
      {
        loading: "Actualizando...",
        success: () => {
          clearErrors();
          resetForm();
          onClose();
          router.refresh();
          return `Cliente actualizado correctamente`;
        },
        error: (error) => {
          setFormSubmitIsLoading(false);
          return error;
        },
      }
    );
  });

  // Busqueda por DNI o RUC
  const handleSearchByDniOrRuc = async (e) => {
    e.preventDefault();
    try {
      setSearchByDniOrRucIsLoading(true);

      const tipo = formData.tipo;
      const identificador = formData.identificador;

      if (tipo === "persona") {
        if (!identificador || identificador.length !== 8) {
          setSearchByDniOrRucIsLoading(false);
          toast.warning("Por favor, ingrese un DNI válido", {
            description: "El DNI debe tener 8 dígitos",
          });
          return;
        }
        toast.promise(
          searchClientePorDniOrRucClientRequest(
            identificador,
            setSearchByDniOrRucIsLoading
          ),
          {
            loading: "Buscando...",
            success: (persona) => {
              setValue("apellidos", persona?.apellidos);
              setValue("nombres", persona?.nombres);
              setValue("celular", persona?.celular);
              clearErrors("apellidos");
              clearErrors("nombres");
              clearErrors("celular");
              return `Persona encontrada`;
            },
            error: (error) => {
              setSearchByDniOrRucIsLoading(false);
              return error;
            },
          }
        );
      }

      if (tipo === "empresa") {
        if (!identificador || identificador.length !== 11) {
          setSearchByDniOrRucIsLoading(false);
          toast.warning("Por favor, ingrese un RUC válido", {
            description: "El RUC debe tener 11 dígitos",
          });
          return;
        }
        toast.promise(
          searchClientePorDniOrRucClientRequest(
            identificador,
            setSearchByDniOrRucIsLoading
          ),
          {
            loading: "Buscando...",
            success: (empresa) => {
              setValue("razonSocial", empresa?.razonSocial);
              // setValue('representanteLegal', empresa?.representanteLegal);
              // setValue('direccion', empresa?.direccion);
              setValue("celular", empresa?.celular);
              clearErrors("razonSocial");
              // clearErrors('representanteLegal');
              // clearErrors('direccion');
              clearErrors("celular");
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
      toast.error("Error al buscar persona por DNI");
      console.error("Error al buscar persona por DNI:", error);
    }
  };

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Actualizar Cliente</SheetTitle>
        <SheetDescription>
          Modifique la información del cliente actual. Luego pulse actualizar.
        </SheetDescription>
      </SheetHeader>
      <Form {...updateForm}>
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
                      setValue("identificador", "");
                      clearErrors("identificador");
                      clearErrors("apellidos");
                      clearErrors("nombres");
                      clearErrors("razonSocial");
                      clearErrors("representanteLegal");
                      clearErrors("direccion");
                      clearErrors("celular");
                      setValue("apellidos", "");
                      setValue("nombres", "");
                      setValue("razonSocial", "");
                      setValue("representanteLegal", "");
                      setValue("direccion", "");
                      setValue("celular", "");
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
                  {watch("tipo") === "persona" ? "DNI" : "RUC"}
                </FormLabel>
                <div className="relative">
                  <IdCardIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <FormControl>
                    <Input
                      type="text"
                      placeholder={watch("tipo") === "persona" ? "DNI" : "RUC"}
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
                      "absolute right-3 top-1.5 h-auto w-auto text-muted-foreground",
                      searchByDniOrRucIsLoading
                        ? "opacity-75 pointer-events-none"
                        : "cursor-pointer"
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
          {watch("tipo") === "persona" ? (
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
