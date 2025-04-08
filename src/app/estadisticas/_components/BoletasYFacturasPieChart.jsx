"use client";
import { TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";
import { useState, useEffect } from "react";
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

export function BoletasYFacturasPieChart(
  dataCounterBoletas,
  dataCounterFacturas
) {
  console.log(dataCounterBoletas);
  console.log(dataCounterFacturas);

  const router = useRouter();

  const [mes, setMes] = useState(new Date().getMonth() + 1);
  const [anio, setAnio] = useState(new Date().getFullYear());

  function handleDateChange(month, year) {
    setMes(month);
    setAnio(year);
  }
  function filtrarBoletasyFacturasPorMes(data, mes, anio) {

  }

  const dataMensual = { boletas: 20, facturas: 30 };

  // Extraer boletas y facturas del mes seleccionado

  const { boletas = 0, facturas = 0 } = dataMensual || {};

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

  const mensaje =  ComparacionBoletasFacturas({ boletas, facturas });

  const chartData = [
    { tipoComprobante: "Boletas", cantidad: boletas, fill: "#10b981" },
    { tipoComprobante: "Facturas", cantidad: facturas, fill: "#f59e0b" },
  ];

  const chartConfig = {
    boletas: {
      label: "Boletas",
      color: "hsl(var(--chart-1))",
    },
    facturas: {
      label: "Facturas",
      color: "hsl(var(--chart-2))",
    },
  };

  useEffect(() => {
    router.refresh();
  }, [mes, anio, router]);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Boletas y facturas emitidas</CardTitle>
        <CardDescription>
          <span className="font-bold mr-2">Seleccione el mes y año: </span>
          <MesAnioPicker onChange={handleDateChange} />
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={chartData}
              dataKey="cantidad"
              label
              nameKey="tipoComprobante"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          {mensaje}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Mostrando total de boletas y facturas emitidas por mes.
        </div>
      </CardFooter>
    </Card>
  );
}
