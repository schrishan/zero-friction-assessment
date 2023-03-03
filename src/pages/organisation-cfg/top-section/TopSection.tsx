import { Alert, Button, Col, Form, Row, Space } from "antd";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { OrgFormDataContext } from "../../../context/organisationData.context";
import { useDispatch, useSelector } from "react-redux";
import { resetOrganizationConfig } from "../../../store/slices/organizationConfigSlice";
import { RootState } from "../../../store/store";
import { validateField } from "../../../validation/orgFormData.validation";

const TopSection = () => {
  const { initialOrgFormData, orgFormData, setOrgFormData } =
    useContext(OrgFormDataContext);
  const [formIsTouched, setFormIsTouched] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.organizationConfig.data);

  useEffect(() => {
    setFormIsTouched(
      Object.values(orgFormData.formValues).some((field) => field.touched)
    );
    setFormIsValid(
      !Object.values(orgFormData.formValues).some((field) => field.error)
    );
  }, [orgFormData.formValues]);

  const handleCancel = () => {
    setOrgFormData(initialOrgFormData);
    dispatch(
      resetOrganizationConfig({
        ...data,
        organizationDetail: {
          migrationMode: false,
          code: "",
          description: "",
          bankAccount: "",
          vatAccountNumber: "",
          companyAccountNumber: "",
        },
        contactDetails: {
          emailAddress: "",
          telephone: "",
          website: "",
        },
        address: {
          streetName: "",
          streetNumber: 0,
          postalCode: 0,
          city: "",
          country: "",
        },
      })
    );
  };

  const handleSave = () => {
    if (formIsValid) {
      handleCancel();
      setFormIsTouched(false);
      setFormIsValid(false);
    } else {
      const updatedFormData = { ...orgFormData };
      Object.entries(updatedFormData.formValues).forEach(([key, field]) => {
        if (field.value === "" || field.value === false) {
          updatedFormData.formValues[key] = {
            ...field,
            error: validateField(key, field.value),
            touched: true,
          };
        }
      });
      setOrgFormData(updatedFormData.formValues);
    }

    const updatedFormData = { ...orgFormData };
    Object.entries(updatedFormData.formValues).forEach(([key, field]) => {
      if (field.value === "" || field.value === false) {
        updatedFormData.formValues[key] = {
          ...field,
          error: validateField(key, field.value),
          touched: true,
        };
      }
    });
    setOrgFormData(updatedFormData.formValues);
  };

  return (
    <Row justify="end" className="top-row">
      {formIsTouched && !formIsValid && (
        <Col xs={24} sm={12} className="col-alert">
          <Space direction="horizontal" align="baseline">
            <Alert
              message="Form invalid, please fill the required field"
              type="error"
            />
          </Space>
        </Col>
      )}

      {formIsValid &&
        !Object.values(orgFormData.formValues).some(
          (field) => field.value == ""
        ) && (
          <Col xs={24} sm={12} className="col-alert">
            <Space direction="horizontal" align="baseline">
              <Alert
                message="The form has been successfully submitted"
                type="success"
              />
            </Space>
          </Col>
        )}

      <Col xs={24} sm={12} className="col-btn">
        <Space direction="horizontal" align="baseline">
          {formIsTouched && (
            <Form.Item>
              <Button type="text" onClick={handleCancel}>
                Cancel
              </Button>
            </Form.Item>
          )}
          <Form.Item>
            <Button
              type="primary"
              onClick={handleSave}
              disabled={!formIsTouched || !formIsValid}
              htmlType="submit"
            >
              Save
            </Button>
          </Form.Item>
        </Space>
      </Col>
    </Row>
  );
};

export default TopSection;
