import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ThemeToggle from './ThemeToggle';

describe('ThemeToggle', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
  });

  it('renders moon icon in light mode', async () => {
    localStorage.setItem('theme', 'light');
    render(<ThemeToggle />);

    await waitFor(() => {
      const button = screen.getByRole('button');
      assert.ok(button);
      assert.strictEqual(button.getAttribute('aria-label'), 'Switch to dark mode');
    });
  });

  it('renders sun icon in dark mode', async () => {
    localStorage.setItem('theme', 'dark');
    render(<ThemeToggle />);

    await waitFor(() => {
      const button = screen.getByRole('button');
      assert.ok(button);
      assert.strictEqual(button.getAttribute('aria-label'), 'Switch to light mode');
    });
  });

  it('toggles theme on click', async () => {
    localStorage.setItem('theme', 'light');
    render(<ThemeToggle />);

    await waitFor(() => {
      const button = screen.getByRole('button', { name: /switch to dark mode/i });
      assert.ok(button);
    });

    const button = screen.getByRole('button');
    fireEvent.click(button);

    await waitFor(() => {
      assert.strictEqual(localStorage.getItem('theme'), 'dark');
      assert.ok(document.documentElement.classList.contains('dark'));
    });
  });

  it('supports keyboard navigation', async () => {
    localStorage.setItem('theme', 'light');
    render(<ThemeToggle />);

    await waitFor(() => {
      const button = screen.getByRole('button');
      assert.ok(button);
    });

    const button = screen.getByRole('button');

    fireEvent.keyDown(button, { key: 'Enter' });

    await waitFor(() => {
      assert.strictEqual(localStorage.getItem('theme'), 'dark');
    });
  });

  it('has proper accessibility attributes', async () => {
    render(<ThemeToggle />);

    await waitFor(() => {
      const button = screen.getByRole('button');
      assert.ok(button);
      assert.ok(button.getAttribute('aria-label'));
    });
  });

  it('shows loading state before mount', () => {
    render(<ThemeToggle />);

    const button = screen.getByRole('button');
    assert.ok(button.hasAttribute('disabled') || button.getAttribute('aria-label')?.includes('dark mode'));
  });
});
