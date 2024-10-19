'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Tag, CheckCircle, XCircle, Bike, Package, Save } from 'lucide-react';

export function CreateFormMarca() {
  return (
    <>
      <form className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nombre</Label>
          <Input id="name" name="name" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Descripción</Label>
          <Textarea id="description" name="description" rows={4} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="segment">Segmento</Label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecciona un segmento" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Motos">
                <div className="flex items-center">
                  <Bike className="mr-2 h-4 w-4" />
                  Motos
                </div>
              </SelectItem>
              <SelectItem value="Productos">
                <div className="flex items-center">
                  <Package className="mr-2 h-4 w-4" />
                  Productos
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="isActive"
          />
          <Label htmlFor="isActive">
            {true ? (
              <span className="flex items-center text-green-600">
                <CheckCircle className="mr-1 h-4 w-4" />
                Activo
              </span>
            ) : (
              <span className="flex items-center text-red-600">
                <XCircle className="mr-1 h-4 w-4" />
                Inactivo
              </span>
            )}
          </Label>
        </div>
        <Button type="submit" className="w-full" disabled={false}>
          {false ? (
            'Creando...'
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Crear Marca
            </>
          )}
        </Button>
      </form>
    </>
  );
}
