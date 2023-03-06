import { render, screen } from "@testing-library/react";
import ConfigBody from "../pages/organisation-cfg/config-body/ConfigBody";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { matchMediaMock } from "./matchMedia.mock";

describe("ConfigBody component", () => {
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
  it("should render OrganizationDetailsCard, AddressCard and ContactDetailsCard", () => {
    render(
      <Provider store={store}>
        <ConfigBody />
      </Provider>
    );
    expect(screen.getByTestId("organization-details-card")).toBeInTheDocument();
    expect(screen.getByTestId("address-card")).toBeInTheDocument();
    expect(screen.getByTestId("contact-details-card")).toBeInTheDocument();
  });
});
