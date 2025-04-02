// Package
import { User, Hash } from "lucide-react";
import { RiInfoCardFill, RiMotorbikeFill } from "@remixicon/react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableCell,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { formatDateLong } from "@/lib/formateador";
import { Label } from "@/components/ui/label";
// import { Separator } from '@/components/ui/separator';

import { DetailBoletaButtons } from "@/app/inventario/motos/reservaciones/[id]/boleta/_components/buttons/DetailBoletaButtons";
import { ImprimirBoletaButton } from "@/app/inventario/motos/reservaciones/[id]/boleta/_components/buttons/ImprimirBoletaButton";

export function DetailReservacionBoletaContent({
  reservacionData,
  counterBoleta,
}) {
  return (
    <Card className="w-full max-w-7xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="flex items-center gap-2">
          <RiInfoCardFill className="h-9 w-9" />
          <Label className="sm:text-4xl text-xl font-bold">Boleta</Label>
        </div>
        <ImprimirBoletaButton reservacionData={reservacionData} />
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
              {reservacionData?.cliente?.tipo === "persona" ? (
                <div className="space-y-2">
                  <p>
                    <strong>DNI:</strong> {reservacionData?.cliente?.datos?.dni}
                  </p>
                  <p>
                    <strong>Nombre:</strong>{" "}
                    {reservacionData?.cliente?.datos?.nombres}{" "}
                    {reservacionData?.cliente?.datos?.apellidos}
                  </p>
                  <p>
                    <strong>Celular:</strong>{" "}
                    {reservacionData?.cliente?.datos?.celular}
                  </p>
                  <p>
                    <strong>Email:</strong>{" "}
                    {reservacionData?.cliente?.datos?.email}
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <p>
                    <strong>RUC:</strong> {reservacionData?.cliente?.datos?.ruc}
                  </p>
                  <p>
                    <strong>Razon Social:</strong>{" "}
                    {reservacionData?.cliente?.datos?.nombre}
                  </p>
                  <p>
                    <strong>Celular:</strong>{" "}
                    {reservacionData?.cliente?.datos?.celular}
                  </p>
                  <p>
                    <strong>Email:</strong>{" "}
                    {reservacionData?.cliente?.datos?.email}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Hash className="mr-2" />
                Detalles de la Reserva
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p>
                  <strong>Pago Inicial:</strong> S/.{" "}
                  {reservacionData?.pagoInicial}
                </p>
                <p>
                  <strong>Fecha Límite:</strong>{" "}
                  {formatDateLong(reservacionData?.fechaLimite, false)}
                </p>
                <p>
                  <strong>Comentario:</strong> {reservacionData?.comentario}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <RiMotorbikeFill className="mr-2" />
              Moto
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Descripción</TableHead>
                  <TableHead>Categoría</TableHead>
                  <TableHead>Marca</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                    <TableRow key={reservacionData?.moto?.code}>
                      <TableCell className="font-medium">
                        {reservacionData?.moto?.nombre}
                      </TableCell>
                      <TableCell>{reservacionData?.moto?.descripcion}</TableCell>
                      <TableCell>{reservacionData?.moto?.categoria?.nombre}</TableCell>
                      <TableCell>{reservacionData?.moto?.marca?.nombre}</TableCell>
                    </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <div className="mt-4">
          <DetailBoletaButtons reservacionData={reservacionData} counterBoleta={counterBoleta} />
        </div>
      </CardContent>
    </Card>
  );
}
