import { TreeItemProps } from '@/components/ui/tree';
import { z } from 'zod';

export const schema = z.object({
  name: z.string().trim().min(1),
  categories: z.array(z.string()),
});

export type FormData = z.infer<typeof schema>;

export const CATEGORIES: TreeItemProps[] = [
  {
    label: 'すべて',
    items: [
      {
        label: 'グループ 1',
        items: [
          {
            id: '1.1',
            label: 'アイテム 1.1',
            items: [],
          },
          {
            id: '1.2',
            label: 'アイテム 1.2',
            items: [],
          },
        ],
      },
      {
        label: 'グループ 2',
        items: [
          {
            id: '2.1',
            label: 'アイテム 2.1',
            items: [],
          },
          {
            id: '2.2',
            label: 'アイテム 2.2',
            items: [],
          },
        ],
      },
    ],
  },
];
