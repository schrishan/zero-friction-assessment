import React from "react";
import 'jsdom-global/register';
import { render, screen, fireEvent } from "@testing-library/react";
import AddressCard from "../pages/organisation-cfg/config-body/cards/AddressCard";

describe("AddressCard", () => {
  it("renders all elements properly", () => {
    render(<AddressCard />);
    expect(screen.getByText("Address")).toBeInTheDocument();
    expect(screen.getByLabelText("Street name")).toBeInTheDocument();
    expect(screen.getByLabelText("Street number")).toBeInTheDocument();
    expect(screen.getByLabelText("Postal code")).toBeInTheDocument();
    expect(screen.getByLabelText("City")).toBeInTheDocument();
    expect(screen.getByLabelText("Country")).toBeInTheDocument();
  });

  it("validates required fields and shows error message if empty", () => {
    render(<AddressCard />);
    const streetNameInput = screen.getByLabelText("Street name");
    const streetNumberInput = screen.getByLabelText("Street number");
    const postalCodeInput = screen.getByLabelText("Postal code");
    const cityInput = screen.getByLabelText("City");
    const countryInput = screen.getByLabelText("Country");

    fireEvent.blur(streetNameInput);
    expect(screen.getByText("This field is required")).toBeInTheDocument();
    fireEvent.blur(streetNumberInput);
    expect(screen.getByText("This field is required")).toBeInTheDocument();
    fireEvent.blur(postalCodeInput);
    expect(screen.getByText("This field is required")).toBeInTheDocument();
    fireEvent.blur(cityInput);
    expect(screen.getByText("This field is required")).toBeInTheDocument();
    fireEvent.blur(countryInput);
    expect(screen.getByText("This field is required")).toBeInTheDocument();
  });

  it("validates street number and postal code fields and shows error message if not numbers", () => {
    render(<AddressCard />);
    const streetNumberInput = screen.getByLabelText("Street number");
    const postalCodeInput = screen.getByLabelText("Postal code");

    fireEvent.change(streetNumberInput, { target: { value: "abc" } });
    fireEvent.blur(streetNumberInput);
    expect(
      screen.getByText("This field must be a number")
    ).toBeInTheDocument();
    fireEvent.change(postalCodeInput, { target: { value: "def" } });
    fireEvent.blur(postalCodeInput);
    expect(
      screen.getByText("This field must be a number")
    ).toBeInTheDocument();
  });

  it("updates form data and dispatches action on input change", () => {
    const updateAddressMock = jest.fn();
    jest.mock("../../../../store/slices/organizationConfigSlice", () => ({
      updateAddress: updateAddressMock,
    }));

    render(<AddressCard />);
    const streetNameInput = screen.getByLabelText("Street name");
    const streetNumberInput = screen.getByLabelText("Street number");
    const postalCodeInput = screen.getByLabelText("Postal code");
    const cityInput = screen.getByLabelText("City");
    const countryInput = screen.getByLabelText("Country");

    fireEvent.change(streetNameInput, { target: { value: "Test street" } });
    fireEvent.change(streetNumberInput, { target: { value: "123" } });
    fireEvent.change(postalCodeInput, { target: { value: "456" } });
    fireEvent.change(cityInput, { target: { value: "Test city" } });
    fireEvent.change(countryInput, { target: { value: "Test country" } });

    expect(updateAddressMock).toHaveBeenCalledWith({
      streetName: "Test street",
      streetNumber: "123",
      postalCode: "456",
      city: "Test city",
      country: "Test country",
    });
  });
});
