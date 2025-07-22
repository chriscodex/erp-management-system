"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { CalendarIcon, Save } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AddFormCalendar } from "@/components/calendars/addFormCalendar";
import { format } from "date-fns"; //Calendar
import { es } from "date-fns/locale"; //Calendar
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  RiArrowLeftLine,
  RiBikeFill,
  RiFileTextFill,
  RiWallet3Line,
} from "@remixicon/react";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useWatch } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { cn } from "@/lib/utils";
import { shortDelay } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { estadosPagos } from "@/app/inventario/motos/_services/helpers";
import { MoneyInputField } from "@/components/formInputs/MoneyInputField";
import { createPedidoRequestClient } from "@/app/inventario/motos/pedidos/nuevo/_services/requests";

import { Textarea } from "@/components/ui/textarea";

import { SheetAddCaracteristicasMotoWrapper } from "@/app/inventario/motos/modelos/[modeloId]/_components/sheets/addCaracteristicasMoto/sheetAddCaracteristicasMoto";
import { createPedidoSchema } from "@/app/inventario/motos/pedidos/nuevo/_services/validations/createPedidoSchema";
import { SheetAddModeloWrapper } from "@/app/inventario/motos/pedidos/_components/sheets/addModelo/sheetAddModelo";
import { SheetAddProveedorWrapper } from "@/app/inventario/motos/pedidos/_components/sheets/addProveedor/sheetAddProveedor";
export function NuevoPedidoForm({
  modelos = [],
  modelosPedidos = [],
  proveedores = [],
  almacenes = [],
  categories = [],
  marcas = [],
}) {
  const router = useRouter();

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false); 

  const [limitDate, setLimitDate] = useState(new Date());
  const [limitOpen, setLimitOpen] = useState(false); 

  const form = useForm({
    resolver: zodResolver(createPedidoSchema),
    defaultValues: {
      moto: {
        descripcion: "",
      },
      importado: "no",
      fechaPago: new Date(),
      comentario: "",
      fechaLimite: new Date(),
    },
  });

  const { handleSubmit, control, setValue, clearErrors, setError } = form;

  const selectedModelIdWithPrefix = useWatch({
    control,
    name: "modeloId",
  });

  const [tipoModelo, idModelo] = selectedModelIdWithPrefix?.split("-") || [];

  // Estados de carga
  const [formSubmitIsLoading, setFormSubmitIsLoading] = useState(false);

  const [caracteristicas, setCaracteristicas] = useState(null);

  //Para manera el select de modelos

  const [selectedModeloId, setSelectedModeloId] = useState(null);

  const [listaModelosPedidos, setListaModelosPedidos] =
    useState(modelosPedidos);

  //Para manejar el select de proveedores

  const [selectedProveedorId, setSelectedProveedorId] = useState(null);

  const [listaProveedores, setListaProveedores] = useState(proveedores);

  const modeloSeleccionado =
    tipoModelo === "modelo"
      ? modelos.find((m) => m._id === idModelo)
      : listaModelosPedidos.find((m) => m._id === idModelo);

  const handleSaveCaracteristicas = async (data) => {
    setCaracteristicas(data);
    await shortDelay();
  };

  // Manejo de formulario
  const onSubmit = handleSubmit(async (data) => {
    const createPedidoObject = {
      ...data,
      modelo: modeloSeleccionado,
      caracteristicas: caracteristicas,
    };

    toast.promise(
      createPedidoRequestClient(
        createPedidoObject,
        setFormSubmitIsLoading,
        setError
      ),
      {
        loading: "Registrando...",

        success: (response) => {
          console.log(response);
          clearErrors();
          router.push(`/inventario/motos/pedidos`);
          return `Pedido registrado correctamente`;
        },
        error: (error) => {
          setFormSubmitIsLoading(false);
          return error;
        },
      }
    );
  });
  useEffect(() => {
    if (selectedModeloId) {
      setValue("modeloId", `pedido-${selectedModeloId}`);
    }
  }, [selectedModeloId, setValue]);

  useEffect(() => {
    if (selectedProveedorId) {
      setValue("proveedorId", selectedProveedorId);
    }
  }, [selectedProveedorId, setValue]);

  return (
    <>
      <Form {...form}>
        <form onSubmit={onSubmit} className="gap-4 py-4">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Modelo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <FormField
                control={control}
                name="modeloId"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Modelo</FormLabel>
                    <div className="relative">
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                        disabled={formSubmitIsLoading}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full pl-2">
                            <SelectValue placeholder="Seleccione un modelo" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {/* Grupo: Modelos de inventario */}
                          <SelectItem
                            disabled
                            value="titulo-modelos"
                            className="opacity-100 font-semibold text-muted-foreground"
                          >
                            Modelos de inventario
                          </SelectItem>
                          {Array.isArray(modelos) &&
                            modelos.map((modelo) => (
                              <SelectItem
                                key={`modelo-${modelo?._id}`}
                                value={`modelo-${modelo?._id}`}
                              >
                                {modelo?.nombre}
                              </SelectItem>
                            ))}

                          {/* Grupo: Modelos de pedidos */}
                          <SelectItem
                            disabled
                            value="titulo-modelos-pedido"
                            className="opacity-100 font-semibold text-muted-foreground mt-2"
                          >
                            Modelos de pedidos
                          </SelectItem>
                          {Array.isArray(listaModelosPedidos) &&
                            listaModelosPedidos.map((modelo) => (
                              <SelectItem
                                key={`pedido-${modelo?._id}`}
                                value={`pedido-${modelo?._id}`}
                              >
                                {modelo?.nombre}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              {modeloSeleccionado && (
                <div className="mt-4 text-sm space-y-1 border rounded-lg p-4 bg-muted/20">
                  <div>
                    <Label className="font-semibold">Nombre:</Label>{" "}
                    {modeloSeleccionado?.nombre}
                  </div>
                  <div>
                    <Label className="font-semibold">Categoría:</Label>{" "}
                    {modeloSeleccionado?.categoryId?.nombre}
                  </div>
                  <div>
                    <Label className="font-semibold">Marca:</Label>{" "}
                    {modeloSeleccionado?.marcaId?.nombre}
                  </div>
                  {/* Agrega más campos según tu estructura */}
                </div>
              )}
              <div className="flex items-end gap-2">
                <SheetAddModeloWrapper
                  categories={categories}
                  marcas={marcas}
                  onAddModelo={(nuevoModelo) => {
                    setSelectedModeloId(nuevoModelo._id);
                    setListaModelosPedidos((prev) => [...prev, nuevoModelo]);
                  }}
                />
              </div>
            </CardContent>
          </Card>
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
                    <FormLabel>Nombre</FormLabel>
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
              <div className="flex items-end gap-2">
                <SheetAddCaracteristicasMotoWrapper
                  onSave={handleSaveCaracteristicas}
                  defaultValues={caracteristicas}
                />
                {caracteristicas &&
                  (() => {
                    const count = Object.values(caracteristicas).filter(
                      (valor) =>
                        valor !== "" && valor !== null && valor !== undefined
                    ).length;
                    return count > 0 ? (
                      <span className="text-green-600 text-sm">
                        {count} característica(s) agregada(s)
                      </span>
                    ) : null;
                  })()}
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Información del pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <FormField
                control={control}
                name="estadoTitle"
                render={({ field }) => (
                  <FormItem className="space-y-2 md:col-span-1 col-span-2">
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <RiWallet3Line className="h-5 w-5" />
                      <FormLabel>Estado de Pago</FormLabel>
                    </div>
                    <div className="relative">
                      <Select
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                        disabled={formSubmitIsLoading}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full pl-2">
                            <SelectValue placeholder="Seleccione un estado" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {estadosPagos.map((estado) => (
                            <SelectItem key={estado.id} value={estado.id}>
                              {estado.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <MoneyInputField
                control={control}
                name="montoPagado"
                title="Monto pagado"
              />
              <MoneyInputField
                control={control}
                name="montoTotal"
                title="Monto total"
              />
              <FormField
                control={control}
                name="fechaPago"
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-2">
                    <FormLabel>Fecha de pago</FormLabel>
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
                  <FormItem className="space-y-2 col-span-2">
                    <FormLabel>Comentario (Opcional)</FormLabel>
                    <div className="relative">
                      <RiFileTextFill className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <FormControl>
                        <Textarea
                          disabled={formSubmitIsLoading}
                          {...field}
                          placeholder="Agregue un comentario"
                          className="pl-8"
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <div className="flex flex-col gap-3 lg:flex-row lg:gap-20 ">
                <div className="flex flex-col gap-3">
                  <FormField
                    control={control}
                    name="proveedorId"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel>Proveedor</FormLabel>
                        <div className="relative">
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                            disabled={formSubmitIsLoading}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full pl-2">
                                <SelectValue placeholder="Seleccione un proveedor" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {Array.isArray(listaProveedores) &&
                                listaProveedores.map((proveedor) => (
                                  <SelectItem
                                    key={proveedor?._id}
                                    value={proveedor?._id}
                                  >
                                    {proveedor?.nombre}
                                  </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                  <div className="flex items-end gap-2">
                    <SheetAddProveedorWrapper
                      onAddProveedor={(nuevoProveedor) => {
                        setSelectedProveedorId(nuevoProveedor._id);
                        setListaProveedores((prev) => [
                          ...prev,
                          nuevoProveedor,
                        ]);
                      }}
                    />
                  </div>
                </div>
                <FormField
                  control={control}
                  name="almacenId"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>Almacén</FormLabel>
                      <div className="relative">
                        <Select
                          defaultValue={field.value}
                          onValueChange={field.onChange}
                          disabled={formSubmitIsLoading}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full pl-2">
                              <SelectValue placeholder="Seleccione un almacen" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Array.isArray(almacenes) &&
                              almacenes.map((almacen) => (
                                <SelectItem
                                  key={almacen?._id}
                                  value={almacen?._id}
                                >
                                  {almacen?.nombre}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={control}
                name="importado"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-start space-y-3">
                    <FormLabel>Importado</FormLabel>
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
              <FormField
                control={control}
                name="fechaLimite"
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-2">
                    <FormLabel>Fecha límite (Notificaciones)</FormLabel>
                    <FormControl>
                      <Popover open={limitOpen} onOpenChange={setLimitOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[280px] justify-start text-left font-normal",
                              !limitDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {limitDate ? (
                              format(limitDate, "PPP", { locale: es })
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
                            selected={limitDate}
                            onSelect={(selectedLimitDate) => {
                              if (selectedLimitDate) {
                                field.onChange(selectedLimitDate);
                                setLimitDate(selectedLimitDate);
                                setLimitOpen(false);
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
                  Crear pedido
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
