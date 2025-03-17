import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import PayorCalculations from './PayorCalculations';

describe('PayorCalculations Component', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({
          address: '123 Main St',
          claim_data: {
            incident_date: '2025-01-01',
            damage_cause: 'Fire',
            bank_account: '123456789',
          },
          claim_documents: {
            local_authority_report: 'base64encodedimage',
            photographs: 'base64encodedimage',
          },
          property_data: {
            date_of_construction: '2020-01-01',
            type_home: 'Single Family',
            roof_type: 'Shingle',
          }
        }),
      })
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('renders PayorCalculations component with fetched data', async () => {
    render(
      <BrowserRouter>
        <PayorCalculations />
      </BrowserRouter>
    );

    await waitFor(() => expect(screen.getByText('Claimant name')).toBeInTheDocument());

    // Log the rendered output for debugging
    screen.debug();

    // Check representative inputs from addressData
    expect(screen.getByText(/123 Main St/i)).toBeInTheDocument();

    // Check representative inputs from claimData
    expect(screen.getByText(/2025-01-01/i)).toBeInTheDocument();
    expect(screen.getByText(/Fire/i)).toBeInTheDocument();

    // Check representative inputs from claimDocuments
    expect(screen.getByAltText('Local Authority Report')).toBeInTheDocument();
    expect(screen.getByAltText('Photographs')).toBeInTheDocument();

    // Check representative inputs from propertyData
    expect(screen.getByText(/2020-01-01/i)).toBeInTheDocument();
    expect(screen.getByText(/Single Family/i)).toBeInTheDocument();
    expect(screen.getByText(/Shingle/i)).toBeInTheDocument();
  });
});