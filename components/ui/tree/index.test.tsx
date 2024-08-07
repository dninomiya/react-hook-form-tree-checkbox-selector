import { expect, test, describe, beforeEach, afterEach } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import Tree from '.';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';

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

const MockForm = ({ children }: { children: React.ReactNode }) => {
  const form = useForm({
    defaultValues: {
      items: [],
    },
  });
  return <Form {...form}>{children}</Form>;
};

describe('Tree', () => {
  beforeEach(() => {
    render(<Tree tree={MOCK_TREE} name="items" />, {
      wrapper: MockForm,
    });
  });

  afterEach(() => cleanup());

  test('アイテムの選択が反映されること', () => {
    const checkbox = screen.getByRole('checkbox', { name: 'アイテム A' });
    fireEvent.click(checkbox);
    expect(checkbox.ariaChecked).toBe('true');
  });

  test('全選択が機能すること', () => {
    const checkbox = screen.getByRole('checkbox', { name: 'すべて' });
    fireEvent.click(checkbox);
    expect(checkbox.ariaChecked).toBe('true');

    const allCheckbox = screen.getAllByRole('checkbox');
    allCheckbox.forEach((checkbox) => {
      expect(checkbox.ariaChecked).toBe('true');
    });
  });

  test('一部選択の結果が正しく反映されること', () => {
    const checkbox = screen.getByRole('checkbox', { name: 'アイテム A' });
    fireEvent.click(checkbox);
    expect(checkbox.ariaChecked).toBe('true');

    const allCheckbox = screen.getByRole('checkbox', { name: 'すべて' });
    expect(allCheckbox.ariaChecked).toBe('mixed');
  });
});
