import { CATEGORIES } from '@/app/(top)/schema';
import { FormLabel } from '@/components/ui/form';
import Tree from '@/components/ui/tree';

export default function CategoryField() {
  return (
    <div>
      <FormLabel>カテゴリ</FormLabel>
      <Tree tree={CATEGORIES} name="categories" />
    </div>
  );
}
