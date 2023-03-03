import React from 'react';
import { Content, Header } from "antd/es/layout/layout";
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import OrganisationConfiguration from '../pages/organisation-cfg/OrganisationConfiguration';

describe('OrganisationConfiguration component', () => {
  it('renders without errors', () => {
    render(<OrganisationConfiguration />);
    expect(screen.getByTestId('organisation-config')).toBeInTheDocument();
  });

  it('renders header with correct styles', () => {
    render(<OrganisationConfiguration />);
    const header = screen.getByTestId('organisation-header');
    expect(header).toBeInTheDocument();
    expect(header).toHaveStyle({
      height: 'auto'
    });
  });

  it('renders top section within header', () => {
    render(<OrganisationConfiguration />);
    expect(screen.getByTestId('organisation-top-section')).toBeInTheDocument();
  });

  it('renders config body within content', () => {
    render(<OrganisationConfiguration />);
    expect(screen.getByTestId('organisation-config-body')).toBeInTheDocument();
  });
});
