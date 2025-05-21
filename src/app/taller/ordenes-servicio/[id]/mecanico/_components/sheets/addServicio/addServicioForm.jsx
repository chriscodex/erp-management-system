"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";

import { AddFormCalendar } from "@/components/calendars/addFormCalendar";
import { format } from "date-fns"; //Calendar
import { es } from "date-fns/locale"; //Calendar

import { cn } from "@/lib/utils";
import { CalendarIcon, Text } from "lucide-react";

import { Button } from "@/components/ui/button";
import { MoneyInputField } from "@/components/formInputs/MoneyInputField";
import { servicioSchema } from "@/app/taller/ordenes-servicio/[id]/mecanico/_services/validations/servicioSchemaForm";

export function AddServicioForm({ onClose, onAgregarServicio, defaultValues }) {

  const [date, setDate] = useState(new Date());

  const [open, setOpen] = useState(false);

  const addForm = useForm({
    resolver: zodResolver(servicioSchema),
    defaultValues: defaultValues || {
      descripcion: "",
      precio: "",
      fecha: new Date(),
    },
  });

  const { handleSubmit, control, reset: resetForm } = addForm;

  // Estados de carga
  const [formSubmitIsLoading, setFormSubmitIsLoading] = useState(false);

  // Manejo de formulario
  const onSubmit = handleSubmit(async (data) => {
    setFormSubmitIsLoading(true);
    data = { ...data, fecha:date};
    onAgregarServicio?.(data);
    resetForm();
    onClose();
  });

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Agregar Servicio</SheetTitle>
        <SheetDescription>
          Complete los detalles para agregar un nuevo servicio.
        </SheetDescription>
      </SheetHeader>
      <Form {...addForm}>
        <form onSubmit={onSubmit} className="grid gap-4 py-4">
          <FormField
            control={control}
            name="descripcion"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Descripción</FormLabel>
                <div className="relative">
                  <Text className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <FormControl>
                    <Textarea
                      className="pl-8"
                      disabled={formSubmitIsLoading}
                      {...field}
                      placeholder="Escribe la descripción aquí"
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <MoneyInputField
            control={control}
            name="precio"
            title="Precio"
            formSubmitIsLoading={formSubmitIsLoading}
          />
          <FormField
            control={control}
            name="fecha"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-2">
                <FormLabel>Fecha</FormLabel>
                <FormControl>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[280px] justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? (
                          format(date, "PPP", { locale: es })
                        ) : (
                          <span>Selecciona una fecha</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <AddFormCalendar
                        captionLayout="dropdown-buttons"
                        fromYear={2020}
                        toYear={new Date().getFullYear()}
                        mode="single"
                        selected={date}
                        onSelect={(selectedDate) => {
                          if (selectedDate) {
                            field.onChange(selectedDate);
                            setDate(selectedDate);
                            setOpen(false);
                          }
                        }}
                        locale={es}
                        calendarDate={field.value}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <SheetFooter>
            <SheetClose asChild>
              <Button
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
                role="button"
                type="submit"
                disabled={formSubmitIsLoading}
                onClick={onSubmit}
              >
                Agregar
              </Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </Form>
    </SheetContent>
  );
}
