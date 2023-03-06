import { Col, Row } from "antd";
import {
  AddressCard,
  ContactDetailsCard,
  OrganizationDetailsCard,
} from "./cards";

const ConfigBody = () => {
  return (
    <Row gutter={[16, 16]} data-testid="config-body">
      <Col xs={24} sm={12} md={8} lg={8}>
        <OrganizationDetailsCard />
      </Col>
      <Col xs={24} sm={12} md={8} lg={8}>
        <AddressCard />
      </Col>
      <Col xs={24} sm={12} md={8} lg={8}>
        <ContactDetailsCard />
      </Col>
    </Row>
  );
};

export default ConfigBody;
