"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  IdCardIcon,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Save,
  SearchIcon,
  User,
  UserCheck,
  CalendarIcon,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  RiAppsLine,
  RiArrowLeftLine,
  RiBikeFill,
  RiFileTextFill,
  RiInfoCardLine,
  RiInstanceFill,
} from "@remixicon/react";

import { AddFormCalendar } from "@/components/calendars/addFormCalendar";
import { format } from "date-fns"; //Calendar
import { es } from "date-fns/locale"; //Calendar
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
  createOrdenDeServicioRequestClient,
  searchClientePorDniOrRucClientRequest,
} from "@/app/taller/ordenes-servicio/nuevo/_services/requests";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createOrdenDeServicioSchema } from "@/app/taller/ordenes-servicio/nuevo/_services/validations/createOrdenDeServicioSchemaForm";
import { MecanicosTallerTable } from "@/app/taller/ordenes-servicio/nuevo/_components/mecanicosTallerTable/data-table";
import { MoneyInputField } from "@/components/formInputs/MoneyInputField";

export function NuevaOrdenDeServicioForm(mecanicos) {
  const router = useRouter();

  const [mecanicosTaller, setMecanicosTaller] = useState([]);

  const [date, setDate] = useState(new Date()); //Date Calendar
  const [open, setOpen] = useState(false); //Close calendar

  const form = useForm({
    resolver: zodResolver(createOrdenDeServicioSchema),
    defaultValues: {
      //Cliente

      identificador: "",
      tipo: "persona",
      nombres: "",
      apellidos: "",
      razonSocial: "",
      representanteLegal: "",
      email: "",
      direccion: "",
      celular: "",

      //Moto

      nombre: "",
      placa: "",
      vin: "",
      descripcion: "",
      categoria: "",
      marca: "",

      //Mecanicos

      mecanicos: [],

      //Orden de servicio

      montoAdelanto: "",
      origenServicio: "",
      tipoServicio: "",
      comentarios: "",
      fechaIngreso: new Date(),
    },
  });

  const { handleSubmit, watch, setValue, control, clearErrors } = form;

  const formData = watch();

  // Estados de carga
  const [formSubmitIsLoading, setFormSubmitIsLoading] = useState(false);
  const [searchByDniOrRucIsLoading, setSearchByDniOrRucIsLoading] =
    useState(false);

  // Manejo de formulario
  const onSubmit = handleSubmit(async (data) => {
    const createOrdenDeServicioObject = {
      ...data,
      // mecanicos: mecanicosTaller,
    };
    // Toast promise para buscar una persona
    toast.promise(
      createOrdenDeServicioRequestClient(
        createOrdenDeServicioObject,
        setFormSubmitIsLoading
      ),
      {
        loading: "Registrando...",
        success: (response) => {
          console.log(response);
          clearErrors();
          router.push(`/taller/ordenes-servicio/${response._id}`);
          return `Orden de servicio registrada correctamente`;
        },
        error: (error) => {
          setFormSubmitIsLoading(false);
          return error instanceof Error ? error.message : String(error);
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
              setValue(
                "apellidos",
                persona?.apellidos || persona?.datos?.apellidos
              );
              setValue("nombres", persona?.nombres || persona?.datos?.nombres);
              setValue(
                "direccion",
                persona?.direccion || persona?.datos?.direccion
              );
              setValue("email", persona?.email || persona?.datos?.email);
              setValue("celular", persona?.celular || persona?.datos?.celular);
              clearErrors("apellidos");
              clearErrors("nombres");
              clearErrors("direccion");
              clearErrors("email");
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
              setValue(
                "razonSocial",
                empresa?.razonSocial || empresa?.datos?.razonSocial
              );
              setValue(
                "representanteLegal",
                empresa?.representanteLegal ||
                  empresa?.datos?.representanteLegal
              );
              setValue(
                "direccion",
                empresa?.direccion || empresa?.datos?.direccion
              );
              setValue("email", empresa?.email || empresa?.datos?.email);
              setValue("celular", empresa?.celular || empresa?.datos?.celular);
              clearErrors("razonSocial");
              clearErrors("representanteLegal");
              clearErrors("direccion");
              clearErrors("email");
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

  useEffect(() => {
    form.setValue("mecanicos", mecanicosTaller);
    form.clearErrors("mecanicos");
  }, [mecanicosTaller]);

  return (
    <>
      <Form {...form}>
        <form onSubmit={onSubmit} className="gap-4 py-4">
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
                          setValue("identificador", "");
                          clearErrors("identificador");
                          clearErrors("apellidos");
                          clearErrors("nombres");
                          clearErrors("razonSocial");
                          clearErrors("representanteLegal");
                          clearErrors("direccion");
                          clearErrors("email");
                          clearErrors("celular");
                          setValue("apellidos", "");
                          setValue("nombres", "");
                          setValue("razonSocial", "");
                          setValue("representanteLegal", "");
                          setValue("direccion", "");
                          setValue("email", "");
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
                          placeholder={
                            watch("tipo") === "persona" ? "DNI" : "RUC"
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
                          {searchByDniOrRucIsLoading ? (
                            <>
                              <Loader2 className="absolute left-2 top-2.5 h-4 w-4 animate-spin" />
                            </>
                          ) : (
                            <UserCheck className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                          )}
                          <FormControl>
                            <Input
                              placeholder="Representante Legal"
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
                name="direccion"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Dirección</FormLabel>
                    <div className="relative">
                      {searchByDniOrRucIsLoading ? (
                        <>
                          <Loader2 className="absolute left-2 top-2.5 h-4 w-4 animate-spin" />
                        </>
                      ) : (
                        <MapPin className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      )}
                      <FormControl>
                        <Input
                          placeholder="Dirección"
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
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Email</FormLabel>
                    <div className="relative">
                      {searchByDniOrRucIsLoading ? (
                        <>
                          <Loader2 className="absolute left-2 top-2.5 h-4 w-4 animate-spin" />
                        </>
                      ) : (
                        <Mail className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      )}
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Email"
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
                name="celular"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Celular</FormLabel>
                    <div className="relative">
                      {searchByDniOrRucIsLoading ? (
                        <>
                          <Loader2 className="absolute left-2 top-2.5 h-4 w-4 animate-spin" />
                        </>
                      ) : (
                        <Phone className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      )}
                      <FormControl>
                        <Input
                          placeholder="Celular"
                          className="pl-8"
                          autoComplete="off"
                          disabled={
                            searchByDniOrRucIsLoading || formSubmitIsLoading
                          }
                          onChange={(e) => {
                            onChangeCelular(e, field);
                          }}
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
              <CardTitle>Información de la Moto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <FormField
                control={control}
                name="nombre"
                render={({ field }) => (
                  <FormItem className="space-y-2 col-span-2">
                    <FormLabel>Nombre</FormLabel>
                    <div className="relative">
                      <RiBikeFill className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <FormControl>
                        <Input
                          placeholder="Nombre"
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
                name="placa"
                render={({ field }) => (
                  <FormItem className="space-y-2 col-span-2">
                    <FormLabel>Placa</FormLabel>
                    <div className="relative">
                      <RiInfoCardLine className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <FormControl>
                        <Input
                          placeholder="Placa"
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
                name="vin"
                render={({ field }) => (
                  <FormItem className="space-y-2 col-span-2">
                    <FormLabel>VIN</FormLabel>
                    <div className="relative">
                      <RiInfoCardLine className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <FormControl>
                        <Input
                          placeholder="VIN"
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
                  <FormItem className="space-y-2 col-span-2">
                    <FormLabel>Descripción</FormLabel>
                    <div className="relative">
                      <RiFileTextFill className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <FormControl>
                        <Textarea
                          disabled={formSubmitIsLoading}
                          {...field}
                          placeholder="Descripción"
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
                name="categoria"
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
                name="marca"
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

          <FormField
            control={form.control}
            name="mecanicos"
            render={({ field }) => (
              <FormItem>
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Mecánicos</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <MecanicosTallerTable
                      mecanicosTaller={mecanicosTaller}
                      setMecanicosTaller={setMecanicosTaller}
                      mecanicos={mecanicos?.mecanicos}
                    />
                    {/* Campo oculto para que el valor entre al form y valide */}
                    <input
                      type="hidden"
                      value={JSON.stringify(field.value)}
                      {...field}
                    />
                    <FormMessage />
                  </CardContent>
                </Card>
              </FormItem>
            )}
          />

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Información adicional</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <FormField
                control={control}
                name="fechaIngreso"
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-2">
                    <FormLabel>Fecha de ingreso</FormLabel>
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
                                field.onChange(selectedDate);
                                setDate(selectedDate); 
                                setOpen(false);
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
                name="origenServicio"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Origen del Servicio</FormLabel>
                    <div className="relative">
                      <Select
                        defaultValue={""}
                        onValueChange={field.onChange}
                        disabled={formSubmitIsLoading}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full pl-2">
                            <SelectValue placeholder="Seleccione el origen" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="garantia">Garantía</SelectItem>
                          <SelectItem value="pagado">Pagado</SelectItem>
                          <SelectItem value="interno">Interno</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="tipoServicio"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Tipo de Servicio</FormLabel>
                    <div className="relative">
                      <Select
                        defaultValue={""}
                        onValueChange={field.onChange}
                        disabled={formSubmitIsLoading}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full pl-2">
                            <SelectValue placeholder="Seleccione el tipo de servicio" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="mantenimiento">
                            Mantenimiento
                          </SelectItem>
                          <SelectItem value="reparacion">Reparación</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              {/* <FormField
                control={control}
                name="estado"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Estado</FormLabel>
                    <div className="relative">
                      <Select
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                        disabled={formSubmitIsLoading}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full pl-2">
                            <SelectValue placeholder="Seleccione el estado" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="pendiente">Pendiente</SelectItem>
                          <SelectItem value="diagnosticando">
                            Diagnosticando
                          </SelectItem>
                          <SelectItem value="esperando-repuestos">
                            Esperando repuestos
                          </SelectItem>
                          <SelectItem value="en-reparacion">
                            En reparación
                          </SelectItem>
                          <SelectItem value="en-mantenimiento">
                            En mantenimiento
                          </SelectItem>
                          <SelectItem value="finalizado">Finalizado</SelectItem>
                          <SelectItem value="entregado">Entregado</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              /> */}
              <MoneyInputField
                control={control}
                name="montoAdelanto"
                title="Monto adelanto"
                formSubmitIsLoading={formSubmitIsLoading}
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
                          placeholder="Escriba sus comentarios aquí."
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
                "Registrando..."
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Registrar Orden De Servicio
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
