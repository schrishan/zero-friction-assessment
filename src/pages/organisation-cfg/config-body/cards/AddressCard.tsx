import { Card, Form, Input, InputNumber } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AddressType } from "../../../../types/organisation-config";
import { updateAddress } from "../../../../store/slices/organizationConfigSlice";
import { RootState } from "../../../../store/store";
import { useContext } from "react";
import { OrgFormDataContext } from "../../../../context/organisationData.context";
import { validateField } from "../../../../validation/orgFormData.validation";

const AddressCard = () => {
  const { orgFormData, setOrgFormData } = useContext(OrgFormDataContext);
  const dispatch = useDispatch();
  const address = useSelector(
    (state: RootState) => state.organizationConfig.data.address
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
    if (!name.error) dispatch(updateAddress({ ...address, [name]: value }));
  };

  return (
    <Card title="Address" bodyStyle={{ textAlign: "left" }}>
      <Form.Item
        label="Street name"
        required
        validateStatus={
          orgFormData.formValues["streetName"].error ? "error" : "success"
        }
        help={
          orgFormData.formValues["streetName"].error
            ? orgFormData.formValues["streetName"].error
            : ""
        }
      >
        <Input
          name="streetName"
          onChange={handleOnChange}
          value={address.streetName}
        />
      </Form.Item>

      <Form.Item
        label="Street number"
        required
        validateStatus={
          orgFormData.formValues["streetNumber"].error ? "error" : "success"
        }
        help={
          orgFormData.formValues["streetNumber"].error
            ? orgFormData.formValues["streetNumber"].error
            : ""
        }
      >
        <Input
          name="streetNumber"
          onChange={handleOnChange}
          value={address.streetNumber}
          style={{ width: "100%" }}
        />
      </Form.Item>

      <Form.Item
        label="Postal code"
        required
        validateStatus={
          orgFormData.formValues["postalCode"].error ? "error" : "success"
        }
        help={
          orgFormData.formValues["postalCode"].error
            ? orgFormData.formValues["postalCode"].error
            : ""
        }
      >
        <Input
          name="postalCode"
          onChange={handleOnChange}
          value={address.postalCode}
          style={{ width: "100%" }}
        />
      </Form.Item>

      <Form.Item
        label="City"
        required
        validateStatus={
          orgFormData.formValues["city"].error ? "error" : "success"
        }
        help={
          orgFormData.formValues["city"].error
            ? orgFormData.formValues["city"].error
            : ""
        }
      >
        <Input name="city" onChange={handleOnChange} value={address.city} />
      </Form.Item>

      <Form.Item
        label="Country"
        required
        validateStatus={
          orgFormData.formValues["country"].error ? "error" : "success"
        }
        help={
          orgFormData.formValues["country"].error
            ? orgFormData.formValues["country"].error
            : ""
        }
      >
        <Input
          name="country"
          onChange={handleOnChange}
          value={address.country}
        />
      </Form.Item>
    </Card>
  );
};

export default AddressCard;
