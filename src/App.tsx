import "./App.css";
import OrgFormDataProvider from "./context/organisationData.context";
import OrganisationConfiguration from "./pages/organisation-cfg/OrganisationConfiguration";

const App = () => {
  return (
    <div className="App">
      <OrgFormDataProvider>
        <OrganisationConfiguration />
      </OrgFormDataProvider>
    </div>
  );
};

export default App;
