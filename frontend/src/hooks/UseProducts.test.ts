import { act, renderHook } from '@testing-library/react';
import { useProducts } from './UseProducts';
import { mockProducts } from '../test/fixtures';

describe('useProducts', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('starts in a loading state', () => {
    const { result } = renderHook(() => useProducts());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.products).toEqual([]);
  });

  it('loads the mock catalog after the simulated delay', async () => {
    const { result } = renderHook(() => useProducts());

    await act(async () => {
      await vi.advanceTimersByTimeAsync(500);
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.products).toHaveLength(3);
    expect(result.current.products.map((product) => product.slug)).toEqual(
      mockProducts.map((product) => product.slug)
    );
  });

  it('exposes at least one in-stock and one out-of-stock product', async () => {
    const { result } = renderHook(() => useProducts());

    await act(async () => {
      await vi.advanceTimersByTimeAsync(500);
    });

    const inStockCount = result.current.products.filter((product) => product.inStock).length;
    const outOfStockCount = result.current.products.filter((product) => !product.inStock).length;

    expect(inStockCount).toBeGreaterThan(0);
    expect(outOfStockCount).toBeGreaterThan(0);
  });
});
