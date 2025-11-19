/**
 * Skenario pengujian LoadingSpinner component:
 * 
 * - LoadingSpinner component
 *   - should render loading spinner correctly
 *   - should display loading text
 *   - should have proper styling for spinner animation
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import LoadingSpinner from '../../components/LoadingSpinner';

describe('LoadingSpinner component', () => {
  it('should render loading spinner correctly', () => {
    // Act
    render(<LoadingSpinner />);

    // Assert
    const loadingText = screen.getByText('Loading...');
    expect(loadingText).toBeInTheDocument();
  });

  it('should display loading text', () => {
    // Act
    render(<LoadingSpinner />);

    // Assert
    const loadingText = screen.getByText(/loading/i);
    expect(loadingText).toBeInTheDocument();
  });

  it('should have proper styling for spinner animation', () => {
    // Act
    const { container } = render(<LoadingSpinner />);

    // Assert
    const spinnerDiv = container.querySelector('div > div');
    expect(spinnerDiv).toHaveStyle({
      border: '4px solid #f3f3f3',
      borderTop: '4px solid #3498db',
      borderRadius: '50%',
      width: '40px',
      height: '40px',
      animation: 'spin 2s linear infinite',
    });
  });
});