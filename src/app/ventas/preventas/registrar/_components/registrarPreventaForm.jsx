"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
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
import { RiArrowLeftLine } from "@remixicon/react";
import { useSession } from "next-auth/react";

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
import { Switch } from "@/components/ui/switch";
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
import { ProductsPreventaTable } from "@/app/ventas/preventas/registrar/_components/productsPreventaTable.jsx/data-table";
import {
  createPreventaRequestClient,
  searchClientePorDniOrRucClientRequest,
} from "@/app/ventas/preventas/registrar/_services/requests";
import { ObsequiosPreventaTable } from "@/app/ventas/preventas/registrar/_components/obsequiosPreventaTable.jsx/data-table";
import { Textarea } from "@/components/ui/textarea";
import { createPreventaSchemaForm } from "@/app/ventas/preventas/registrar/_services/validations/createPreventaSchemaForm";

export function RegistrarPreventaForm() {
  const { data: session } = useSession();

  const router = useRouter();

  const [obsequiosPreventa, setObsequiosPreventa] = useState([]);
  const [productsPreventa, setProductsPreventa] = useState([]);

  const [date, setDate] = useState(new Date()); //Date Calendar
  const [open, setOpen] = useState(false); //Close calendar

  const form = useForm({
    resolver: zodResolver(createPreventaSchemaForm),
    defaultValues: {
      identificador: "",
      tipo: "persona",
      nombres: "",
      apellidos: "",
      razonSocial: "",
      representanteLegal: "",
      email: "",
      direccion: "",
      celular: "",

      //Productos

      productos: [],

      comentarios: "",
      cotizacion: "no",
      fechaValidez: new Date(),
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
    const createPreventaObject = {
      ...data,
      user: session?.user,
      obsequios: obsequiosPreventa,
      ...(session?.user?.sucursalId && { sucursalId: session.user.sucursalId }),
    };
    // Toast promise para buscar una persona
    toast.promise(
      createPreventaRequestClient(createPreventaObject, setFormSubmitIsLoading),
      {
        loading: "Registrando...",
        success: (response) => {
          console.log(response);
          clearErrors();
          router.push(`/ventas/preventas/${response._id}`);
          return `Pre-venta registrada correctamente`;
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

  const cotizacionValue = useWatch({
    control,
    name: "cotizacion",
  });

  useEffect(() => {
    if (cotizacionValue === "no") {
      setValue("fechaValidez", undefined);
      setDate(undefined); // Si estás manejando la fecha localmente
    } else {
      setDate(new Date());
    }
  }, [cotizacionValue, setValue]);

  useEffect(() => {
    form.setValue("productos", productsPreventa);
    form.clearErrors("productos");
  }, [productsPreventa]);

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
          <FormField
            control={form.control}
            name="productos"
            render={({ field }) => (
              <FormItem>
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Productos</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <ProductsPreventaTable
                      productsVenta={productsPreventa}
                      setProductsVenta={setProductsPreventa}
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
              <CardTitle>Obsequios</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <ObsequiosPreventaTable
                obsequiosPreventa={obsequiosPreventa}
                setObsequiosPreventa={setObsequiosPreventa}
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
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Información adicional</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <FormField
                control={control}
                name="cotizacion"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-start space-y-3 mb-4">
                    <FormLabel>Cotización</FormLabel>
                    <div className="flex space-x-2">
                      <div className="space-y-1 leading-none">
                        <FormLabel>No</FormLabel>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value === "si"}
                          onCheckedChange={(checked) =>
                            field.onChange(checked ? "si" : "no")
                          }
                          disabled={formSubmitIsLoading}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Sí</FormLabel>
                      </div>
                    </div>
                  </FormItem>
                )}
              />
              {cotizacionValue === "si" && (
                <FormField
                  control={control}
                  name="fechaValidez"
                  render={({ field }) => (
                    <FormItem className="flex flex-col space-y-2">
                      <FormLabel>Fecha de validez</FormLabel>
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
              )}
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
                  Registrar Pre-Venta
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
