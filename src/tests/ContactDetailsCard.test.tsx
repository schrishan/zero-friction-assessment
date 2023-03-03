import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import ContactDetailsCard from "../pages/organisation-cfg/config-body/cards/ContactDetailsCard";

describe("ContactDetailsCard", () => {
  beforeEach(() => {
    render(<ContactDetailsCard />);
  });

  it("renders all elements properly", () => {
    expect(screen.getByText("Contact Details")).toBeInTheDocument();
    expect(screen.getByLabelText("Email address")).toBeInTheDocument();
    expect(screen.getByLabelText("Telephone")).toBeInTheDocument();
    expect(screen.getByLabelText("Website")).toBeInTheDocument();
  });

  it("requires all fields and displays validation messages", async () => {
    const saveButton = screen.getByText("Save");

    // Clicking the Save button without filling in any fields should display errors
    fireEvent.click(saveButton);

    expect(screen.getByText("Please input your email address!")).toBeInTheDocument();
    expect(screen.getByText("Please input your telephone number!")).toBeInTheDocument();
    expect(screen.getByText("Please input your website URL!")).toBeInTheDocument();

    // Fill in the email field and click Save to test the other fields
    const emailInput = screen.getByLabelText("Email address");
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });

    fireEvent.click(saveButton);

    expect(screen.getByText("Please input your telephone number!")).toBeInTheDocument();
    expect(screen.getByText("Please input your website URL!")).toBeInTheDocument();

    // Fill in the telephone field and click Save to test the website field
    const telephoneInput = screen.getByLabelText("Telephone");
    fireEvent.change(telephoneInput, { target: { value: "12345678901" } });

    fireEvent.click(saveButton);

    expect(screen.getByText("Please enter a valid website URL!")).toBeInTheDocument();

    // Fill in the website field and click Save to test the form validation
    const websiteInput = screen.getByLabelText("Website");
    fireEvent.change(websiteInput, { target: { value: "http://example.com" } });

    fireEvent.click(saveButton);

    expect(screen.queryByText("Please input your email address!")).not.toBeInTheDocument();
    expect(screen.queryByText("Please input your telephone number!")).not.toBeInTheDocument();
    expect(screen.queryByText("Please input your website URL!")).not.toBeInTheDocument();
  });

  it("validates phone number and email format", () => {
    const emailInput = screen.getByLabelText("Email address");
    const telephoneInput = screen.getByLabelText("Telephone");

    fireEvent.change(emailInput, { target: { value: "invalid email" } });
    expect(screen.getByText("Please enter a valid email address!")).toBeInTheDocument();

    fireEvent.change(telephoneInput, { target: { value: "123456789012" } });
    expect(screen.getByText("Please enter a valid phone number!")).toBeInTheDocument();
  });

  it("validates website URL format", () => {
    const websiteInput = screen.getByLabelText("Website");

    fireEvent.change(websiteInput, { target: { value: "invalid website" } });
    expect(screen.getByText("Please enter a valid website URL!")).toBeInTheDocument();
  });
});
