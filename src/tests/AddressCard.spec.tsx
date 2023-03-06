import {
  render,
  fireEvent,
  screen,
  getByText,
  waitFor,
} from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

import AddressCard from "../pages/organisation-cfg/config-body/cards/AddressCard";
import { matchMediaMock } from "./matchMedia.mock";

describe("AddressCard", () => {
  let originalMatchMedia: (query: string) => MediaQueryList;
  beforeAll(() => {
    originalMatchMedia = window.matchMedia;
    window.matchMedia = matchMediaMock;
  });

  afterAll(() => {
    window.matchMedia = originalMatchMedia;
  });

  const mockStore = configureMockStore();
  const store = mockStore({
    organizationConfig: {
      data: {
        address: {
          streetName: "",
          streetNumber: "",
          postalCode: "",
          city: "",
          country: "",
        },
      },
    },
  });

  it("renders all fields and validates input", async () => {
    render(
      <Provider store={store}>
        <AddressCard />
      </Provider>
    );
    // Check that all fields are present
    expect(screen.getByLabelText("Street name")).toBeInTheDocument();
    expect(screen.getByLabelText("Street number")).toBeInTheDocument();
    expect(screen.getByLabelText("Postal code")).toBeInTheDocument();
    expect(screen.getByLabelText("City")).toBeInTheDocument();
    expect(screen.getByLabelText("Country")).toBeInTheDocument();

    // Fill in the fields with valid values
    fireEvent.change(screen.getByLabelText("Street name"), {
      target: { value: "Main Street" },
    });
    fireEvent.change(screen.getByLabelText("Street number"), {
      target: { value: "123" },
    });
    fireEvent.change(screen.getByLabelText("Postal code"), {
      target: { value: "12345" },
    });
    fireEvent.change(screen.getByLabelText("City"), {
      target: { value: "New York" },
    });
    fireEvent.change(screen.getByLabelText("Country"), {
      target: { value: "USA" },
    });

    // Check that fields are valid
    expect(screen.queryByText("Please enter street name")).toBeNull();
    expect(screen.queryByText("Please enter street number")).toBeNull();
    expect(screen.queryByText("Please enter postal code")).toBeNull();
    expect(screen.queryByText("Please enter city")).toBeNull();
    expect(screen.queryByText("Please enter country")).toBeNull();

    // Check Street number & Postal code fields are fill with numbers
    fireEvent.change(screen.getByLabelText("Street number"), {
      target: { value: "abc" },
    });
    expect(screen.queryByText("Please enter valid street number")).toBeNull();

    fireEvent.change(screen.getByLabelText("Postal code"), {
      target: { value: "abcde" },
    });
    expect(screen.queryByText("Please enter valid postal code")).toBeNull();
  });

  it("should display error message when all required fields are empty", () => {
    const { getByTestId, getByLabelText } = render(
      <Provider store={store}>
        <AddressCard />
      </Provider>
    );
    const streetName = getByLabelText("Street name");
    const streetNumber = getByLabelText("Street number");
    const postalCode = getByLabelText("Postal code");
    const city = getByLabelText("City");
    const country = getByLabelText("Country");

    fireEvent.change(streetName, { target: { value: "" } });
    fireEvent.change(streetNumber, { target: { value: "" } });
    fireEvent.change(postalCode, { target: { value: "" } });
    fireEvent.change(city, { target: { value: "" } });
    fireEvent.change(country, { target: { value: "" } });

    expect(getByTestId("error-alert")).toBeInTheDocument();
  });
});
