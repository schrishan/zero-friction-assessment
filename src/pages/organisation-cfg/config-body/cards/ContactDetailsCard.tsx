import { Card, Form, Input, InputNumber } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { ContactDetailType } from "../../../../types/organisation-config";
import { updateContactDetails } from "../../../../store/slices/organizationConfigSlice";
import { RootState } from "../../../../store/store";
import { useContext } from "react";
import { OrgFormDataContext } from "../../../../context/organisationData.context";
import { validateField } from "../../../../validation/orgFormData.validation";

const ContactDetailsCard = () => {
  const { orgFormData, setOrgFormData } = useContext(OrgFormDataContext);
  const dispatch = useDispatch();
  const contactDetails: ContactDetailType = useSelector(
    (state: RootState) => state.organizationConfig.data.contactDetails
  );

  const handleOnChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setOrgFormData({
      [name]: {
        value: type === "checkbox" ? checked : value,
        error: validateField(name, value),
        touched: true,
      },
    });
    if (!name.error)
      dispatch(updateContactDetails({ ...contactDetails, [name]: value }));
  };

  return (
    <Card title="Contact Details" bodyStyle={{ textAlign: "left" }}>
      <Form.Item
      label="Email address"
        required
        validateStatus={
          orgFormData.formValues["emailAddress"].error ? "error" : "success"
        }
        help={
          orgFormData.formValues["emailAddress"].error
            ? orgFormData.formValues["emailAddress"].error
            : ""
        }
      >
        <Input
          name="emailAddress"
          onChange={handleOnChange}
          value={contactDetails.emailAddress}
        />
      </Form.Item>

      <Form.Item
        label="Telephone"
        required
        validateStatus={
          orgFormData.formValues["telephone"].error ? "error" : "success"
        }
        help={
          orgFormData.formValues["telephone"].error
            ? orgFormData.formValues["telephone"].error
            : ""
        }
      >
        <Input
          name="telephone"
          minLength={10}
          maxLength={11}
          onChange={handleOnChange}
          style={{ width: "100%" }}
          value={contactDetails.telephone}
        />
      </Form.Item>

      <Form.Item
        label="Website"
        required
        validateStatus={
          orgFormData.formValues["website"].error ? "error" : "success"
        }
        help={
          orgFormData.formValues["website"].error
            ? orgFormData.formValues["website"].error
            : ""
        }
      >
        <Input
          onChange={handleOnChange}
          value={contactDetails.website}
          name="website"
        />
      </Form.Item>
    </Card>
  );
};

export default ContactDetailsCard;
