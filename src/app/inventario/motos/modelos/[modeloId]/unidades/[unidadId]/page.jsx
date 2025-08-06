import { NavbarDynamic } from "@/components/navbar/NavbarDynamic";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BikeIcon,
  Package,
  DollarSign,
  TrendingUp,
  FileText,
  Receipt,
  AlertCircle,
} from "lucide-react";
import {
  RiArrowUpDownLine,
  RiDashboard2Line,
  RiFlashlightFill,
  RiOilLine,
  RiPaletteLine,
  RiRepeatLine,
  RiRuler2Fill,
  RiSpeedLine,
  RiStopMiniFill,
} from "@remixicon/react";
import Link from "next/link";
import { getMotoByIdRequestServer } from "@/app/inventario/motos/modelos/[modeloId]/unidades/[unidadId]/_services/requests";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { notFound } from "next/navigation";
import { DetailButtons } from "@/app/inventario/motos/modelos/[modeloId]/unidades/[unidadId]/_components/detailButtons";
import { RiExternalLinkLine, RiMotorbikeLine } from "@remixicon/react";

export default async function MotoDetailPage({ params }) {
  // eslint-disable-next-line no-undef
  const results = await Promise.allSettled([
    getServerSession(authOptions),
    getMotoByIdRequestServer(params.unidadId),
  ]);

  const session = results[0].value;
  const { moto } = results[1].value;

  if (!moto) {
    notFound();
  }

  const {
    precioVenta,
    precioCompra,
    gastos,
    nombre,
    modeloId: modeloData,
    almacenId: almacenData,
  } = moto;

  const margenValue = ((precioVenta - precioCompra) / precioCompra) * 100;

  const totalGastos = gastos?.reduce((total, gasto) => total + gasto?.monto, 0);

  const cantidadGastos = gastos?.length;

  const navbarTitles = [
    {
      title: "Inventario",
      href: "",
      active: false,
    },
    {
      title: "Motos",
      href: "",
      active: false,
    },
    {
      title: "Modelos",
      href: "/inventario/motos/modelos",
      active: true,
    },
    {
      title: modeloData?.nombre,
      href: `/inventario/motos/modelos/${modeloData?._id}`,
      active: true,
    },
    {
      title: `Moto ${nombre}`,
      href: "",
      active: false,
    },
  ];

  return (
    <NavbarDynamic titles={navbarTitles}>
      <div className="w-full">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {moto?.nombre}
            </h1>
            <Badge variant="outline" className="text-lg px-3 py-1">
              {moto?.code}
            </Badge>
          </div>

          <div className="grid md:grid-cols-3 grid-cols-1 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BikeIcon className="mr-2" />
                  Detalles del Modelo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">
                      Marca:
                    </span>
                    <span className="font-medium">
                      {modeloData?.marcaId?.nombre}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">
                      Categoría:
                    </span>
                    <span className="font-medium">
                      {modeloData?.categoryId?.nombre}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2 col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="mr-2" />
                  Descripción
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300">
                  {moto?.descripcion}
                </p>
              </CardContent>
            </Card>
            {moto?.caracteristicas &&
              Object.values(moto.caracteristicas).some((v) => v?.trim?.()) && (
                <Card className="md:col-span-3">
                  <CardHeader className="flex flex-row items-start gap-2">
                    <RiMotorbikeLine />
                    <CardTitle>Características de la moto</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {moto.caracteristicas.motor?.trim() && (
                      <div className="flex items-center gap-2">
                        <RiDashboard2Line className="text-muted-foreground" />
                        <p className="text-muted-foreground">Motor:</p>{" "}
                        {moto.caracteristicas.motor}
                      </div>
                    )}
                    {moto.caracteristicas.cilindrada?.trim() && (
                      <div className="flex items-center gap-2">
                        <RiSpeedLine className="text-muted-foreground" />
                        <p className="text-muted-foreground">
                          Cilindrada:
                        </p>{" "}
                        {moto.caracteristicas.cilindrada}
                      </div>
                    )}
                    {moto.caracteristicas.potencia?.trim() && (
                      <div className="flex items-center gap-2">
                        <RiFlashlightFill className="text-muted-foreground" />
                        <p className="text-muted-foreground">Potencia:</p>{" "}
                        {moto.caracteristicas.potencia}
                      </div>
                    )}
                    {moto.caracteristicas.frenos?.trim() && (
                      <div className="flex items-center gap-2">
                        <RiStopMiniFill className="text-muted-foreground" />
                        <p className="text-muted-foreground">Frenos:</p>{" "}
                        {moto.caracteristicas.frenos}
                      </div>
                    )}
                    {moto.caracteristicas.transmision?.trim() && (
                      <div className="flex items-center gap-2">
                        <RiRepeatLine className="text-muted-foreground" />
                        <p className="text-muted-foreground">
                          Transmisión:
                        </p>{" "}
                        {moto.caracteristicas.transmision}
                      </div>
                    )}
                    {moto.caracteristicas.dimensiones?.trim() && (
                      <div className="flex items-center gap-2">
                        <RiRuler2Fill className="text-muted-foreground" />
                        <p className="text-muted-foreground">
                          Dimensiones:
                        </p>{" "}
                        {moto.caracteristicas.dimensiones}
                      </div>
                    )}
                    {moto.caracteristicas.capacidadCombustible?.trim() && (
                      <div className="flex items-center gap-2">
                        <RiOilLine className="text-muted-foreground" />
                        <p className="text-muted-foreground">
                          Capacidad de combustible:
                        </p>{" "}
                        {moto.caracteristicas.capacidadCombustible}
                      </div>
                    )}
                    {moto.caracteristicas.suspension?.trim() && (
                      <div className="flex items-center gap-2">
                        <RiArrowUpDownLine className="text-muted-foreground" />
                        <p className="text-muted-foreground">
                          Suspensión:
                        </p>{" "}
                        {moto.caracteristicas.suspension}
                      </div>
                    )}
                    {moto.caracteristicas.colores?.trim() && (
                      <div className="flex items-center gap-2">
                        <RiPaletteLine className="text-muted-foreground" />
                        <p className="text-muted-foreground">Colores:</p>{" "}
                        {moto.caracteristicas.colores}
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="mr-2" />
                  Información de Inventario
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">
                      Almacén:
                    </span>
                    <span className="font-medium">{almacenData?.nombre}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">
                      Importado:
                    </span>
                    <Badge variant="default">
                      {moto?.importado === "si" ? "Sí" : "No"}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">
                      Proveedor:
                    </span>
                    <span className="font-medium">
                      {moto?.proveedorId?.nombre}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2 col-span-1">
              <CardHeader>
                <CardTitle className="h-auto flex items-center">
                  <AlertCircle className="mr-2" />
                  <p>Estado de la Moto</p>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">
                      Estado Actual
                    </p>
                    <p className="text-xl font-bold">
                      {moto?.estado?.titulo === "disponible"
                        ? "Disponible"
                        : moto?.estado?.titulo === "dañado"
                        ? "Dañado"
                        : moto?.estado?.titulo === "reparado"
                        ? "Reparado"
                        : moto?.estado?.titulo === "desarmado"
                        ? "Desarmado"
                        : moto?.estado?.titulo === "prevendido"
                        ? "Prevendido"
                        : moto?.estado?.titulo}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">
                      Observaciones
                    </p>
                    <p>{moto?.estado?.observaciones}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            {session?.user?.rol === "Administrador" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Receipt className="mr-2" />
                    Resumen de Gastos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">
                        Total de Gastos
                      </p>
                      <p className="text-2xl font-bold">
                        S/. {totalGastos?.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">
                        Cantidad de Gastos
                      </p>
                      <p className="text-2xl font-bold">
                        {cantidadGastos?.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <Link
                    className="flex justify-end"
                    href={`/inventario/motos/modelos/${modeloData?._id}/unidades/${moto?._id}/gastos`}
                    passHref
                  >
                    <Button className="flex items-center">
                      <TrendingUp className="mr-2" />
                      Ver Gastos
                      <RiExternalLinkLine />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
            <Card
              className={
                session?.user?.rol === "Administrador"
                  ? "md:col-span-2"
                  : "md:col-span-3"
              }
            >
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="mr-2" />
                  Información de Precios
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">
                      Precio de Compra
                    </p>
                    <p className="text-2xl font-bold">
                      S/. {parseFloat(precioCompra).toFixed(2).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">
                      Precio de Venta
                    </p>
                    <p className="text-2xl font-bold">
                      S/. {parseFloat(precioVenta).toFixed(2).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Margen</p>
                    <p
                      className={`text-2xl font-bold ${
                        margenValue.toFixed(2) >= 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {margenValue >= 0
                        ? `+${margenValue.toFixed(2)}`
                        : `-${margenValue.toFixed(2)}`}
                      %
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="mt-4">
            <DetailButtons motoId={moto?._id} modeloData={modeloData} />
          </div>
        </div>
      </div>
    </NavbarDynamic>
  );
}
