import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import ExampleForm from './';

describe('ExampleForm', () => {
  beforeEach(() => {
    render(<ExampleForm />);
  });

  afterEach(() => cleanup());

  test('名前の入力が反映されること', () => {
    const input = screen.getByRole('textbox', {
      name: '名前',
    });
    fireEvent.change(input, { target: { value: 'test' } });
    expect(input).toHaveValue('test');
  });

  describe('送信ボタン', () => {
    test('不正な値の時無効になる', () => {
      const button = screen.getByRole('button', {
        name: '送信',
      });
      expect(button).toBeDisabled();
    });

    test('正常な値の時有効になる', async () => {
      const input = screen.getByRole('textbox', {
        name: '名前',
      });

      await act(async () => {
        fireEvent.change(input, { target: { value: 'test' } });
      });

      const button = screen.getByRole('button', {
        name: '送信',
      });
      expect(button).toBeEnabled();
    });
  });
});
