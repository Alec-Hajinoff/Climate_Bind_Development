import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ClaimCalculations from '../ClaimCalculations';
import { fetchClaimCalculations } from '../ApiService';

jest.mock('../ApiService');

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('ClaimCalculations Component', () => {
  const mockData = [
    {
      premium_amount: '100',
      payout_amount: '1000',
    },
    {
      premium_amount: '200',
      payout_amount: '2000',
    }
  ];

  beforeEach(() => {
    fetchClaimCalculations.mockResolvedValue(mockData);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders component with table headers', () => {
    renderWithRouter(<ClaimCalculations />);
    
    expect(screen.getByText('Your monthly premium amount is USDC:')).toBeInTheDocument();
    expect(screen.getByText('Automatic payout to you is USDC:')).toBeInTheDocument();
    expect(screen.getByText('When the following parameters are met:')).toBeInTheDocument();
    expect(screen.getByText('The most recent parameter reading is:')).toBeInTheDocument();
    expect(screen.getByText('The amount paid out to you is USDC:')).toBeInTheDocument();
  });

  test('displays fetched data correctly', async () => {
    renderWithRouter(<ClaimCalculations />);
    
    await waitFor(() => {
      expect(fetchClaimCalculations).toHaveBeenCalledTimes(1);
      
      expect(screen.getByText('100')).toBeInTheDocument();
      expect(screen.getByText('1000')).toBeInTheDocument();
      expect(screen.getByText('200')).toBeInTheDocument();
      expect(screen.getByText('2000')).toBeInTheDocument();
    });
  });

  test('handles API error gracefully', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    fetchClaimCalculations.mockRejectedValue(new Error('API Error'));

    renderWithRouter(<ClaimCalculations />);
    
    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Error fetching table data:',
        expect.any(Error)
      );
    });

    consoleErrorSpy.mockRestore();
  });

  test('renders LogoutComponent', () => {
    renderWithRouter(<ClaimCalculations />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});