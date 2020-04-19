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
import GraphQl from "./templates/GraphQl";
import { createErrListFromApiError } from "./functions/utils";
import { useInitQuery } from "./queries/queries";

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
  const { loadingInitData } = useInitQuery(store);

  if (loadingInitData) return <h1>LOADING...</h1>;
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Switch>
            <PageRouter exact path="/" component={GraphQl} />

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
      </Router>
      >
    </Provider>
  );
}
