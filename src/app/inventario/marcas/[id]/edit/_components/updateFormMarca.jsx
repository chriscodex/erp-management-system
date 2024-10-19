'use client';

import { useState } from 'react';
import { RiArrowLeftLine, RiInstanceFill } from '@remixicon/react';
import { Info, Save, Tag } from 'lucide-react';
import { useRouter } from 'next/navigation';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';

export function UpdateFormMarca({ marcaData }) {
  const router = useRouter();
  
  const { descripcion, segmentName, estado } = marcaData;

  const [state, setState] = useState(estado === 'activo');

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <RiInstanceFill className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Nombre:</span>
        </div>
        <Input name="description" value={descripcion} />
        <Separator />
      </div>
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Info className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Descripción:</span>
        </div>
        <Input name="description" value={descripcion} />
        <Separator />
        <div className="flex items-center space-x-2">
          <Tag className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Segmento:</span>
          <Select value={segmentName}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Seleccione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Motos">Motos</SelectItem>
              <SelectItem value="Productos">Productos</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Separator />
        <div className="flex items-center space-x-2">
          <Label htmlFor="isActive">Estado:</Label>
          <Switch id="isActive" checked={state} />
          <span>{estado ? 'Activo' : 'Inactivo'}</span>
        </div>
        <Separator />
        <div className="flex justify-end space-x-2 mt-4">
          <div className="flex space-x-2">
            <Button onClick={() => router.back()} variant="outline">
              <RiArrowLeftLine className="mr-2 h-4 w-4" />
              Cancelar
            </Button>
            <Button disabled={false}>
              <Save className="mr-2 h-4 w-4" />
              Guardar Cambios
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
