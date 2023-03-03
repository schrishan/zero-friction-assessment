import { render, screen, fireEvent } from '@testing-library/react';
import OrganizationDetailsCard from '../pages/organisation-cfg/config-body/cards/OrganizationDetailsCard';

describe('OrganizationDetailsCard', () => {
  it('renders all elements properly', () => {
    render(<OrganizationDetailsCard />);

    expect(screen.getByText('Organization Details')).toBeInTheDocument();
    expect(screen.getByLabelText('Code')).toBeInTheDocument();
    expect(screen.getByLabelText('Description')).toBeInTheDocument();
    expect(screen.getByLabelText('Bank account')).toBeInTheDocument();
    expect(screen.getByLabelText('Vat account number')).toBeInTheDocument();
    expect(screen.getByLabelText('Company account number')).toBeInTheDocument();
    expect(screen.getByText('Migration mode')).toBeInTheDocument();
  });

  it('requires all fields to be filled out', async () => {
    render(<OrganizationDetailsCard />);

    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);

    expect(
      await screen.findByText('Code is required')
    ).toBeInTheDocument();
    expect(
      await screen.findByText('Description is required')
    ).toBeInTheDocument();
    expect(
      await screen.findByText('Bank account is required')
    ).toBeInTheDocument();
    expect(
      await screen.findByText('Vat account number is required')
    ).toBeInTheDocument();
    expect(
      await screen.findByText('Company account number is required')
    ).toBeInTheDocument();
  });

  it('validates input values', async () => {
    render(<OrganizationDetailsCard />);

    const codeInput = screen.getByLabelText('Code');
    const descriptionInput = screen.getByLabelText('Description');
    const bankAccountInput = screen.getByLabelText('Bank account');
    const vatAccountNumberInput = screen.getByLabelText('Vat account number');
    const companyAccountNumberInput = screen.getByLabelText(
      'Company account number'
    );

    fireEvent.change(codeInput, { target: { value: '123' } });
    fireEvent.change(descriptionInput, { target: { value: 'Some description' } });
    fireEvent.change(bankAccountInput, { target: { value: 'ABC123' } });
    fireEvent.change(vatAccountNumberInput, { target: { value: '123456' } });
    fireEvent.change(companyAccountNumberInput, { target: { value: '789' } });

    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);

    expect(
      await screen.findByText('Code must be at least 4 characters long')
    ).toBeInTheDocument();
    expect(
      await screen.findByText('Bank account must contain only numbers')
    ).toBeInTheDocument();
    expect(
      await screen.findByText(
        'Vat account number must contain exactly 9 digits'
      )
    ).toBeInTheDocument();
    expect(
      await screen.findByText(
        'Company account number must contain exactly 6 digits'
      )
    ).toBeInTheDocument();
  });
});
