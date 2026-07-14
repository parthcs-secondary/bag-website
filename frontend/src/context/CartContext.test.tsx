import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useCart } from '../context/CartContext';
import { inStockProduct, mockProducts, outOfStockProduct } from '../test/fixtures';
import { renderWithProviders } from '../test/test-utils';

function CartHarness() {
  const { cart, cartCount, cartTotal, addToCart, removeFromCart, updateQuantity, clearCart } = useCart();

  return (
    <div>
      <span data-testid="cart-count">{cartCount}</span>
      <span data-testid="cart-total">{cartTotal.toFixed(2)}</span>
      <span data-testid="cart-items">{cart.map((item) => `${item.id}:${item.quantity}`).join(',')}</span>
      <button type="button" onClick={() => addToCart(inStockProduct)}>
        Add in-stock
      </button>
      <button type="button" onClick={() => addToCart(outOfStockProduct)}>
        Add out-of-stock
      </button>
      <button type="button" onClick={() => updateQuantity(inStockProduct.id, 3)}>
        Set quantity to 3
      </button>
      <button type="button" onClick={() => updateQuantity(inStockProduct.id, 0)}>
        Set quantity to 0
      </button>
      <button type="button" onClick={() => removeFromCart(inStockProduct.id)}>
        Remove item
      </button>
      <button type="button" onClick={clearCart}>
        Clear cart
      </button>
    </div>
  );
}

describe('CartContext', () => {
  it('starts with an empty cart', () => {
    renderWithProviders(<CartHarness />);

    expect(screen.getByTestId('cart-count')).toHaveTextContent('0');
    expect(screen.getByTestId('cart-total')).toHaveTextContent('0.00');
    expect(screen.getByTestId('cart-items')).toHaveTextContent('');
  });

  it('adds a product and increments quantity for duplicates', async () => {
    const user = userEvent.setup();
    renderWithProviders(<CartHarness />);

    await user.click(screen.getByRole('button', { name: 'Add in-stock' }));
    await user.click(screen.getByRole('button', { name: 'Add in-stock' }));

    expect(screen.getByTestId('cart-count')).toHaveTextContent('2');
    expect(screen.getByTestId('cart-total')).toHaveTextContent('240.00');
    expect(screen.getByTestId('cart-items')).toHaveTextContent('1:2');
  });

  it('updates quantity and removes items when quantity is zero', async () => {
    const user = userEvent.setup();
    renderWithProviders(<CartHarness />);

    await user.click(screen.getByRole('button', { name: 'Add in-stock' }));
    await user.click(screen.getByRole('button', { name: 'Set quantity to 3' }));

    expect(screen.getByTestId('cart-count')).toHaveTextContent('3');
    expect(screen.getByTestId('cart-total')).toHaveTextContent('360.00');

    await user.click(screen.getByRole('button', { name: 'Set quantity to 0' }));

    expect(screen.getByTestId('cart-count')).toHaveTextContent('0');
    expect(screen.getByTestId('cart-items')).toHaveTextContent('');
  });

  it('removes items and clears the cart', async () => {
    const user = userEvent.setup();
    renderWithProviders(<CartHarness />);

    await user.click(screen.getByRole('button', { name: 'Add in-stock' }));
    await user.click(screen.getByRole('button', { name: 'Remove item' }));
    expect(screen.getByTestId('cart-count')).toHaveTextContent('0');

    await user.click(screen.getByRole('button', { name: 'Add in-stock' }));
    await user.click(screen.getByRole('button', { name: 'Clear cart' }));
    expect(screen.getByTestId('cart-count')).toHaveTextContent('0');
  });

  it('persists cart state to localStorage', async () => {
    const user = userEvent.setup();
    renderWithProviders(<CartHarness />);

    await user.click(screen.getByRole('button', { name: 'Add in-stock' }));

    expect(localStorage.getItem('local_bag_cart')).toContain(inStockProduct.id);
  });

  it('restores cart state from localStorage on mount', () => {
    localStorage.setItem(
      'local_bag_cart',
      JSON.stringify([{ ...mockProducts[0], quantity: 2 }])
    );

    renderWithProviders(<CartHarness />);

    expect(screen.getByTestId('cart-count')).toHaveTextContent('2');
    expect(screen.getByTestId('cart-total')).toHaveTextContent('240.00');
  });

  it('allows adding out-of-stock products through context (current behavior)', async () => {
    const user = userEvent.setup();
    renderWithProviders(<CartHarness />);

    await user.click(screen.getByRole('button', { name: 'Add out-of-stock' }));

    expect(screen.getByTestId('cart-count')).toHaveTextContent('1');
    expect(screen.getByTestId('cart-items')).toHaveTextContent('3:1');
  });

  it('throws when useCart is used outside CartProvider', () => {
    const BrokenComponent = () => {
      useCart();
      return null;
    };

    expect(() => render(<BrokenComponent />)).toThrow('useCart must be used within a CartProvider');
  });
});
