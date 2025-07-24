"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { format } from "date-fns"; //Calendar
import { es } from "date-fns/locale"; //Calendar
import {
  Loader2,
  User,
  Lock,
  Shield,
  MapPin,
  Phone,
  IdCardIcon,
  SearchIcon,
  CalendarIcon, //Calendar
} from "lucide-react";

import { newUserSchema } from "@/app/usuarios/nuevo/_validations/newUserSchema";
import { createUserRequestClient } from "@/app/usuarios/nuevo/_services/requests";
import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { buscarPorDniClientRequest } from "@/lib/globalRequests";
import {
  onChangeCelular,
  onChangeNumero,
} from "@/components/formInputs/onChange";
import { AddFormCalendar } from "@/components/calendars/addFormCalendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"; //Calendar

function FormNewUser({ sucursales }) {
  const router = useRouter();

  const [date, setDate] = useState(new Date()); //Date Calendar
  const [open, setOpen] = useState(false); //Close calendar

  const form = useForm({
    resolver: zodResolver(newUserSchema),
    defaultValues: {
      dni: "",
      apellidos: "",
      nombres: "",
      celular: "",
      direccion: "",
      password: "",
      confirmPassword: "",
      rol: "Vendedor",
      fechaIngreso: new Date(),
      sucursalId: "",
    },
  });

  const { handleSubmit, watch, setValue, control, clearErrors } = form;

  const formData = watch();

  // Estados de carga
  const [formSubmitIsLoading, setFormSubmitIsLoading] = useState(false);
  const [searchByDniIsLoading, setSearchByDniIsLoading] = useState(false);

  // Manejo de formulario
  const onSubmit = handleSubmit(async (data) => {
    setFormSubmitIsLoading(true);

    const newUserData = {
      ...data,
      fechaIngreso: new Date(date),
    };

    // Toast promise para buscar una persona
    toast.promise(
      createUserRequestClient(newUserData, setFormSubmitIsLoading),
      {
        loading: "Creando...",
        success: () => {
          clearErrors();
          router.push("/usuarios");
          return `Usuario creado correctamente`;
        },

        error: (error) => {
          setFormSubmitIsLoading(false);
          return error;
        },
      }
    );
  });

  // Busqueda por DNI
  const handleSearchByDni = async (e) => {
    e.preventDefault();
    try {
      setSearchByDniIsLoading(true);

      const dni = formData.dni;
      if (!dni || dni.length !== 8) {
        setSearchByDniIsLoading(false);
        toast.warning("Por favor, ingrese un DNI válido", {
          description: "El DNI debe tener 8 dígitos",
        });
        return;
      }

      // Toast promise para buscar una persona
      toast.promise(buscarPorDniClientRequest(dni, setSearchByDniIsLoading), {
        loading: "Buscando...",
        success: (persona) => {
          setValue("apellidos", persona?.apellidos);
          setValue("nombres", persona?.nombres);
          clearErrors("apellidos");
          clearErrors("nombres");
          return `Persona encontrada`;
        },
        error: (error) => {
          setSearchByDniIsLoading(false);
          return error;
        },
      });
    } catch (error) {
      setSearchByDniIsLoading(false);
      toast.error("Error al buscar persona por DNI");
      console.error("Error al buscar persona por DNI:", error);
    }
  };

  return (
    <Card className="w-full max-w-7xl mr-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Crear Nuevo Usuario</CardTitle>
        <CardDescription>
          Ingrese los datos del nuevo usuario para el sistema.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-4">
            <FormField
              control={control}
              name="dni"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>DNI</FormLabel>
                  <div className="relative">
                    <IdCardIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="DNI"
                        className="pl-8"
                        autoComplete="off"
                        disabled={searchByDniIsLoading || formSubmitIsLoading}
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
                        searchByDniIsLoading
                          ? "opacity-75 pointer-events-none"
                          : "cursor-pointer"
                      )}
                      onClick={handleSearchByDni}
                    >
                      {searchByDniIsLoading ? (
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
                              <p>Busca por DNI</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </div>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="apellidos"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Apellidos</FormLabel>
                  <div className="relative">
                    {searchByDniIsLoading ? (
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
                        disabled={searchByDniIsLoading || formSubmitIsLoading}
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
                    {searchByDniIsLoading ? (
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
                        disabled={searchByDniIsLoading || formSubmitIsLoading}
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
                        placeholder="987654321"
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
              name="direccion"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Dirección</FormLabel>
                  <div className="relative">
                    <MapPin className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <FormControl>
                      <Input
                        placeholder="Av. Centenario 123"
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
              name="rol"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Rol</FormLabel>
                  <div className="relative">
                    <Shield className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      disabled={formSubmitIsLoading}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full pl-8">
                          <SelectValue placeholder="Seleccione un rol" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Vendedor">Vendedor</SelectItem>
                        <SelectItem value="Administrador">
                          Administrador
                        </SelectItem>
                        <SelectItem value="Tecnico">Técnico</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Contraseña</FormLabel>
                  <div className="relative">
                    <Lock className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••••"
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
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Confirmar Contraseña</FormLabel>
                  <div className="relative">
                    <Lock className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••••"
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
                              field.onChange(selectedDate); // 🔹 Actualiza el valor en el formulario
                              setDate(selectedDate); // Guarda la fecha seleccionada
                              setOpen(false); // Cierra el Popover
                            }
                          }}
                          locale={es}
                          calendarDate={field.value}
                          initialFocus
                          // {...field}
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
              name="sucursalId"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Sucursal</FormLabel>
                  <div className="relative">
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      disabled={formSubmitIsLoading}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full pl-2">
                          <SelectValue placeholder="Seleccione una sucursal" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {sucursales?.map((sucursal) => (
                          <SelectItem
                            key={sucursal?._id?.toString()}
                            value={sucursal?._id?.toString()}
                          >
                            {sucursal?.nombre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <div className="space-y-2 w-full flex justify-end">
              <Button
                className="max-w-40"
                disabled={formSubmitIsLoading || searchByDniIsLoading}
                type="submit"
              >
                {formSubmitIsLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creando Usuario...
                  </>
                ) : (
                  "Crear Usuario"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export { FormNewUser };
