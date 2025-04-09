"use client";

import { useForm } from "react-hook-form";
// import { useState } from "react";
import { toast } from "sonner";
// import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
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

import {
  RiArrowUpDownLine,
  RiDashboard2Line,
  RiFlashlightFill,
  RiOilLine,
  RiPaletteLine,
  RiRepeatLine,
  RiRuler2Fill,
  RiSpeedLine,
  RiStopMiniFill,
} from "@remixicon/react";

export function AddCaracteristicasMotoForm({ onSave, onClose, defaultValues }) {
  // const router = useRouter();

  // const [date, setDate] = useState(new Date());

  const addCaracteriscasMotoForm = useForm({
    defaultValues: defaultValues || {
      motor: "",
      cilindrada: "",
      potencia: "",
      frenos: "",
      transmision: "",
      dimensiones: "",
      capacidadCombustible: "",
      suspension: "",
      colores: "",
    },
  });

  const {
    handleSubmit,
    control,
    // clearErrors,
    // reset: resetForm,
  } = addCaracteriscasMotoForm;

  // const [formSubmitIsLoading, setFormSubmitIsLoading] = useState(false);

  // Manejo de formulario
  const onSubmit = handleSubmit((data) => {
    onSave(data);
    onClose();
    toast.success('Características añadidas correctamente');
  });

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Agregar Características de la Moto</SheetTitle>
        <SheetDescription>
          Complete los detalles que considere necesarios
        </SheetDescription>
      </SheetHeader>
      <Form {...addCaracteriscasMotoForm}>
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
              <div
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
                role="button"
                type="submit"
                // disabled={formSubmitIsLoading}
                onClick={onSubmit}
              >
                Agregar
              </div>
            </SheetClose>
          </SheetFooter>
        </form>
      </Form>
    </SheetContent>
  );
}
