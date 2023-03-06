import React from "react";
import { render, screen } from "@testing-library/react";
import OrganisationConfiguration from "../pages/organisation-cfg/OrganisationConfiguration";
import { matchMediaMock } from "./matchMedia.mock";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";

describe("OrganisationConfiguration component", () => {
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
        contactDetails: {
          emailAddress: "",
          telephone: "",
          website: "",
        },
        organizationDetail: {
          migrationMode: false,
          code: "",
          description: "",
          bankAccount: "",
          vatAccountNumber: "",
          companyAccountNumber: "",
        },
      },
    },
  });
  beforeAll(() => {
    originalMatchMedia = window.matchMedia;
    window.matchMedia = matchMediaMock;
  });

  afterAll(() => {
    window.matchMedia = originalMatchMedia;
  });
  test("renders the top section", () => {
    render(
      <Provider store={store}>
        <OrganisationConfiguration />
      </Provider>
    );
    const topSection = screen.getByTestId("top-section");
    expect(topSection).toBeInTheDocument();
  });

  test("renders the config body", () => {
    render(
      <Provider store={store}>
        <OrganisationConfiguration />
      </Provider>
    );
    const configBody = screen.getByTestId("config-body");
    expect(configBody).toBeInTheDocument();
  });
});
