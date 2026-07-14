import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { vi } from 'vitest';
import { CartProvider } from '../../context/CartContext';
import { ProductDetail } from './ProductDetail';
import { mockProducts } from '../../test/fixtures';

vi.mock('../../hooks/UseProducts', () => ({
  useProducts: vi.fn(),
}));

import { useProducts } from '../../hooks/UseProducts';

const mockedUseProducts = vi.mocked(useProducts);

function renderProductDetail(slug: string) {
  return render(
    <MemoryRouter initialEntries={[`/products/${slug}`]}>
      <CartProvider>
        <Routes>
          <Route path="/products/:slug" element={<ProductDetail />} />
        </Routes>
      </CartProvider>
    </MemoryRouter>
  );
}

describe('ProductDetail', () => {
  beforeEach(() => {
    mockedUseProducts.mockReturnValue({ products: mockProducts, isLoading: false });
  });

  it('shows a loading state while products are loading', () => {
    mockedUseProducts.mockReturnValue({ products: [], isLoading: true });

    renderProductDetail('nomad-canvas');

    expect(screen.getByText('Loading product...')).toBeInTheDocument();
  });

  it('renders product details for a valid slug', () => {
    renderProductDetail('nomad-canvas');

    expect(screen.getByRole('heading', { name: 'Nomad Canvas' })).toBeInTheDocument();
    expect(screen.getByText('$120.00')).toBeInTheDocument();
    expect(screen.getByText('Durable daily carry.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add to bag/i })).toBeEnabled();
  });

  it('disables add-to-bag for out-of-stock products', () => {
    renderProductDetail('urban-nylon');

    expect(screen.getByRole('button', { name: /out of stock/i })).toBeDisabled();
  });

  it('shows not-found UI for unknown slugs', () => {
    renderProductDetail('missing-product');

    expect(screen.getByRole('heading', { name: 'Product Not Found' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Return to Catalog' })).toHaveAttribute('href', '/');
  });

  it('adds the product to the cart when in stock', async () => {
    const user = userEvent.setup();
    renderProductDetail('nomad-canvas');

    await user.click(screen.getByRole('button', { name: /add to bag/i }));

    await waitFor(() => {
      expect(localStorage.getItem('local_bag_cart')).toContain('nomad-canvas');
    });
  });
});
