import {
  render,
  fireEvent,
  screen,
  getByText,
  waitFor,
} from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

import ContactDetailsCard from "../pages/organisation-cfg/config-body/cards/ContactDetailsCard";
import { matchMediaMock } from "./matchMedia.mock";

describe("ContactDetailsCard", () => {
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
        contactDetails: {
          emailAddress: "",
          telephone: "",
          website: "",
        },
      },
    },
  });

  it("renders all fields and validates input", async () => {
    render(
      <Provider store={store}>
        <ContactDetailsCard />
      </Provider>
    );
    // Check that all fields are present
    expect(screen.getByLabelText("Email address")).toBeInTheDocument();
    expect(screen.getByLabelText("Telephone")).toBeInTheDocument();
    expect(screen.getByLabelText("Website")).toBeInTheDocument();

    // Fill in the fields with valid values
    fireEvent.change(screen.getByLabelText("Email address"), {
      target: { value: "sadith@test.com" },
    });
    fireEvent.change(screen.getByLabelText("Telephone"), {
      target: { value: "0771234567" },
    });
    fireEvent.change(screen.getByLabelText("Website"), {
      target: { value: "https://opterr.org" },
    });

    // Check that fields are valid
    expect(screen.queryByText("Please enter email address")).toBeNull();
    expect(screen.queryByText("Please enter telephone number")).toBeNull();
    expect(screen.queryByText("Please enter website")).toBeNull();
  });

  it("should display error message when all required fields are empty", () => {
    const { getByTestId, getByLabelText } = render(
      <Provider store={store}>
        <ContactDetailsCard />
      </Provider>
    );
    const emailAddress = getByLabelText("Email address");
    const telephone = getByLabelText("Telephone");
    const website = getByLabelText("Website");

    fireEvent.change(emailAddress, { target: { value: "" } });
    fireEvent.change(telephone, { target: { value: "" } });
    fireEvent.change(website, { target: { value: "" } });

    expect(getByTestId("error-alert")).toBeInTheDocument();
  });
});
