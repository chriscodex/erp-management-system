import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

export function StringInputField({
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
        <FormItem className="space-y-2 col-span-2">
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
