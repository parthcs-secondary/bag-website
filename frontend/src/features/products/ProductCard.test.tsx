import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { ProductCard } from './ProductCard';
import { inStockProduct, outOfStockProduct } from '../../test/fixtures';
import { renderWithRouter } from '../../test/test-utils';

describe('ProductCard', () => {
  it('renders product name, price, and category', () => {
    renderWithRouter(<ProductCard product={inStockProduct} onAddToCart={vi.fn()} />);

    expect(screen.getByRole('heading', { name: inStockProduct.name })).toBeInTheDocument();
    expect(screen.getByText('$120.00')).toBeInTheDocument();
    expect(screen.getByText(inStockProduct.category)).toBeInTheDocument();
  });

  it('links to the product detail page', () => {
    renderWithRouter(<ProductCard product={inStockProduct} onAddToCart={vi.fn()} />);

    expect(screen.getByRole('link', { name: inStockProduct.name })).toHaveAttribute(
      'href',
      `/products/${inStockProduct.slug}`
    );
  });

  it('calls onAddToCart when the bag button is clicked', async () => {
    const user = userEvent.setup();
    const onAddToCart = vi.fn();

    renderWithRouter(<ProductCard product={inStockProduct} onAddToCart={onAddToCart} />);

    await user.click(screen.getByRole('button', { name: `Add ${inStockProduct.name} to cart` }));

    expect(onAddToCart).toHaveBeenCalledWith(inStockProduct);
  });

  it('disables add-to-cart for out-of-stock products', () => {
    renderWithRouter(<ProductCard product={outOfStockProduct} onAddToCart={vi.fn()} />);

    expect(
      screen.getByRole('button', { name: `Add ${outOfStockProduct.name} to cart` })
    ).toBeDisabled();
    expect(screen.getByText('Sold Out')).toBeInTheDocument();
  });
});
