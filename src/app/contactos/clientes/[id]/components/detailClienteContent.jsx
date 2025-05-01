"use client";
import { useRouter } from "next/navigation";
import { ExternalLink, User } from "lucide-react";
import { RiFileListLine, RiFolderHistoryLine } from "@remixicon/react";
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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatDateLong } from "@/lib/formateador";
import { Label } from "@/components/ui/label";
import { formatMoney } from "@/lib/utils";

export function DetailClienteContent({ clienteData, ventasHistoricasData }) {
  const router = useRouter();
  return (
    <Card className="w-full max-w-7xl mx-auto">
      <CardHeader className="flex flex-col gap-2 items-center justify-between space-y-0 pb-4 md:flex-row  ">
        <div className="flex items-center gap-2">
          <RiFileListLine className="h-9 w-9" />
          <Label className="sm:text-4xl text-xl font-bold">
            Detalle del cliente
          </Label>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="mr-2" />
              Información del Cliente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-y-2 gap-x-4">
              {clienteData?.tipo === "persona" ? (
                <>
                  <p>
                    <strong>Nombre:</strong> {clienteData?.datos?.nombres}{" "}
                    {clienteData?.datos?.apellidos}
                  </p>
                  <p>
                    <strong>DNI:</strong> {clienteData?.datos?.dni}
                  </p>
                </>
              ) : (
                <>
                  <p>
                    <strong>Razón Social:</strong>{" "}
                    {clienteData?.datos?.razonSocial}
                  </p>
                  <p>
                    <strong>RUC:</strong> {clienteData?.datos?.ruc}
                  </p>
                  <p>
                    <strong>Representante Legal:</strong>{" "}
                    {clienteData?.datos?.representanteLegal}
                  </p>
                </>
              )}
              {clienteData?.datos?.direccion && (
                <p>
                  <strong>Dirección:</strong> {clienteData?.datos?.direccion}
                </p>
              )}
              {clienteData?.datos?.email && (
                <p>
                  <strong>Email:</strong> {clienteData?.datos?.email}
                </p>
              )}
              {clienteData?.datos?.celular && (
                <p>
                  <strong>Celular:</strong> {clienteData?.datos?.celular}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <RiFolderHistoryLine className="mr-2" />
              Historial de ventas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Código</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Productos</TableHead>
                  <TableHead>Monto</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ventasHistoricasData?.map((venta) => {
                  const total = venta.productos.reduce(
                    (acc, p) => acc + (p.precioVenta || 0) * (p.cantidad || 1),
                    0
                  );

                  return (
                    <TableRow key={venta._id}>
                      <TableCell className="font-medium">
                        {venta.code}
                      </TableCell>
                      <TableCell>
                        {formatDateLong(venta.fecha, false)}
                      </TableCell>
                      <TableCell>{venta.productos.length}</TableCell>
                      <TableCell>S/. {formatMoney(total)}</TableCell>
                      <TableCell>
                        <TooltipProvider delayDuration={0}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div
                                className="cursor-pointer flex"
                                onClick={() =>
                                  router.push(
                                    `/ventas/ventas-historicas/${venta._id}`
                                  )
                                }
                              >
                                <RiFileListLine className="w-5 h-5 text-muted-foreground hover:text-foreground" />
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="flex items-center justify-center gap-1">
                                Detalle
                                <ExternalLink className="h-3 w-3" />
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}
