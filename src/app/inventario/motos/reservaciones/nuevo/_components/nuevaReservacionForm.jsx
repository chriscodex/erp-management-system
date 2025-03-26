"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  CalendarIcon,
  IdCardIcon,
  Loader2,
  Mail,
  Phone,
  Save,
  SearchIcon,
  User,
} from "lucide-react";
import { AddFormCalendar } from "@/components/calendars/addFormCalendar";
import { format } from "date-fns"; //Calendar
import { es } from "date-fns/locale"; //Calendar
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  RiAppsLine,
  RiArrowLeftLine,
  RiBikeFill,
  RiChat3Line,
  RiFileTextFill,
  RiInstanceFill,
} from "@remixicon/react";
// import { useSession } from "next-auth/react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import {
  onChangeCelular,
  onChangeNumero,
} from "@/components/formInputs/onChange";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { MoneyInputField } from "@/components/formInputs/MoneyInputField";
import {
  createReservacionRequestClient,
  searchClientePorDniOrRucClientRequest,
} from "@/app/inventario/motos/reservaciones/nuevo/_services/requests";

import { Textarea } from "@/components/ui/textarea";
import { createReservacionSchema } from "@/app/inventario/motos/reservaciones/nuevo/_services/validations/createReservacionSchema";

export function NuevaReservacionForm() {
  // const { data: session } = useSession();

  const router = useRouter();

  const [date, setDate] = useState(new Date()); //Date Calendar
  const [open, setOpen] = useState(false); //Close calendar

  const form = useForm({
    resolver: zodResolver(createReservacionSchema),
    defaultValues: {

      identificador: "",

      pagoInicial: "",
      fechaLimite: new Date(),
      comentario: "",

      cliente: {
        tipo: "persona",
        datos: {
        }
      },

      moto: {
        nombre: "",
        descripcion: "",
        categoria: "",
        marca: "",
      },
    },
  });

  const { handleSubmit, watch, setValue, control, clearErrors, setError } =
    form;

  const formData = watch();

  // Estados de carga
  const [formSubmitIsLoading, setFormSubmitIsLoading] = useState(false);

  const [searchByDniOrRucIsLoading, setSearchByDniOrRucIsLoading] =
    useState(false);

  // Manejo de formulario
  const onSubmit = handleSubmit(async (data) => {


    console.log("Formulario enviado con datos:", data);


    console.log(form.getValues());

    toast.promise(
      createReservacionRequestClient(data, setFormSubmitIsLoading, setError),
      {
        loading: "Registrando...",

        success: (response) => {
          console.log(response);
          clearErrors();
          router.push(`/inventario/motos/reservaciones`);
          return `Reservación registrada correctamente`;
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

      const tipo = formData.cliente.tipo;
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
              setValue("cliente.datos.apellidos", persona?.apellidos);
              setValue("cliente.datos.nombres", persona?.nombres);
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

              console.log("empresa",empresa);

              setValue("cliente.datos.nombre", empresa?.razonSocial);
              setValue("telefono", empresa?.telefono);
              clearErrors("nombre");
              clearErrors("telefono");
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
    <>
      <Form {...form}>
        <form onSubmit={onSubmit} className="gap-4 py-4">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Información de la moto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <FormField
                control={control}
                name="moto.nombre"
                render={({ field }) => (
                  <FormItem className="space-y-2 col-span-2">
                    <FormLabel>Nombre de la moto</FormLabel>
                    <div className="relative">
                      <RiBikeFill className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <FormControl>
                        <Input
                          placeholder="Escriba el nombre de la moto"
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
                name="moto.descripcion"
                render={({ field }) => (
                  <FormItem className="space-y-2 col-span-2">
                    <FormLabel>Descripción</FormLabel>
                    <div className="relative">
                      <RiFileTextFill className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <FormControl>
                        <Textarea
                          disabled={formSubmitIsLoading}
                          {...field}
                          placeholder="Describa la moto"
                          className="pl-8"
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="moto.categoria.nombre"
                render={({ field }) => (
                  <FormItem className="space-y-2 col-span-2">
                    <FormLabel>Categoría</FormLabel>
                    <div className="relative">
                      <RiAppsLine className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <FormControl>
                        <Input
                          placeholder="Categoría"
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
                name="moto.marca.nombre"
                render={({ field }) => (
                  <FormItem className="space-y-2 col-span-2">
                    <FormLabel>Marca</FormLabel>
                    <div className="relative">
                      <RiInstanceFill className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <FormControl>
                        <Input
                          placeholder="Marca"
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
            </CardContent>
          </Card>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Información del cliente</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <FormField
                control={control}
                name="cliente.tipo"
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
                          clearErrors("nombre");
                          clearErrors("celular");
                          setValue("apellidos", "");
                          setValue("nombres", "");
                          setValue("nombre", "");
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
                      {watch("cliente.tipo") === "persona" ? "DNI" : "RUC"}
                    </FormLabel>
                    <div className="relative">
                      <IdCardIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <FormControl>
                        <Input
                          type="text"
                          placeholder={
                            watch("cliente.tipo") === "persona" ? "DNI" : "RUC"
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
              {watch("cliente.tipo") === "persona" ? (
                <>
                  <FormField
                    control={control}
                    name="cliente.datos.apellidos"
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
                    name="cliente.datos.nombres"
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
                    name="cliente.datos.nombre"
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
                name="cliente.datos.celular"
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
              <FormField
                control={control}
                name="cliente.datos.email"
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
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Información de la reservación</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <MoneyInputField
                control={control}
                name="pagoInicial"
                title="Pago inicial"
              />
              <FormField
                control={control}
                name="fechaLimite"
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-2">
                    <FormLabel>Fecha límite</FormLabel>
                    <FormControl>
                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[280px] justify-start text-left font-normal",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? (
                              format(date, "PPP", { locale: es })
                            ) : (
                              <span>Selecciona una fecha</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <AddFormCalendar
                            captionLayout="dropdown-buttons"
                            fromYear={2020}
                            toYear={new Date().getFullYear()}
                            mode="single"
                            selected={date}
                            onSelect={(selectedDate) => {
                              if (selectedDate) {
                                field.onChange(selectedDate); // 🔹 Actualiza el valor en el formulario
                                setDate(selectedDate); // Guarda la fecha seleccionada
                                setOpen(false); // Cierra el Popover
                              }
                            }}
                            locale={es}
                            calendarDate={field.value}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="comentario"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Comentario</FormLabel>
                    <div className="relative">
                      <RiChat3Line className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <FormControl>
                        <Textarea
                          disabled={formSubmitIsLoading}
                          {...field}
                          placeholder="Escriba sus comentarios aquí."
                          className="min-h-20 pl-8"
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
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
                "Creando..."
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Crear reservación
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
