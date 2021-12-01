import * as React from "react";
import { CurrentUserProvider } from "./CurrentUserContext";
import Dashboard from "./Dashboard";
import Layout from "./Layout";

const App = () => {
  return (
    <CurrentUserProvider>
      <Layout>
        <Dashboard />
      </Layout>
    </CurrentUserProvider>
  );
};

export default App;
