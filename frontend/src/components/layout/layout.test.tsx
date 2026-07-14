import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { Header } from './Header';
import { CategoryGrid } from './CategoryGrid';
import { renderWithProviders, renderWithRouter } from '../../test/test-utils';

describe('CategoryGrid', () => {
  it('renders the collection heading and category cards', () => {
    renderWithRouter(<CategoryGrid />);

    expect(screen.getByRole('heading', { name: 'Shop by Collection' })).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: 'Daily Totes' }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole('link', { name: 'Weekender Duffels' }).length).toBeGreaterThan(0);
  });

  it('links category cards to category routes', () => {
    renderWithRouter(<CategoryGrid />);

    const toteLinks = screen.getAllByRole('link', { name: 'Daily Totes' });
    toteLinks.forEach((link) => {
      expect(link).toHaveAttribute('href', '/categories/tote');
    });
  });
});

describe('Header', () => {
  it('renders primary navigation links', () => {
    renderWithProviders(<Header onOpenCart={vi.fn()} />);

    expect(screen.getByRole('link', { name: /FYBERCOMPANY/i })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'Categories' })).toHaveAttribute('href', '/categories');
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('href', '/about');
    expect(screen.getByRole('link', { name: 'Contact Us' })).toHaveAttribute('href', '/contact');
  });

  it('opens the cart when the bag icon is clicked', async () => {
    const user = userEvent.setup();
    const onOpenCart = vi.fn();

    renderWithProviders(<Header onOpenCart={onOpenCart} />);

    const cartButton = screen
      .getAllByRole('button')
      .find(
        (button) =>
          button.querySelector('.lucide-shopping-bag') &&
          button.getAttribute('aria-label') !== 'Toggle mobile menu'
      );
    expect(cartButton).toBeDefined();

    await user.click(cartButton!);

    expect(onOpenCart).toHaveBeenCalledTimes(1);
  });
});
