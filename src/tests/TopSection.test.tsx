import { render, fireEvent, screen } from '@testing-library/react';
import { getByLabelText } from '@testing-library/dom';
import TopSection from '../pages/organisation-cfg/top-section/TopSection';

describe('TopSection', () => {
  it('renders without errors', () => {
    render(<TopSection />);
  });

  it('renders the cancel button only when the form is touched', () => {
    const { queryByText } = render(<TopSection />);
    expect(queryByText('Cancel')).toBeNull();

    fireEvent.change(screen.getByLabelText('Form Input'), { target: { value: 'test' } });
    expect(queryByText('Cancel')).toBeInTheDocument();
  });

  it('disables the save button when the form is not touched or not valid', () => {
    const { getByText } = render(<TopSection />);
    const saveButton = getByText('Save');

    expect(saveButton).toBeDisabled();

    fireEvent.change(screen.getByLabelText('Form Input'), { target: { value: 'test' } });
    expect(saveButton).toBeEnabled();

    fireEvent.click(saveButton);
    expect(saveButton).toBeDisabled();
  });

  it('resets the form when the cancel button is clicked', () => {
    const { getByText } = render(<TopSection />);
    const cancelButton = getByText('Cancel');
    const formInput = getByLabelText(document.body, 'Form Input');

    fireEvent.change(formInput, { target: { value: 'test' } });
    expect(formInput).toHaveValue('test');

    fireEvent.click(cancelButton);
    expect(formInput).toHaveValue('');
  });

  it('resets the form when the save button is clicked', () => {
    const { getByText } = render(<TopSection />);
    const saveButton = getByText('Save');
    const formInput = getByLabelText(document.body, 'Form Input');

    fireEvent.change(formInput, { target: { value: 'test' } });
    expect(formInput).toHaveValue('test');

    fireEvent.click(saveButton);
    expect(formInput).toHaveValue('');
  });
});
