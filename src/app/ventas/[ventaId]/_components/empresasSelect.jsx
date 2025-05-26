"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { useEffect } from "react";

export function EmpresasSelect({
  empresas,
  selectedEmpresa,
  setSelectedEmpresa,
  disabled = false,
}) {
  useEffect(() => {
    if (Object?.keys(selectedEmpresa)?.length !== 0 && empresas?.length > 0) {
      setSelectedEmpresa(empresas[0]);
    }
  }, [empresas, setSelectedEmpresa]);

  return (
    <div className="flex items-center gap-2">
      <p className="text-sm font-bold">
        Empresa:
        
      </p>
      <div className="relative flex gap-2 items-center">
        <Select
          value={selectedEmpresa || ""}
          onValueChange={setSelectedEmpresa}
          disabled={disabled}
        >
          <SelectTrigger className="w-full pl-2">
            <SelectValue placeholder="Seleccione una empresa" />
          </SelectTrigger>
          <SelectContent>
            {empresas?.map((empresa) => (
              <SelectItem key={empresa?._id} value={empresa}>
                {empresa?.nombre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {/* Tooltip */}
        {disabled && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p>La empresa no se puede cambiar después de haber impreso un comprobante</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    </div>
  );
}
