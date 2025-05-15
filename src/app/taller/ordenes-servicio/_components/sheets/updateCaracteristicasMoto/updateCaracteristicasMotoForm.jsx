"use client";

import { useForm } from "react-hook-form";

// import { useState} from "react";
// import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

import {
  RiArrowUpDownLine,
  RiFlashlightFill,
  RiDashboard2Line,
  RiOilLine,
  RiPaletteLine,
  RiRepeatLine,
  RiRuler2Fill,
  RiSpeedLine,
  RiStopMiniFill,
} from "@remixicon/react";

export function UpdateCaracteristicasMotoForm({
  onSave,
  onClose,
  defaultValues,
  MotoData,
}) {
  // const router = useRouter();

  const updateCaracteristicasMotoForm = useForm({
    defaultValues: defaultValues || {
      motor: MotoData?.caracteristicas?.motor,
      cilindrada: MotoData?.caracteristicas?.cilindrada,
      potencia: MotoData?.caracteristicas?.potencia,
      frenos: MotoData?.caracteristicas?.frenos,
      transmision: MotoData?.caracteristicas?.transmision,
      dimensiones: MotoData?.caracteristicas?.dimensiones,
      capacidadCombustible: MotoData?.caracteristicas?.capacidadCombustible,
      suspension: MotoData?.caracteristicas?.suspension,
      colores: MotoData?.caracteristicas?.colores,
    },
  });

  const {
    handleSubmit,
    control,
    // clearErrors,
    // watch,
    // reset: resetForm,
  } = updateCaracteristicasMotoForm;

  // const [formSubmitIsLoading, setFormSubmitIsLoading] = useState(false);

  // Manejo de formulario
  // Manejo de formulario
  const onSubmit = handleSubmit((data) => {
    onSave(data);
    onClose();
    toast.success("Características actualizadas correctamente");
  });

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Actualizar Características de la Moto</SheetTitle>
        <SheetDescription>
          Modifique la información de la moto. Luego pulse en actualizar
        </SheetDescription>
      </SheetHeader>
      <Form {...updateCaracteristicasMotoForm}>
        <form onSubmit={onSubmit} className="grid gap-4 py-4">
          <FormField
            control={control}
            name="motor"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <RiDashboard2Line className="h-5 w-5" />
                  <FormLabel>Motor</FormLabel>
                </div>

                <div className="relative">
                  <FormControl>
                    <Input
                      placeholder="Monocilíndrico, OHV, 4 tiempos"
                      className="pl-2"
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="cilindrada"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <RiSpeedLine className="h-5 w-5" />
                  <FormLabel>Cilindrada</FormLabel>
                </div>
                <div className="relative">
                  <FormControl>
                    <Input
                      placeholder="200 cc."
                      className="pl-2"
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="potencia"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <RiFlashlightFill className="h-5 w-5" />
                  <FormLabel>Potencia</FormLabel>
                </div>
                <div className="relative">
                  <FormControl>
                    <Input
                      placeholder="16 HP / 8000 RPM (12kw)"
                      className="pl-2"
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="frenos"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <RiStopMiniFill className="h-5 w-5" />
                  <FormLabel>Frenos</FormLabel>
                </div>
                <div className="relative">
                  <FormControl>
                    <Input
                      placeholder="Disco / Tambor"
                      className="pl-2"
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="transmision"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <RiRepeatLine className="h-5 w-5" />
                  <FormLabel>Transmisión</FormLabel>
                </div>
                <div className="relative">
                  <FormControl>
                    <Input
                      placeholder="Manual, 5 velocidades"
                      className="pl-2"
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="dimensiones"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <RiRuler2Fill className="h-5 w-5" />
                  <FormLabel>Dimensiones</FormLabel>
                </div>
                <div className="relative">
                  <FormControl>
                    <Input
                      placeholder="208.5 cm. x 73 cm. x 110.5 cm."
                      className="pl-2"
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="capacidadCombustible"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <RiOilLine className="h-5 w-5" />
                  <FormLabel>Capacidad de combustible</FormLabel>
                </div>
                <div className="relative">
                  <FormControl>
                    <Input
                      placeholder="15 litros"
                      className="pl-2"
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="suspension"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <RiArrowUpDownLine className="h-5 w-5" />
                  <FormLabel>Suspensión</FormLabel>
                </div>
                <div className="relative">
                  <FormControl>
                    <Input
                      placeholder="Telescópica / Brazos Oscilantes"
                      className="pl-2"
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="colores"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <RiPaletteLine className="h-5 w-5" />
                  <FormLabel>Colores</FormLabel>
                </div>
                <div className="relative">
                  <FormControl>
                    <Input
                      placeholder="Anaranjado y negro"
                      className="pl-2"
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <SheetFooter>
            <SheetClose asChild>
              <Button onClick={onSubmit}>Actualizar</Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </Form>
    </SheetContent>
  );
}
