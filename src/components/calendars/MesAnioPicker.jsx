import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

registerLocale("es", es);

function MesAnioPicker({ onChange }) {
  
  const [fecha, setFecha] = useState(new Date());


  const formattedDate = fecha.toLocaleDateString("es-ES", { month: "long", year: "numeric" });
  const formattedDateCorrected = formattedDate.replace(/^\w/, (c) => c.toUpperCase()); // Solo la primera letra en mayúscula

  return (
    <DatePicker
      locale="es"
      selected={fecha}
      onChange={(date) => {
        setFecha(date);
        onChange(date.getMonth() + 1, date.getFullYear()); // Pasar mes y año
      }}
      dateFormat="MM/yyyy"
      showMonthYearPicker
      className="text-gray-900 dark:text-white"
      customInput={
        <Button variant="outline" className="flex items-center gap-2">
          <Calendar size={16} /> {formattedDateCorrected}
        </Button>
      }
    />
  );
}

export { MesAnioPicker };
