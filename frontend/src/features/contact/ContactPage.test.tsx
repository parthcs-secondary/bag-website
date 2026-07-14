import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ContactPage } from './ContactPage';

describe('ContactPage', () => {
  it('renders the contact form fields', () => {
    render(<ContactPage />);

    expect(screen.getByRole('heading', { name: 'GET IN TOUCH' })).toBeInTheDocument();
    expect(screen.getByLabelText('Name')).toBeRequired();
    expect(screen.getByLabelText('Email')).toBeRequired();
    expect(screen.getByLabelText('Message')).toBeRequired();
  });

  it('opens a mailto link with encoded form values on submit', async () => {
    const user = userEvent.setup();
    let assignedHref = '';

    Object.defineProperty(window, 'location', {
      configurable: true,
      value: {
        ...window.location,
        set href(value: string) {
          assignedHref = value;
        },
        get href() {
          return assignedHref;
        },
      },
    });

    render(<ContactPage />);

    await user.type(screen.getByLabelText('Name'), 'Jane Doe');
    await user.type(screen.getByLabelText('Email'), 'jane@example.com');
    await user.type(screen.getByLabelText('Message'), 'Hello there');
    await user.click(screen.getByRole('button', { name: 'Send Message' }));

    expect(assignedHref).toContain('mailto:support@asbags.com');
    expect(assignedHref).toContain(encodeURIComponent('Jane Doe'));
    expect(assignedHref).toContain(encodeURIComponent('jane@example.com'));
    expect(assignedHref).toContain(encodeURIComponent('Hello there'));
  });
});
