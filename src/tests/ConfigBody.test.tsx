import { render, screen } from "@testing-library/react";
import ConfigBody from "../pages/organisation-cfg/config-body/ConfigBody";

describe("ConfigBody component", () => {
  it("renders all three child components properly", () => {
    render(<ConfigBody />);
    
    const organizationDetailsCard = screen.getByTestId("organization-details-card");
    expect(organizationDetailsCard).toBeInTheDocument();

    const addressCard = screen.getByTestId("address-card");
    expect(addressCard).toBeInTheDocument();

    const contactDetailsCard = screen.getByTestId("contact-details-card");
    expect(contactDetailsCard).toBeInTheDocument();
  });
});
