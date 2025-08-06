'use client';

import {
  User,
  Package,
  Hash,
  Plus,
  IdCardIcon,
  Save,
  Loader2,
} from 'lucide-react';
import { RiInfoCardFill } from '@remixicon/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  formatDateLong,
  formatDateShort,
  formatearCodigoCounterBoletaFactura,
} from '@/lib/formateador';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';

import { ImprimirFacturaButton } from '@/app/taller/ordenes-servicio/[id]/factura/_components/buttons/imprimirFacturaButton';
import { FinalizarOrdenDeServicioButton } from '@/app/taller/ordenes-servicio/[id]/_components/buttons/FinalizarOrdenDeServicioButton';
import { formatMoney } from '@/lib/utils';
import { HomeRepairService } from '@mui/icons-material';
import { DeleteProductoFromInventarioButton } from '@/app/taller/ordenes-servicio/[id]/_components/buttons/deleteProductoFromInventarioButton';
import { addRucSchemaForm } from '@/app/taller/ordenes-servicio/[id]/factura/_services/validations/addRucSchemaForm';
import { updateOrdenServicioRequestClient } from '@/app/taller/ordenes-servicio/[id]/factura/_services/requests';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export function DetailFacturaContent({ ordenDeServicioData, empresas }) {
  const [showRucInput, setShowRucInput] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(addRucSchemaForm),
    defaultValues: {
      ruc: '',
    },
  });

  const { handleSubmit, watch, control, clearErrors } = form;

  const formData = watch();

  // Obtener el RUC del cliente
  const clienteRuc = formData?.ruc || ordenDeServicioData?.clienteRuc || '';

  // Estados de carga
  const [formSubmitIsLoading, setFormSubmitIsLoading] = useState(false);

  // Manejo de formulario
  const onSubmit = handleSubmit(async () => {
    let updateObject = {
      clienteRuc: formData?.ruc,
    };
    // Toast promise
    toast.promise(
      updateOrdenServicioRequestClient(
        ordenDeServicioData._id,
        updateObject,
        setFormSubmitIsLoading
      ),
      {
        loading: 'Agregando RUC...',
        success: () => {
          clearErrors();
          window.location.reload();
          return `RUC agregado correctamente, puede imprimir la factura`;
        },
        error: (error) => {
          setFormSubmitIsLoading(false);
          return error;
        },
      }
    );
  });

  const precioTotalProductos = ordenDeServicioData?.productos?.reduce(
    (acc, product) => {
      return acc + product.precioVenta;
    },
    0
  );

  const precioTotalServicios = ordenDeServicioData?.servicios?.reduce(
    (acc, servicio) => {
      return acc + servicio.precio;
    },
    0
  );

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
                    ordenDeServicioData={ordenDeServicioData}
                    clienteRuc={clienteRuc}
                    empresas={empresas}
                    reimprimir={!!ordenDeServicioData?.counter}
                    loading={loading}
                    setLoading={setLoading}
                    disabled={
                      !ordenDeServicioData?.cliente?.datos?.ruc &&
                      !ordenDeServicioData?.clienteRuc
                    }
                  />
                </div>
              </TooltipTrigger>
              {!ordenDeServicioData?.cliente?.datos?.ruc &&
                !ordenDeServicioData?.clienteRuc && (
                  <TooltipContent>
                    <p>Registre el RUC del cliente para imprimir la factura</p>
                  </TooltipContent>
                )}
            </Tooltip>
          </TooltipProvider>
          <FinalizarOrdenDeServicioButton
            ordenDeServicioId={ordenDeServicioData?._id}
            disabled={ordenDeServicioData?.comprobante !== 'Factura Impresa'}
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
              {ordenDeServicioData?.cliente?.tipo === 'persona' ? (
                <div className="space-y-2">
                  <p>
                    <strong>Nombre:</strong>{' '}
                    {ordenDeServicioData?.cliente?.datos?.nombres}{' '}
                    {ordenDeServicioData?.cliente?.datos?.apellidos}
                  </p>
                  <p>
                    <strong>DNI:</strong>{' '}
                    {ordenDeServicioData?.cliente?.datos?.dni}
                  </p>
                  {ordenDeServicioData?.cliente?.datos?.direccion && (
                    <p>
                      <strong>Dirección:</strong>{' '}
                      {ordenDeServicioData?.cliente?.datos?.direccion}
                    </p>
                  )}
                  {ordenDeServicioData?.cliente?.datos?.email && (
                    <p>
                      <strong>Email:</strong>{' '}
                      {ordenDeServicioData?.cliente?.datos?.email}
                    </p>
                  )}
                  {ordenDeServicioData?.cliente?.datos?.celular && (
                    <p>
                      <strong>Celular:</strong>{' '}
                      {ordenDeServicioData?.cliente?.datos?.celular}
                    </p>
                  )}
                  {ordenDeServicioData?.clienteRuc && (
                    <p>
                      <strong>RUC:</strong> {ordenDeServicioData?.clienteRuc}
                    </p>
                  )}
                  {!ordenDeServicioData?.cliente?.datos?.ruc &&
                    !ordenDeServicioData?.clienteRuc && (
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
                        )}
                      </div>
                    )}
                </div>
              ) : (
                <div className="space-y-2">
                  <p>
                    <strong>Razon Social:</strong>{' '}
                    {ordenDeServicioData?.cliente?.datos?.razonSocial}
                  </p>
                  <p>
                    <strong>RUC:</strong>{' '}
                    {ordenDeServicioData?.cliente?.datos?.ruc}
                  </p>
                  <p>
                    <strong>Representante Legal:</strong>{' '}
                    {ordenDeServicioData?.cliente?.datos?.representanteLegal}
                  </p>
                  {ordenDeServicioData?.cliente?.datos?.direccion && (
                    <p>
                      <strong>Direccion:</strong>{' '}
                      {ordenDeServicioData?.cliente?.datos?.direccion}
                    </p>
                  )}
                  {ordenDeServicioData?.cliente?.datos?.email && (
                    <p>
                      <strong>Email:</strong>{' '}
                      {ordenDeServicioData?.cliente?.datos?.email}
                    </p>
                  )}
                  {ordenDeServicioData?.cliente?.datos?.celular && (
                    <p>
                      <strong>Celular:</strong>{' '}
                      {ordenDeServicioData?.cliente?.datos?.celular}
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
                Detalles de la Orden de Servicio
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p>
                  <strong>Código:</strong> {ordenDeServicioData?.code}
                </p>
                <p>
                  <strong>Fecha de ingreso:</strong>{' '}
                  {formatDateLong(ordenDeServicioData?.fechaIngreso, true)}
                </p>
                {ordenDeServicioData?.pago?.montoAdelanto != null && (
                  <p>
                    <strong>Monto adelantado:</strong> S/.
                    {formatMoney(ordenDeServicioData.pago.montoAdelanto)}
                  </p>
                )}
                {(ordenDeServicioData?.productos?.length > 0 ||
                  ordenDeServicioData?.servicios?.length > 0) && (
                  <p>
                    <strong>Importe total:</strong>{' '}
                    {(precioTotalProductos + precioTotalServicios).toFixed(2)}
                  </p>
                )}
                {ordenDeServicioData?.pago?.montoAdelanto != null && (
                  <p>
                    <strong>Importe restante:</strong>{' '}
                    <strong>
                      {(
                        precioTotalProductos +
                        precioTotalServicios -
                        ordenDeServicioData?.pago?.montoAdelanto
                      ).toFixed(2)}
                    </strong>
                  </p>
                )}
                {ordenDeServicioData?.counter && (
                  <p>
                    <strong>Número de comprobante:</strong>{' '}
                    {formatearCodigoCounterBoletaFactura(
                      ordenDeServicioData?.counter,
                      'factura'
                    )}
                  </p>
                )}
                <p className="flex items-center gap-2">
                  <strong>Comprobante:</strong>
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    ordenDeServicioData?.comprobante
                  )}
                </p>
                <p className="flex items-center gap-2">
                  <strong>Estado SUNAT:</strong>
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    ordenDeServicioData?.estadoSunat
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
                  <TableHead>Inventario</TableHead>
                  {ordenDeServicioData?.comprobante === 'Factura Impresa' && (
                    <TableHead>Acciones</TableHead>
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {ordenDeServicioData?.productos.map((producto) => {
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
                        S/.{' '}
                        {(producto?.precioVenta * producto?.cantidad).toFixed(
                          2
                        )}
                      </TableCell>
                      <TableCell>
                        {producto.inventario === 'eliminado' ? (
                          <Badge
                            variant="outline"
                            className="text-red-600 border-red-600"
                          >
                            Eliminado
                          </Badge>
                        ) : (
                          <Badge
                            variant="outline"
                            className="text-green-600 border-green-600"
                          >
                            Existente
                          </Badge>
                        )}
                      </TableCell>
                      {ordenDeServicioData?.comprobante ===
                        'Factura Impresa' && (
                        <TableCell>
                          {producto.inventario !== 'eliminado' &&
                            ordenDeServicioData?.comprobante ===
                              'Factura Impresa' && (
                              <DeleteProductoFromInventarioButton
                                ordenDeServicioData={ordenDeServicioData}
                                productoOrdenDeServicio={producto}
                              />
                            )}
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {ordenDeServicioData?.servicios?.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <HomeRepairService className="mr-2" />
                Servicios
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Descripción</TableHead>
                    <TableHead>Precio</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ordenDeServicioData?.servicios?.map((servicio) => {
                    return (
                      <TableRow key={servicio?.code}>
                        <TableCell>{servicio?.descripcion}</TableCell>
                        <TableCell>
                          S/.{formatMoney(servicio?.precio)}
                        </TableCell>
                        <TableCell>
                          {formatDateShort(servicio?.fecha, false)}
                        </TableCell>
                        <TableCell>
                          S/.{formatMoney(servicio?.precio)}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}
