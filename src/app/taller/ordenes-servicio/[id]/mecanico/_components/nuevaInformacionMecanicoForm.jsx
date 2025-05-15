"use client";

// import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Save, CalendarIcon } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { RiArrowLeftLine } from "@remixicon/react";

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
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { agregarNumeracionTable, cn } from "@/lib/utils";
import { updateOrdenDeServicioRequestClient } from "@/app/taller/ordenes-servicio/[id]/edit/_services/requests";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductsTallerTable } from "@/app/taller/ordenes-servicio/[id]/mecanico/_components/productsTallerTable/data-table";
import { ServiciosTallerTable } from "@/app/taller/ordenes-servicio/[id]/mecanico/_components/serviciosTallerTable/data-table";

export function NuevaInformacionMecanicoForm({ ordenDeServicioData }) {
  const router = useRouter();

  const [productsTaller, setProductsTaller] = useState(
    agregarNumeracionTable(ordenDeServicioData?.productos) || []
  );

  const [serviciosTaller, setServiciosTaller] = useState(
    agregarNumeracionTable(ordenDeServicioData?.servicios) || []
  );

  const defaultDate = ordenDeServicioData?.fechaEntregaEstimada
    ? new Date(ordenDeServicioData.fechaEntregaEstimada)
    : null;

  const [date, setDate] = useState(defaultDate);
  const [open, setOpen] = useState(false);

  const form = useForm({
    // resolver: zodResolver(createOrdenDeServicioSchema),
    defaultValues: {
      fechaEntregaEstimada: defaultDate,
      estado: ordenDeServicioData?.estado || "",
    },
  });

  const { handleSubmit, control, clearErrors } = form;

  // Estados de carga
  const [formSubmitIsLoading, setFormSubmitIsLoading] = useState(false);

  // Manejo de formulario
  const onSubmit = handleSubmit(async (data) => {
    const serviciosFormateados = serviciosTaller.map((servicio) => {
      const copiaServicios = structuredClone(servicio);
      delete copiaServicios.id;
      delete copiaServicios.numeracion;
      return copiaServicios;
    });

    const productsFormateados = productsTaller.map((producto) => ({
      id: producto._id,
      code: producto.code,
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      estado: producto.estado,
      stock: producto.stock,
      cantidad: producto.cantidad,
      precioCompra: producto.precioCompra,
      precioVenta: producto.precioVenta,
    }));

    const updateOrdenDeServicioObject = {
      ...ordenDeServicioData,
      ...data,
      servicios: serviciosFormateados,
      productos: productsFormateados,
    };

    console.log("Info mecanico", updateOrdenDeServicioObject);

    // Toast promise para buscar una persona
    toast.promise(
      updateOrdenDeServicioRequestClient(
        updateOrdenDeServicioObject,
        setFormSubmitIsLoading
      ),
      {
        loading: "Registrando...",
        success: (response) => {
          console.log(response);
          clearErrors();
          router.push(`/taller/ordenes-servicio/${ordenDeServicioData._id}`);
          return `Información del mecánico registrada correctamente`;
        },
        error: (error) => {
          setFormSubmitIsLoading(false);
          return error instanceof Error ? error.message : String(error);
        },
      }
    );
  });

  return (
    <>
      <Form {...form}>
        <form onSubmit={onSubmit} className="gap-4 py-4">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Información de la Orden de Servicio</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <FormField
                control={control}
                name="fechaEntregaEstimada"
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-2">
                    <FormLabel>Fecha de entrega estimada</FormLabel>
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
              />
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Servicios</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <ServiciosTallerTable
                serviciosTaller={serviciosTaller}
                setServiciosTaller={setServiciosTaller}
              />
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Productos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <ProductsTallerTable
                productsTaller={productsTaller}
                setProductsTaller={setProductsTaller}
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
                  Registrar Información (mecánico)
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
