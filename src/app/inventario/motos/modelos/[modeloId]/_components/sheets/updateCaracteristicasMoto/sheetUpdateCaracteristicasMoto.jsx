"use client";

import { useState } from "react";
import { Edit } from "lucide-react";
import { Sheet } from "@/components/ui/sheet";

import { UpdateCaracteristicasMotoForm } from "@/app/inventario/motos/modelos/[modeloId]/_components/sheets/updateCaracteristicasMoto/updateCaracteristicasMotoForm";

export function SheetUpdateCaracteristicasMotoWrapper({
  onSave,
  defaultValues,
  MotoData,
}) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleOpenSheet = () => {
    setIsSheetOpen(true);
  };

  const handleCloseSheet = () => {
    setIsSheetOpen(false);
  };

  const handleSave = (data) => {
    onSave(data); // ← se guarda en el estado `caracteristicas` del form principal
    handleCloseSheet(); // ← cierra el sheet
  };

  return (
    <div className="cursor-pointer">
      <div
        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 cursor-pointer"
        onClick={handleOpenSheet}
      >
        <Edit className="w-5 h-5 text-white hover:text-foreground" />
        Actualizar Características de la Moto
      </div>
      {isSheetOpen && (
        <Sheet open={isSheetOpen} onOpenChange={handleCloseSheet}>
          <UpdateCaracteristicasMotoForm
            onSave={handleSave}
            onClose={handleCloseSheet}
            defaultValues={defaultValues}
            MotoData={MotoData}
          />
        </Sheet>
      )}
    </div>
  );
}
