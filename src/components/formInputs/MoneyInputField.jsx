import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

export function MoneyInputField({
  control,
  name,
  title,
  placeholder = '0.00',
  formSubmitIsLoading,
}) {
  const handleKeyDown = (e) => {
    // Evitamos que se envíe el formulario al presionar Enter
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-2">
          <FormLabel>{title}</FormLabel>
          <div className="relative">
            <p className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              S/.{' '}
            </p>
            <FormControl>
              <Input
                type="text"
                placeholder={placeholder}
                className="pl-10"
                autoComplete="off"
                disabled={formSubmitIsLoading}
                {...field}
                onChange={(e) => {
                  // Permitimos solo números y un único punto decimal
                  const value = e.target.value
                    .replace(/[^0-9.]/g, '') // Permite números y punto
                    .replace(/(\..*?)\..*/g, '$1'); // Solo un punto decimal
                  field.onChange(value); // Actualizamos el valor del campo
                }}
                onKeyDown={handleKeyDown} // Captura el evento de tecla Enter
              />
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
