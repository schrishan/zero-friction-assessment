import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { OrgFormDataContext } from "../context/organisationData.context";
import TopSection from "../pages/organisation-cfg/top-section/TopSection";
import { matchMediaMock } from "./matchMedia.mock";

const mockStore = configureMockStore([]);

describe("TopSection", () => {
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

  it("renders correctly", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <OrgFormDataContext.Provider
          value={{
            initialOrgFormData: {},
            orgFormData: { formValues: {} },
            setOrgFormData: () => {},
          }}
        >
          <TopSection />
        </OrgFormDataContext.Provider>
      </Provider>
    );

    expect(getByTestId("save-btn")).toBeInTheDocument();
  });

  it("does not render the cancel button when the form is not touched", () => {
    const { queryByTestId } = render(
      <Provider store={store}>
        <OrgFormDataContext.Provider
          value={{
            initialOrgFormData: {},
            orgFormData: { formValues: {} },
            setOrgFormData: () => {},
          }}
        >
          <TopSection />
        </OrgFormDataContext.Provider>
      </Provider>
    );

    expect(queryByTestId("cancel-btn")).not.toBeInTheDocument();
  });

  it("renders the cancel button when the form is touched", () => {
    const { queryByTestId } = render(
      <Provider store={store}>
        <OrgFormDataContext.Provider
          value={{
            initialOrgFormData: {},
            orgFormData: { formValues: {} },
            setOrgFormData: () => {},
          }}
        >
          <TopSection />
        </OrgFormDataContext.Provider>
      </Provider>
    );

    expect(queryByTestId("cancel-btn")).toBeInTheDocument();
  });

  it("resets the form when the cancel button is clicked", () => {
    const setOrgFormData = jest.fn();
    const { getByTestId } = render(
      <Provider store={store}>
        <OrgFormDataContext.Provider
          value={{
            initialOrgFormData: {},
            orgFormData: { formValues: {} },
            setOrgFormData,
          }}
        >
          <TopSection />
        </OrgFormDataContext.Provider>
      </Provider>
    );

    fireEvent.click(getByTestId("cancel-btn"));

    expect(setOrgFormData).toHaveBeenCalledWith({
      formValues: { name: { value: "Test" } },
    });
  });

  it("when the save button is clicked", () => {
    const handleSave = jest.fn();
    const { getByTestId } = render(
      <Provider store={store}>
        <OrgFormDataContext.Provider
          value={{
            initialOrgFormData: {},
            orgFormData: {
              formValues: { name: { value: "Test", error: "", touched: true } },
            },
            setOrgFormData: () => {},
          }}
        >
          <TopSection />
        </OrgFormDataContext.Provider>
      </Provider>
    );

    fireEvent.click(getByTestId("save-btn"));

    expect(getByTestId("save-btn")).toHaveBeenCalled();
  });
});
