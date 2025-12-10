import { describe, it, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert';
import { renderHook, act } from '@testing-library/react';
import { useTheme } from './use-theme';

describe('useTheme', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
  });

  afterEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
  });

  it('initializes with system theme preference', () => {
    const { result } = renderHook(() => useTheme());

    assert.ok(result.current.theme === 'light' || result.current.theme === 'dark');
    assert.strictEqual(typeof result.current.toggleTheme, 'function');
    assert.strictEqual(typeof result.current.updateTheme, 'function');
  });

  it('toggles between light and dark mode', () => {
    const { result } = renderHook(() => useTheme());

    const initialTheme = result.current.theme;

    act(() => {
      result.current.toggleTheme();
    });

    const expectedTheme = initialTheme === 'light' ? 'dark' : 'light';
    assert.strictEqual(result.current.theme, expectedTheme);
  });

  it('updates theme via updateTheme', () => {
    const { result } = renderHook(() => useTheme());

    act(() => {
      result.current.updateTheme('dark');
    });

    assert.strictEqual(result.current.theme, 'dark');

    act(() => {
      result.current.updateTheme('light');
    });

    assert.strictEqual(result.current.theme, 'light');
  });

  it('persists theme to localStorage', () => {
    const { result } = renderHook(() => useTheme());

    act(() => {
      result.current.updateTheme('dark');
    });

    assert.strictEqual(localStorage.getItem('theme'), 'dark');

    act(() => {
      result.current.updateTheme('light');
    });

    assert.strictEqual(localStorage.getItem('theme'), 'light');
  });

  it('applies dark class to document element', () => {
    const { result } = renderHook(() => useTheme());

    act(() => {
      result.current.updateTheme('dark');
    });

    assert.ok(document.documentElement.classList.contains('dark'));

    act(() => {
      result.current.updateTheme('light');
    });

    assert.ok(!document.documentElement.classList.contains('dark'));
  });

  it('loads theme from localStorage on mount', () => {
    localStorage.setItem('theme', 'dark');

    const { result } = renderHook(() => useTheme());

    assert.strictEqual(result.current.theme, 'dark');
    assert.ok(document.documentElement.classList.contains('dark'));
  });

  it('provides mounted state', () => {
    const { result } = renderHook(() => useTheme());

    assert.strictEqual(typeof result.current.mounted, 'boolean');
  });
});
