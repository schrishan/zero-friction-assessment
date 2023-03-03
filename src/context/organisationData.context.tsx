import { createContext, useState, ReactNode } from "react";

interface FormValues {
  [key: string]: {
    value: string | boolean;
  error: string;
  touched: boolean;
  }
}

interface OrgFormData {
  formValues: FormValues;
}

const initialFormValues: FormValues = {
  migrationMode: {
    value: false,
    error: "",
    touched: false,
  },
  code: {
    value: "",
    error: "",
    touched: false,
  },
  description: {
    value: "",
    error: "",
    touched: false,
  },
  vatAccountNumber: {
    value: "",
    error: "",
    touched: false,
  },
  bankAccount: {
    value: "",
    error: "",
    touched: false,
  },
  companyAccountNumber: {
    value: "",
    error: "",
    touched: false,
  },
  streetName: {
    value: "",
    error: "",
    touched: false,
  },
  streetNumber: {
    value: "",
    error: "",
    touched: false,
  },
  postalCode: {
    value: "",
    error: "",
    touched: false,
  },
  city: {
    value: "",
    error: "",
    touched: false,
  },
  country: {
    value: "",
    error: "",
    touched: false,
  },
  emailAddress: {
    value: "",
    error: "",
    touched: false,
  },
  telephone: {
    value: "",
    error: "",
    touched: false,
  },
  website: {
    value: "",
    error: "",
    touched: false,
  },
};
const initialFormData: OrgFormData = {
  formValues: initialFormValues,
};

export const OrgFormDataContext = createContext<{
  orgFormData: OrgFormData;
  initialOrgFormData: FormValues;
  setOrgFormData: (values: FormValues) => void;
}>({
  orgFormData: initialFormData,
  setOrgFormData: () => {},
  initialOrgFormData: initialFormValues,
});

const OrgFormDataProvider = ({ children }: { children: ReactNode }) => {
  const initialOrgFormData = initialFormValues;
  const [orgFormData, setFormValues] = useState<OrgFormData>(initialFormData);

  const setOrgFormData = (values: FormValues) => {
    setFormValues((prevData) => ({
      ...prevData,
      formValues: {
        ...prevData.formValues,
        ...values,
      },
    }));
  };

  return (
    <OrgFormDataContext.Provider value={{initialOrgFormData, orgFormData, setOrgFormData }}>
      {children}
    </OrgFormDataContext.Provider>
  );
};

export default OrgFormDataProvider;
