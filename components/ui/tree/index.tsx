import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { createContext, useContext, useMemo } from 'react';
import {
  Control,
  FieldPath,
  FieldValues,
  useController,
} from 'react-hook-form';

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName;
  control: Control<TFieldValues>;
  defaultOpen?: boolean;
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
  const { name, defaultOpen, control } = useContext(TreeContext);
  const { field } = useController({
    control,
    name,
  });
  const hasItems = Boolean(items?.length);

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
      <Collapsible defaultOpen={defaultOpen}>
        <div className="flex items-center">
          {hasItems ? (
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label={`${label}を開閉`}
                className="size-8 group *:hidden"
              >
                <ChevronDown className="size-4 group-data-[state=closed]:block" />
                <ChevronUp className="size-4 group-data-[state=open]:block" />
                <span className="sr-only group-data-[state=open]:block">
                  閉じる
                </span>
                <span className="sr-only group-data-[state=closed]:block">
                  開く
                </span>
              </Button>
            </CollapsibleTrigger>
          ) : (
            <div className="size-8" />
          )}
          <FormField
            control={control}
            name={name}
            render={() => (
              <FormItem className="flex flex-1 relative flex-row items-start space-x-3 space-y-0 rounded-md p-2">
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
        </div>
        {hasItems && (
          <CollapsibleContent className="pl-6">
            {items?.map((item, index) => (
              <TreeItem key={index} {...item} />
            ))}
          </CollapsibleContent>
        )}
      </Collapsible>
    </div>
  );
}

export default function Tree<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  tree,
  name,
  control,
  defaultOpen,
}: {
  tree: TreeItemProps[];
  name: TName;
  control: Control<TFieldValues>;
  defaultOpen?: boolean;
}) {
  return (
    <TreeContext.Provider
      value={{
        name,
        control: control as Control<FieldValues>,
        defaultOpen,
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
