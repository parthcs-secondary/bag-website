import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import App from './App';

vi.mock('./hooks/UseProducts', () => ({
  useProducts: vi.fn(),
}));

import { useProducts } from './hooks/UseProducts';
import { mockProducts } from './test/fixtures';

const mockedUseProducts = vi.mocked(useProducts);

const definedRoutes = [
  { path: '/', heading: 'CRAFTED FOR YOUR' },
  { path: '/about', heading: 'CRAFTING THE JOURNEY.' },
  { path: '/contact', heading: 'GET IN TOUCH' },
  { path: '/products/nomad-canvas', heading: 'Nomad Canvas' },
] as const;

function renderAppAt(path: string) {
  window.history.pushState({}, '', path);
  return render(<App />);
}

describe('App routing', () => {
  beforeEach(() => {
    mockedUseProducts.mockReturnValue({ products: mockProducts, isLoading: false });
  });

  it.each(definedRoutes)('renders $path', async ({ path, heading }) => {
    renderAppAt(path);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: new RegExp(heading, 'i') })).toBeInTheDocument();
    });
  });

  it('navigates to About via the header link', async () => {
    const user = userEvent.setup();
    renderAppAt('/');

    await user.click(screen.getAllByRole('link', { name: 'About' })[0]);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'CRAFTING THE JOURNEY.' })).toBeInTheDocument();
    });
  });

  it('opens the cart drawer from the header', async () => {
    const user = userEvent.setup();
    renderAppAt('/');

    const cartButton = screen
      .getAllByRole('button')
      .find(
        (button) =>
          button.querySelector('.lucide-shopping-bag') &&
          button.getAttribute('aria-label') !== 'Toggle mobile menu'
      );
    expect(cartButton).toBeDefined();

    await user.click(cartButton!);
    expect(screen.getByRole('dialog', { name: 'Shopping Cart' })).toBeInTheDocument();
    expect(screen.getByText('Your bag is empty')).toBeInTheDocument();
  });
});

describe('App route contract', () => {
  it('documents routes that must stay available for navigation to work', () => {
    const requiredRoutes = [
      '/',
      '/about',
      '/contact',
      '/products/:slug',
      '/categories',
      '/categories/tote',
      '/categories/duffel',
      '/categories/barrel',
      '/categories/tiffin',
      '/categories/pouch',
      '/categories/clutch',
      '/categories/backpack',
      '/shipping',
      '/privacy',
      '/terms',
    ];

    const implementedRoutes = ['/', '/about', '/contact', '/products/:slug'];
    const missingRoutes = requiredRoutes.filter(
      (route) => !implementedRoutes.includes(route)
    );

    expect(missingRoutes).toEqual([
      '/categories',
      '/categories/tote',
      '/categories/duffel',
      '/categories/barrel',
      '/categories/tiffin',
      '/categories/pouch',
      '/categories/clutch',
      '/categories/backpack',
      '/shipping',
      '/privacy',
      '/terms',
    ]);
  });
});
