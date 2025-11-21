import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from '../../components/Button';

describe('Button Component', () => {
  it('renders with default props', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('btn-primary');
    expect(button).not.toBeDisabled();
  });

  test.each([
    ['primary', 'btn-primary'],
    ['secondary', 'btn-secondary'],
    ['danger', 'btn-danger'],
  ])('renders %s variant', (variant, expectedClass) => {
    render(<Button variant={variant}>Test</Button>);
    const button = screen.getByRole('button', { name: /test/i });
    expect(button).toHaveClass(expectedClass);
  });

  test.each([
    ['sm', 'btn-sm'],
    ['md', 'btn-md'],
    ['lg', 'btn-lg'],
  ])('renders %s size', (size, expectedClass) => {
    render(<Button size={size}>Size Test</Button>);
    const button = screen.getByRole('button', { name: /size test/i });
    expect(button).toHaveClass(expectedClass);
  });

  it('renders in disabled state', () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole('button', { name: /disabled/i });

    expect(button).toBeDisabled();
    expect(button).toHaveClass('btn-disabled');
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });

    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', () => {
    const handleClick = jest.fn();
    render(
      <Button onClick={handleClick} disabled>
        Click me
      </Button>
    );
    const button = screen.getByRole('button', { name: /click me/i });

    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('passes additional props to the button element', () => {
    render(
      <Button data-testid="custom-button" aria-label="Custom Button">
        Custom
      </Button>
    );
    const button = screen.getByTestId('custom-button');

    expect(button).toHaveAttribute('aria-label', 'Custom Button');
  });

  it('accepts and applies custom className', () => {
    render(<Button className="custom-class">Custom Class</Button>);
    const button = screen.getByRole('button', { name: /custom class/i });

    expect(button).toHaveClass('custom-class');
    expect(button).toHaveClass('btn-primary');
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<Button>Snapshot</Button>);
    expect(asFragment()).toMatchSnapshot();
  });
});
