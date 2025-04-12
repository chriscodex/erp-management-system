import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

registerLocale("es", es);

function AnioPicker({ onChange }) {
  const [fecha, setFecha] = useState(new Date());

  const formattedYear = fecha.getFullYear();

  return (
    <DatePicker
      locale="es"
      selected={fecha}
      onChange={(date) => {
        setFecha(date);
        onChange(date.getFullYear()); // Solo el año
      }}
      dateFormat="yyyy"
      showYearPicker
      className="text-gray-900"
      customInput={
        <Button variant="outline" className="flex items-center gap-2">
          <Calendar size={16} /> {formattedYear}
        </Button>
      }
    />
  );
}

export { AnioPicker };