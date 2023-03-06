import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "../App";
import { matchMediaMock } from "./matchMedia.mock";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";

describe("App component", () => {
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
  test("renders the organisation configuration page", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const orgConfigPage = screen.getByRole("main");
    expect(orgConfigPage).toBeInTheDocument();
  });
});
