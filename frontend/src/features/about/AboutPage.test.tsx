import { render, screen } from '@testing-library/react';
import { AboutPage } from './AboutPage';

describe('AboutPage', () => {
  it('renders the brand story sections', () => {
    render(<AboutPage />);

    expect(screen.getByRole('heading', { name: 'CRAFTING THE JOURNEY.' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Our History' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Our Vision' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Our Mission' })).toBeInTheDocument();
  });
});
