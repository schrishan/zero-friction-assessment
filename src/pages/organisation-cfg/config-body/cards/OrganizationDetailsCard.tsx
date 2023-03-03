import { Card, Checkbox, Form, Input } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateOrganizationDetails } from "../../../../store/slices/organizationConfigSlice";
import { RootState } from "../../../../store/store";
import { useContext } from "react";
import { OrgFormDataContext } from "../../../../context/organisationData.context";
import { validateField } from "../../../../validation/orgFormData.validation";

const OrganizationDetailsCard = () => {
  const { orgFormData, setOrgFormData } = useContext(OrgFormDataContext);
  const [migrationMode, setMigrationMode] = useState(false);

  const dispatch = useDispatch();
  const organizationDetail = useSelector(
    (state: RootState) => state.organizationConfig.data.organizationDetail
  );

  const handleOnChange = (e: any) => {
    const { name, value } = e.target;
    setOrgFormData({
      [name]: {
        value: value,
        error: validateField(name, value),
        touched: true,
      },
    });
    if (!name.error)
      dispatch(
        updateOrganizationDetails({ ...organizationDetail, [name]: value })
      );
  };

  const onMigrationModeChange = async (e: any) => {
    const { name, checked } = e.target;
    await setMigrationMode(checked);
    dispatch(
      updateOrganizationDetails({
        ...organizationDetail,
        [name]: checked,
      })
    );
    setOrgFormData({
      [name]: {
        value: checked,
        error: validateField(name, checked),
        touched: true,
      },
    });
  };

  return (
    <Card title="Organization Details" bodyStyle={{ textAlign: "left" }}>
      <Form.Item
        required
        valuePropName="checked"
        validateStatus={
          orgFormData.formValues["migrationMode"].error ? "error" : "success"
        }
        help={
          orgFormData.formValues["migrationMode"].error
            ? orgFormData.formValues["migrationMode"].error
            : ""
        }
      >
        <Checkbox
          name="migrationMode"
          checked={organizationDetail.migrationMode}
          onChange={onMigrationModeChange}
        >
          Migration mode
        </Checkbox>
      </Form.Item>

      <Form.Item
        label="Code"
        required
        validateStatus={
          orgFormData.formValues["code"].error ? "error" : "success"
        }
        help={
          orgFormData.formValues["code"].error
            ? orgFormData.formValues["code"].error
            : ""
        }
      >
        <Input
          name="code"
          onChange={handleOnChange}
          value={organizationDetail.code}
        />
      </Form.Item>

      <Form.Item
        label="Description"
        required
        validateStatus={
          orgFormData.formValues["description"].error ? "error" : "success"
        }
        help={
          orgFormData.formValues["description"].error
            ? orgFormData.formValues["description"].error
            : ""
        }
      >
        <Input
          name="description"
          onChange={handleOnChange}
          value={organizationDetail.description}
        />
      </Form.Item>

      <Form.Item
        label="Bank account"
        required
        validateStatus={
          orgFormData.formValues["bankAccount"].error ? "error" : "success"
        }
        help={
          orgFormData.formValues["bankAccount"].error
            ? orgFormData.formValues["bankAccount"].error
            : ""
        }
      >
        <Input
          name="bankAccount"
          onChange={handleOnChange}
          value={organizationDetail.bankAccount}
        />
      </Form.Item>

      <Form.Item
        label="Vat account number"
        required
        validateStatus={
          orgFormData.formValues["vatAccountNumber"].error ? "error" : "success"
        }
        help={
          orgFormData.formValues["vatAccountNumber"].error
            ? orgFormData.formValues["vatAccountNumber"].error
            : ""
        }
      >
        <Input
          name="vatAccountNumber"
          onChange={handleOnChange}
          value={organizationDetail.vatAccountNumber}
        />
      </Form.Item>

      <Form.Item
        label="Company account number"
        required
        validateStatus={
          orgFormData.formValues["companyAccountNumber"].error
            ? "error"
            : "success"
        }
        help={
          orgFormData.formValues["companyAccountNumber"].error
            ? orgFormData.formValues["companyAccountNumber"].error
            : ""
        }
      >
        <Input
          name="companyAccountNumber"
          onChange={handleOnChange}
          value={organizationDetail.companyAccountNumber}
        />
      </Form.Item>
    </Card>
  );
};

export default OrganizationDetailsCard;
