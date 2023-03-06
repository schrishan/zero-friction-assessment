import { render, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import OrganizationDetailsCard from "../pages/organisation-cfg/config-body/cards/OrganizationDetailsCard";
import configureMockStore from "redux-mock-store";
import { matchMediaMock } from "./matchMedia.mock";

describe("OrganizationDetailsCard component", () => {
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

  test("should render all fields correctly", () => {
    const { getByLabelText } = render(
      <Provider store={store}>
        <OrganizationDetailsCard />
      </Provider>
    );

    expect(getByLabelText("Code")).toBeInTheDocument();
    expect(getByLabelText("Description")).toBeInTheDocument();
    expect(getByLabelText("Bank account")).toBeInTheDocument();
    expect(getByLabelText("Vat account number")).toBeInTheDocument();
    expect(getByLabelText("Company account number")).toBeInTheDocument();
  });

  it("should display error message when required fields are empty", () => {
    const { getByTestId, getByLabelText } = render(
      <Provider store={store}>
        <OrganizationDetailsCard />
      </Provider>
    );
    const migrationModeCheckbox = getByTestId("migrationMode");
    const codeInput = getByLabelText("Code");
    const descriptionInput = getByLabelText("Description");
    const bankAccountInput = getByLabelText("Bank account");
    const vatAccountNumberInput = getByLabelText("Vat account number");
    const companyAccountNumberInput = getByLabelText("Company account number");

    fireEvent.click(migrationModeCheckbox);
    fireEvent.change(codeInput, { target: { value: "" } });
    fireEvent.change(descriptionInput, { target: { value: "" } });
    fireEvent.change(bankAccountInput, { target: { value: "" } });
    fireEvent.change(vatAccountNumberInput, { target: { value: "" } });
    fireEvent.change(companyAccountNumberInput, { target: { value: "" } });

    expect(getByTestId("error-alert")).toBeInTheDocument();
  });
});
