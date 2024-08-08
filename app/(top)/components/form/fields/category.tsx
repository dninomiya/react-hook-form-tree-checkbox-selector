import { FormData } from '@/app/(top)/schema';
import { generateRandomTree } from '@/app/(top)/util';
import { FormLabel } from '@/components/ui/form';
import Tree from '@/components/ui/tree';
import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

export default function CategoryField() {
  const tree = useMemo(() => generateRandomTree(100), []);
  const { control } = useFormContext<FormData>();

  return (
    <div>
      <FormLabel>カテゴリ</FormLabel>
      <Tree tree={tree} name="categories" control={control} defaultOpen />
    </div>
  );
}
