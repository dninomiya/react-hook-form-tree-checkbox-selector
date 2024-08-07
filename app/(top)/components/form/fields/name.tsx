import { FormData } from '@/app/settings/schema';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useFormContext } from 'react-hook-form';

export default function NameField() {
  const { control } = useFormContext<FormData>();

  return (
    <FormField
      control={control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabel>名前</FormLabel>
          <FormControl>
            <Input placeholder="" {...field} />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
