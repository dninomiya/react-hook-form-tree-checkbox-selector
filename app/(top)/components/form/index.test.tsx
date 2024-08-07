import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import ExampleForm from './';

describe('ExampleForm', () => {
  beforeEach(() => {
    render(<ExampleForm />);
  });

  afterEach(() => cleanup());

  test('名前の入力が反映されること', () => {
    const input = screen.getByRole<HTMLInputElement>('textbox', {
      name: '名前',
    });
    fireEvent.change(input, { target: { value: 'test' } });
    expect(input.value).toBe('test');
  });
});
