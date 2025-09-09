"use client";

import { Pie, PieChart } from "recharts";
import { useMemo, useState } from "react";
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

export default function OrigenDeServicioPieChart({
  dataOrdenesDeServicioHistoricas,
}) {
  const [mes, setMes] = useState(new Date().getMonth() + 1);
  const [anio, setAnio] = useState(new Date().getFullYear());

  function handleDateChange(month, year) {
    setMes(month);
    setAnio(year);
  }

  const { pagado, interno, garantia } = useMemo(() => {
    const ordenes =
      dataOrdenesDeServicioHistoricas.ordenesDeServicioHistoricas || [];

    const filtradas = ordenes.filter((orden) => {
      const fecha = new Date(orden.fechaIngreso);
      return fecha.getMonth() + 1 === mes && fecha.getFullYear() === anio;
    });

    const contadores = { pagado: 0, interno: 0, garantia: 0 };

    filtradas.forEach((orden) => {
      const origen = orden.origenServicio?.toLowerCase();
      if (contadores.hasOwnProperty(origen)) {
        contadores[origen]++;
      }
    });

    return contadores;
  }, [dataOrdenesDeServicioHistoricas, mes, anio]);

  const total = pagado + interno + garantia;

  const chartData = [
    {
      tipoComprobante: "Pagado",
      cantidad: pagado,
      cantidad: 10,
      fill: "hsl(var(--chart-4))",
    },
    {
      tipoComprobante: "Interno",
      cantidad: interno,
      fill: "hsl(var(--chart-5))",
    },
    {
      tipoComprobante: "Garantía",
      cantidad: garantia,
      fill: "hsl(var(--chart-1))",
    },
  ];

  const chartConfig = {
    pagado: {
      label: "Pagado",
      color: "hsl(var(--chart-4))",
    },
    interno: {
      label: "Interno",
      color: "hsl(var(--chart-5))",
    },
    garantia: {
      label: "Garantía",
      color: "hsl(var(--chart-1))",
    },
  };

  return (
    <Card className="flex flex-col w-full xl:flex-1 xl:self-start">
      <CardHeader className="items-center pb-0">
        <CardTitle>Origen del Servicio</CardTitle>
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
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={2}
                label
              />
            </PieChart>
          ) : (
            <div className="text-6xl font-bold text-muted-foreground text-center pt-20">0</div>
          )}
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          {total > 0
            ? `Total de servicios: ${total}`
            : "Sin registros este mes"}
        </div>
        <div className="leading-none text-muted-foreground">
          Distribución de órdenes de servicio por origen del servicio
        </div>
      </CardFooter>
    </Card>
  );
}
