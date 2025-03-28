'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useEffect } from 'react';

export function EmpresasSelect({
  empresas,
  selectedEmpresa,
  setSelectedEmpresa,
}) {
  useEffect(() => {
    if (!selectedEmpresa && empresas?.length > 0) {
      setSelectedEmpresa(empresas[0]._id);
    }
  }, [empresas, selectedEmpresa, setSelectedEmpresa]);
  return (
    <div className="flex items-center gap-2">
      <p className="text-sm font-bold">Empresa:</p>
      <div className="relative">
        <Select
          value={selectedEmpresa || ''}
          onValueChange={setSelectedEmpresa}
        >
          <SelectTrigger className="w-full pl-2">
            <SelectValue placeholder="Seleccione una empresa" />
          </SelectTrigger>
          <SelectContent>
            {empresas?.map((empresa) => (
              <SelectItem key={empresa?._id} value={empresa?._id}>
                {empresa?.nombre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
