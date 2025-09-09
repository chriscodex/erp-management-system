"use client";
import { TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";
import { useState, useMemo ,useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { MesAnioPicker } from "@/components/calendars/MesAnioPicker";
export default function BoletasYFacturasPieChart({
  dataVentasHistoricas,
  dataOrdenesDeServicioHistoricas,
}) {
  const router = useRouter();
  const [mes, setMes] = useState(new Date().getMonth() + 1);
  const [anio, setAnio] = useState(new Date().getFullYear());

  function handleDateChange(month, year) {
    setMes(month);
    setAnio(year);
  }
  // Calcular boletas y facturas
  const { boletas, facturas } = useMemo(() => {
    let boletas = 0;
    let facturas = 0;

    // Ventas históricas
    dataVentasHistoricas?.ventasHistoricas?.forEach((venta) => {
      const fecha = new Date(venta.fecha);
      if (fecha.getMonth() + 1 === mes && fecha.getFullYear() === anio) {
        if (venta.comprobante === "Boleta impresa") boletas++;
        if (venta.comprobante === "Factura impresa") facturas++;
      }
    });

    // Órdenes de servicio
    dataOrdenesDeServicioHistoricas?.ordenesDeServicioHistoricas?.forEach(
      (orden) => {
        const fecha = new Date(orden.fechaIngreso);
        if (fecha.getMonth() + 1 === mes && fecha.getFullYear() === anio) {
          if (orden.comprobante === "Boleta impresa") boletas++;
          if (orden.comprobante === "Factura impresa") facturas++;
        }
      }
    );

    return { boletas, facturas };
  }, [dataVentasHistoricas, dataOrdenesDeServicioHistoricas, mes, anio]);

  const total = boletas + facturas;

  function ComparacionBoletasFacturas({ boletas, facturas }) {
    let mensaje = "";

    if (boletas === 0 && facturas === 0) {
      mensaje = "No hay datos suficientes.";
    } else if (boletas === 0 || facturas === 0) {
      const tipo = boletas > 0 ? "boletas" : "facturas";
      mensaje = `Solo se han emitido ${tipo} este mes.`;
    } else {
      const mayor = boletas > facturas ? "boletas" : "facturas";
      const menor = boletas > facturas ? "facturas" : "boletas";
      const diferencia =
        ((Math.max(boletas, facturas) - Math.min(boletas, facturas)) /
          Math.min(boletas, facturas)) *
        100;
      mensaje = `Se han emitido un ${diferencia.toFixed(
        1
      )}% más de ${mayor} que ${menor} este mes.`;
    }
    return mensaje;
  }

  const mensaje = ComparacionBoletasFacturas({ boletas, facturas });

  const chartData = [
    {
      tipoComprobante: "Boletas",
      cantidad: boletas,
      fill: "hsl(var(--chart-5))",
    },
    {
      tipoComprobante: "Facturas",
      cantidad: facturas,
      fill: "hsl(var(--chart-1))",
    },
  ];

  const chartConfig = {
    boletas: {
      label: "Boletas",
      color: "hsl(var(--chart-5))",
    },
    facturas: {
      label: "Facturas",
      color: "hsl(var(--chart-1))",
    },
  };

  useEffect(() => {
    router.refresh();
  }, [mes, anio, router]);

  return (
    <Card className="flex flex-col w-full xl:flex-1 xl:self-start">
      <CardHeader className="items-center pb-0">
        <CardTitle>Boletas y facturas emitidas</CardTitle>
        <CardDescription>
          <span className="font-bold mr-2">Seleccione el mes y año:</span>
          <MesAnioPicker onChange={handleDateChange} />
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
        >
          {total > 0 ? (
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              <Pie
                data={chartData}
                dataKey="cantidad"
                nameKey="tipoComprobante"
                label
              />
            </PieChart>
          ) : (
            <div className="text-6xl font-bold text-muted-foreground text-center pt-20">
              0
            </div>
          )}
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          {mensaje}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Mostrando total de boletas y facturas emitidas en el periodo
          seleccionado.
        </div>
      </CardFooter>
    </Card>
  );
}
