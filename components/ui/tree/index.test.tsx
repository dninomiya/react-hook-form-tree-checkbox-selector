import { Form } from '@/components/ui/form';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import { afterEach, describe, expect, test } from 'vitest';
import Tree from '.';

const MOCK_TREE = [
  {
    label: 'すべて',
    items: [
      {
        label: 'グループ',
        items: [
          {
            id: 'a',
            label: 'アイテム A',
          },
          {
            id: 'b',
            label: 'アイテム B',
          },
        ],
      },
    ],
  },
];

const MockForm = ({ defaultOpen }: { defaultOpen?: boolean }) => {
  const form = useForm({
    defaultValues: {
      items: [],
    },
  });
  return (
    <Form {...form}>
      <Tree
        defaultOpen={defaultOpen}
        tree={MOCK_TREE}
        control={form.control}
        name="items"
      />
    </Form>
  );
};

describe('Tree', () => {
  afterEach(() => cleanup());

  test('デフォルトで開くオプションが有効であること', () => {
    render(<MockForm defaultOpen />);
    const checkbox = screen.getByRole('checkbox', { name: 'アイテム A' });
    expect(checkbox).toBeVisible();
  });

  test('デフォルトで閉じていること', () => {
    render(<MockForm defaultOpen={false} />);
    const checkbox = screen.queryByRole('checkbox', { name: 'アイテム A' });
    expect(checkbox).toBeNull();
  });

  test('アイテムの選択が反映されること', async () => {
    render(<MockForm defaultOpen />);
    const checkbox = screen.getByRole('checkbox', { name: 'アイテム A' });
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  test('全選択が機能すること', () => {
    render(<MockForm defaultOpen />);
    const checkbox = screen.getByRole('checkbox', { name: 'すべて' });
    fireEvent.click(checkbox);
    expect(checkbox.ariaChecked).toBe('true');

    const allCheckbox = screen.getAllByRole('checkbox');
    allCheckbox.forEach((checkbox) => {
      expect(checkbox).toBeChecked();
    });
  });

  test('一部選択の結果が正しく反映されること', () => {
    render(<MockForm defaultOpen />);
    const checkbox = screen.getByRole('checkbox', { name: 'アイテム A' });
    fireEvent.click(checkbox);
    expect(checkbox.ariaChecked).toBe('true');

    const allCheckbox = screen.getByRole('checkbox', { name: 'すべて' });
    expect(allCheckbox).toBePartiallyChecked();
  });

  test('グループを開閉できること', () => {
    render(<MockForm />);
    fireEvent.click(screen.getByRole('button', { name: 'すべてを開閉' }));
    const group = screen.getByRole('button', { name: 'グループを開閉' });
    fireEvent.click(group);
    const item = screen.getByRole('checkbox', { name: 'アイテム A' });
    expect(item).toBeVisible();
    fireEvent.click(group);
    expect(item).not.toBeVisible();
  });
});
