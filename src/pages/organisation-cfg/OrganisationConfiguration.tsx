import { Form, FormInstance, Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import ConfigBody from "./config-body/ConfigBody";
import css from "./organisation-configuration.module.css";
import TopSection from "./top-section/TopSection";

const OrganisationConfiguration = () => {
  const headerStyle: React.CSSProperties = {
    height: 'auto',
  };
  return (
    <Layout className={css["layout"]}>
      <Form layout="vertical">
        <Header className={css["header"]} style={headerStyle}>
          <TopSection/>
        </Header>
        <Content className={css["content"]}>
          <ConfigBody />
        </Content>
      </Form>
    </Layout>
  );
};

export default OrganisationConfiguration;
