import React, { useEffect } from "react";
import { HashRouter as Router, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import "./styles.css";
import { PageRouter } from "./PageRouter";
import { DashboardEinlagerung } from "./einlagerung/Dashboard";
import { DashboardAuslagerung } from "./auslagerung/DashboardAuslagerung";
import store from "./store";
import {
  fetchCustomer,
  fetchProducts,
  fetchStorage,
  fetchEmployees,
  fetchStorageBridges,
  fetchSymBuildings,
  fetchCompartments,
  setInitData,
  showAlert,
} from "./baseComponents/store/actions";
import { MyStorage } from "./templates/MyStorage";
import GraphQl from "./wareBaseData/GraphQl";
import { createErrListFromApiError } from "./functions/utils";
import { ModularGraphQl } from "./templates/ModularGraphQl";
import { GraphQlForm } from "./templates/GraphQlForm";
import { useInitQuery } from "./functions/hooks.js/useInitQuery";
import { Loader } from "./common/Loader";

const initializeData = (data) => {
  store.dispatch(setInitData(data));
  const funcArr = [
    fetchCustomer,
    // fetchProducts,
    fetchStorage,
    fetchStorageBridges,
    // fetchEmployees,
    fetchSymBuildings,
    fetchCompartments,
  ];
  funcArr.forEach((func) => {
    store.dispatch(func());
  });
};

const setError = (error) => {
  createErrListFromApiError(error, store.dispatch);
};

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppContent />
      </Router>
    </Provider>
  );
}

export const AppContent = () => {
  const { loadingInitData } = useInitQuery();
  if (loadingInitData) {
    return <Loader marginTop="35vh" time={0} />;
  }

  return (
    <div className="App">
      <Switch>
        <PageRouter exact path="/" component={DashboardAuslagerung} />
        <PageRouter exact path="/base" component={GraphQl} />

        <PageRouter
          exact
          path="/auslagerung"
          component={DashboardAuslagerung}
        />
        <PageRouter
          exact
          path="/einlagerung"
          component={DashboardEinlagerung}
        />
      </Switch>
    </div>
  );
};
