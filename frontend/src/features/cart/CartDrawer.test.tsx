import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { CartDrawer } from './CartDrawer';
import { inStockProduct } from '../../test/fixtures';
import { renderWithProviders } from '../../test/test-utils';
import { useCart } from '../../context/CartContext';

function SeedCart() {
  const { addToCart } = useCart();

  return (
    <button type="button" onClick={() => addToCart(inStockProduct)}>
      Seed cart
    </button>
  );
}

describe('CartDrawer', () => {
  it('shows an empty state when the cart has no items', () => {
    renderWithProviders(<CartDrawer isOpen onClose={vi.fn()} />);

    expect(screen.getByText('Your bag is empty')).toBeInTheDocument();
  });

  it('renders line items and subtotal when the cart has products', async () => {
    const user = userEvent.setup();

    renderWithProviders(
      <>
        <SeedCart />
        <CartDrawer isOpen onClose={vi.fn()} />
      </>
    );

    await user.click(screen.getByRole('button', { name: 'Seed cart' }));

    expect(screen.getByRole('heading', { name: inStockProduct.name })).toBeInTheDocument();
    expect(screen.getByText('Subtotal')).toBeInTheDocument();
    expect(screen.getAllByText('$120.00').length).toBeGreaterThan(0);
    expect(screen.getByRole('button', { name: 'Checkout' })).toBeInTheDocument();
  });

  it('calls onClose when the backdrop is clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    const { container } = renderWithProviders(<CartDrawer isOpen onClose={onClose} />);

    const backdrop = container.querySelector('.bg-slate-950\\/40');
    expect(backdrop).not.toBeNull();

    await user.click(backdrop!);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('updates quantity from cart controls', async () => {
    const user = userEvent.setup();

    renderWithProviders(
      <>
        <SeedCart />
        <CartDrawer isOpen onClose={vi.fn()} />
      </>
    );

    await user.click(screen.getByRole('button', { name: 'Seed cart' }));
    await user.click(screen.getByRole('button', { name: 'Increase quantity' }));

    expect(screen.getByText('Subtotal').nextElementSibling).toHaveTextContent('$240.00');
  });
});
