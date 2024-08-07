import { Checkbox } from '@/components/ui/checkbox';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { createContext, useContext, useMemo } from 'react';
import {
  FieldPath,
  FieldValues,
  useController,
  useFormContext,
} from 'react-hook-form';

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName;
};

const TreeContext = createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
);

export type TreeItemProps = {
  label: string;
  id?: string;
  items?: TreeItemProps[];
};

function TreeItem({ label, id, items }: TreeItemProps) {
  const { name } = useContext(TreeContext);
  const { control } = useFormContext();
  const { field } = useController({
    control,
    name,
  });

  const handleCheck = (checked: boolean) => {
    if (items?.length) {
      const childIds = getNodeIds(items);
      if (checked) {
        field.onChange([...field.value, ...childIds]);
      } else {
        field.onChange(
          field.value?.filter((value: string) => ![...childIds].includes(value))
        );
      }
    } else {
      if (checked) {
        field.onChange([...field.value, id]);
      } else {
        field.onChange(field.value?.filter((value: string) => value != id));
      }
    }
  };

  const checked = useMemo(() => {
    if (field.value?.includes(id)) {
      return true;
    }

    if (items?.length) {
      const childIds = getNodeIds(items);
      if (childIds.every((id) => field.value?.includes(id))) {
        return true;
      }

      if (childIds.some((id) => field.value?.includes(id))) {
        return 'indeterminate';
      }
    }

    return false;
  }, [field.value, items, id]);

  return (
    <div>
      <FormField
        control={control}
        name={name}
        render={() => (
          <FormItem className="flex relative flex-row items-start space-x-3 space-y-0 rounded-md p-2 hover:bg-accent">
            <FormControl>
              <Checkbox checked={checked} onCheckedChange={handleCheck} />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>
                {label}
                <span className="absolute inset-0"></span>
              </FormLabel>
            </div>
          </FormItem>
        )}
      />
      <div className="pl-6">
        {items?.map((item, index) => (
          <TreeItem key={index} {...item} />
        ))}
      </div>
    </div>
  );
}

export default function Tree<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({ tree, name }: { tree: TreeItemProps[]; name: TName }) {
  return (
    <TreeContext.Provider
      value={{
        name,
      }}
    >
      {tree.map((item, index) => (
        <TreeItem
          key={index}
          id={item.id}
          label={item.label}
          items={item.items}
        />
      ))}
    </TreeContext.Provider>
  );
}

function getNodeIds(items: TreeItemProps[]): string[] {
  const childIds = items.flatMap((item) => {
    if (item.items?.length) {
      return getNodeIds(item.items);
    }

    return item.id;
  });

  return childIds.filter((id): id is string => Boolean(id));
}
