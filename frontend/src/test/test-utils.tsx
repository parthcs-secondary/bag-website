import { MemoryRouter } from 'react-router-dom';
import type { ReactElement } from 'react';
import { render } from '@testing-library/react';
import { CartProvider } from '../context/CartContext';

interface RenderOptions {
  route?: string;
}

export function renderWithProviders(ui: ReactElement, { route = '/' }: RenderOptions = {}) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <CartProvider>{ui}</CartProvider>
    </MemoryRouter>
  );
}

export function renderWithRouter(ui: ReactElement, { route = '/' }: RenderOptions = {}) {
  return render(<MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>);
}
