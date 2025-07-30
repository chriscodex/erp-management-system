"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  User,
  Package,
  Gift,
  Hash,
  Loader2,
  Plus,
  IdCardIcon,
  Save,
} from "lucide-react";
import { RiInfoCardFill } from "@remixicon/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import {
  formatDateLong,
  formatearCodigoCounterBoletaFactura,
} from "@/lib/formateador";
import { Label } from "@/components/ui/label";

import { ImprimirFacturaButton } from "@/app/ventas/[ventaId]/factura/_components/buttons/imprimirFacturaButton";
import { Separator } from "@/components/ui/separator";
import { FinalizarVentaButton } from "@/app/ventas/[ventaId]/_components/buttons/finalizarVentaButton";
import { addRucSchemaForm } from "@/app/ventas/[ventaId]/factura/_services/validations/addRucSchemaForm";
import { updateVentaRequestClient } from "../_services/requests";

export function DetailFacturaContent({ ventaData, empresas }) {
  const router = useRouter();

  const [showRucInput, setShowRucInput] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(addRucSchemaForm),
    defaultValues: {
      ruc: "",
    },
  });

  const { handleSubmit, watch, control, clearErrors } = form;

  const formData = watch();

  // Estados de carga
  const [formSubmitIsLoading, setFormSubmitIsLoading] = useState(false);

  // Manejo de formulario
  const onSubmit = handleSubmit(async () => {
    let updateObject = {
      _id: ventaData._id,
      clienteRuc: formData?.ruc,
    };
    // Toast promise
    toast.promise(
      updateVentaRequestClient(updateObject, setFormSubmitIsLoading),
      {
        loading: "Agregando RUC...",
        success: (response) => {
          console.log(response);
          clearErrors();
          router.refresh();
          return `RUC agregado correctamente, puede imprimir la factura`;
        },
        error: (error) => {
          setFormSubmitIsLoading(false);
          return error;
        },
      }
    );
  });

  return (
    <Card className="w-full max-w-7xl mx-auto">
      <CardHeader className="flex flex-col lg:flex-row items-center justify-between space-y-0 pb-4">
        <div className="flex items-center gap-2">
          <RiInfoCardFill className="h-9 w-9" />
          <Label className="sm:text-4xl text-xl font-bold">Factura</Label>
        </div>
        <div className="flex flex-col items-center lg:flex-row gap-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <ImprimirFacturaButton
                    ventaData={ventaData}
                    empresas={empresas}
                    reimprimir={!!ventaData?.counter}
                    loading={loading}
                    setLoading={setLoading}
                    disabled={!ventaData?.clienteId?.datos?.ruc && !ventaData?.clienteRuc}
                  />
                </div>
              </TooltipTrigger>
              {!ventaData?.clienteId?.datos?.ruc && !ventaData?.clienteRuc && (
                <TooltipContent>
                  <p>
                    Registre el RUC del cliente para imprimir la factura
                  </p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
          <FinalizarVentaButton
            ventaId={ventaData?._id}
            disabled={ventaData?.comprobante !== "Factura Impresa"}
          />
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2" />
                Información del Cliente
              </CardTitle>
            </CardHeader>
            <CardContent>
              {ventaData?.clienteId?.tipo === "persona" ? (
                <div className="space-y-2">
                  <p>
                    <strong>Nombre:</strong>{" "}
                    {ventaData?.clienteId?.datos?.nombres}{" "}
                    {ventaData?.clienteId?.datos?.apellidos}
                  </p>
                  <p>
                    <strong>DNI:</strong> {ventaData?.clienteId?.datos?.dni}
                  </p>
                  {ventaData?.clienteId?.datos?.direccion && (
                    <p>
                      <strong>Dirección:</strong>{" "}
                      {ventaData?.clienteId?.datos?.direccion}
                    </p>
                  )}
                  {ventaData?.clienteId?.datos?.email && (
                    <p>
                      <strong>Email:</strong>{" "}
                      {ventaData?.clienteId?.datos?.email}
                    </p>
                  )}
                  {ventaData?.clienteId?.datos?.celular && (
                    <p>
                      <strong>Celular:</strong>{" "}
                      {ventaData?.clienteId?.datos?.celular}
                    </p>
                  )}
                  {ventaData?.clienteRuc && (
                    <p>
                      <strong>RUC:</strong> {ventaData?.clienteRuc}
                    </p>
                  )}
                  {!ventaData?.clienteId?.datos?.ruc && !ventaData?.clienteRuc && (
                    <div>
                      {/* Botón toggle */}
                      <Button
                        type="button"
                        className="mb-4"
                        onClick={() => setShowRucInput((prev) => !prev)}
                      >
                        Agregar RUC
                        <Plus className="h-4 w-4" />
                      </Button>

                      {showRucInput && (
                        <Form {...form}>
                          <form onSubmit={onSubmit} className="gap-4 pb-4">
                            <FormField
                              control={control}
                              name="ruc"
                              render={({ field }) => (
                                <FormItem className="space-y-2">
                                  <div className="relative">
                                    <IdCardIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <FormControl>
                                      <Input
                                        type="text"
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
                            <div className="mt-4 flex items-center justify-start space-x-2">
                              <Button
                                type="submit"
                                disabled={formSubmitIsLoading}
                              >
                                {formSubmitIsLoading ? (
                                  "Registrando..."
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
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                  <p>
                    <strong>Razon Social:</strong>{" "}
                    {ventaData?.clienteId?.datos?.razonSocial}
                  </p>
                  <p>
                    <strong>RUC:</strong> {ventaData?.clienteId?.datos?.ruc}
                  </p>
                  <p>
                    <strong>Representante Legal:</strong>{" "}
                    {ventaData?.clienteId?.datos?.representanteLegal}
                  </p>
                  <p>
                    <strong>Dirección:</strong>{" "}
                    {ventaData?.clienteId?.datos?.direccion}
                  </p>
                  {ventaData?.clienteId?.datos?.email && (
                    <p>
                      <strong>Email:</strong>{" "}
                      {ventaData?.clienteId?.datos?.email}
                    </p>
                  )}
                  {ventaData?.clienteId?.datos?.celular && (
                    <p>
                      <strong>Celular:</strong>{" "}
                      {ventaData?.clienteId?.datos?.celular}
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Hash className="mr-2" />
                Detalles de la Venta
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p>
                  <strong>Código:</strong> {ventaData?.code}
                </p>
                <p>
                  <strong>Fecha:</strong>{" "}
                  {formatDateLong(ventaData?.fecha, true)}
                </p>
                <p>
                  <strong>Vendedor:</strong>{" "}
                  {ventaData?.usuario?.nombres +
                    " " +
                    ventaData?.usuario?.apellidos}{" "}
                </p>
                {ventaData?.counter && (
                  <p>
                    <strong>Número de comprobante:</strong>{" "}
                    {formatearCodigoCounterBoletaFactura(
                      ventaData?.counter,
                      "factura"
                    )}
                  </p>
                )}
                <p className="flex items-center gap-2">
                  <strong>Comprobante:</strong>
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    ventaData?.comprobante
                  )}
                </p>
                <p className="flex items-center gap-2">
                  <strong>Estado SUNAT:</strong>
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    ventaData?.estadoSunat
                  )}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Package className="mr-2" />
              Productos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Código</TableHead>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Descripción</TableHead>
                  <TableHead>Precio</TableHead>
                  <TableHead>Cantidad</TableHead>
                  <TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ventaData?.productos.map((producto) => {
                  return (
                    <TableRow key={producto?.code}>
                      <TableCell className="font-medium">
                        {producto?.code}
                      </TableCell>
                      <TableCell>{producto?.nombre}</TableCell>
                      <TableCell>{producto?.descripcion}</TableCell>
                      <TableCell>
                        S/. {producto?.precioVenta.toFixed(2)}
                      </TableCell>
                      <TableCell>{producto?.cantidad}</TableCell>
                      <TableCell>
                        S/.{" "}
                        {(producto?.precioVenta * producto?.cantidad).toFixed(
                          2
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            <Separator className="my-4" />
            <div className="text-right">
              <strong>Subtotal:</strong> S/.
              {(
                0.82 *
                ventaData?.productos.reduce(
                  (acc, producto) =>
                    acc + producto?.precioVenta * producto?.cantidad,
                  0
                )
              ).toFixed(2)}
            </div>
            <div className="mt-2 text-right">
              <strong>IGV:</strong> S/.
              {(
                0.18 *
                ventaData?.productos.reduce(
                  (acc, producto) =>
                    acc + producto?.precioVenta * producto?.cantidad,
                  0
                )
              ).toFixed(2)}
            </div>
            <div className="mt-2 text-right">
              <strong>Total a Pagar:</strong> S/.
              {ventaData?.productos
                .reduce(
                  (acc, producto) =>
                    acc + producto?.precioVenta * producto?.cantidad,
                  0
                )
                .toFixed(2)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Gift className="mr-2" />
              Obsequios
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Código</TableHead>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Descripción</TableHead>
                  <TableHead>Cantidad</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ventaData?.obsequios && ventaData.obsequios.length > 0 ? (
                  ventaData.obsequios.map((obsequio) => (
                    <TableRow key={obsequio?.code}>
                      <TableCell className="font-medium">
                        {obsequio?.code}
                      </TableCell>
                      <TableCell>{obsequio?.nombre}</TableCell>
                      <TableCell>{obsequio?.descripcion}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{obsequio?.estado}</Badge>
                      </TableCell>
                      <TableCell>{obsequio?.cantidad}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      Sin obsequios.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}
