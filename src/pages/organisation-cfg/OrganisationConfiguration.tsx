import { Form, Layout } from "antd";
import ConfigBody from "./config-body/ConfigBody";
import css from "./organisation-configuration.module.css";
import TopSection from "./top-section/TopSection";

const { Content, Header } = Layout;

const OrganisationConfiguration = () => {
  const headerStyle: React.CSSProperties = {
    height: "auto",
  };
  return (
    <Layout className={css["layout"]}>
      <Form layout="vertical">
        <Header className={css["header"]} style={headerStyle}>
          <TopSection />
        </Header>
        <Content className={css["content"]}>
          <ConfigBody />
        </Content>
      </Form>
    </Layout>
  );
};

export default OrganisationConfiguration;
