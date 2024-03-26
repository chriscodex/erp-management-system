import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { onChangeNumero } from '@/components/formInputs/onChange';

export function NumberInputField({
  control,
  name,
  title,
  placeholder,
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
            <FormControl>
              <Input
                type="text"
                placeholder={placeholder}
                className="pl-2"
                autoComplete="off"
                disabled={formSubmitIsLoading}
                {...field}
                onChange={(e) => {
                  onChangeNumero(e, field);
                }}
                onKeyDown={handleKeyDown} // Captura el evento de tecla Enter
              />
            </FormControl>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
}
