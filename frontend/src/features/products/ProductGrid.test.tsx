import { screen } from '@testing-library/react';
import { vi } from 'vitest';
import { ProductGrid } from './ProductGrid';
import { mockProducts } from '../../test/fixtures';
import { renderWithProviders } from '../../test/test-utils';

vi.mock('../../hooks/UseProducts', () => ({
  useProducts: vi.fn(),
}));

import { useProducts } from '../../hooks/UseProducts';

const mockedUseProducts = vi.mocked(useProducts);

describe('ProductGrid', () => {
  it('shows a loading state while products are loading', () => {
    mockedUseProducts.mockReturnValue({ products: [], isLoading: true });

    renderWithProviders(<ProductGrid />);

    expect(screen.getByText('Loading catalog...')).toBeInTheDocument();
  });

  it('renders all products once loading completes', () => {
    mockedUseProducts.mockReturnValue({ products: mockProducts, isLoading: false });

    renderWithProviders(<ProductGrid />);

    mockProducts.forEach((product) => {
      expect(screen.getByRole('heading', { name: product.name })).toBeInTheDocument();
    });
  });
});
