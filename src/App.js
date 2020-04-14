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

const initializeData = (data) => {
  store.dispatch(setInitData(data));
  const funcArr = [
    fetchCustomer,
    fetchProducts,
    fetchStorage,
    fetchStorageBridges,
    fetchEmployees,
    fetchSymBuildings,
    fetchCompartments,
  ];
  funcArr.forEach((func) => {
    store.dispatch(func());
  });
};

const setError = (error) => {
  const errorKeys = ["graphQLErrors", "networkError"];
  errorKeys.forEach((key) => {
    try {
      if (key === "graphQLErrors") {
        var errorList = error[key];
      } else {
        var errorList = error[key].result.errors;
      }
    } catch (e) {
      if (!(e instanceof TypeError)) {
        throw e;
      }
      return [];
    }

    return errorList.forEach((err) => {
      var msg = `${err.message} - Position ${JSON.stringify(err.locations)}`;
      store.dispatch(showAlert(msg));
    });
  });
};

export default function App({ data, error, loading }) {
  useEffect(() => {
    if (data) {
      initializeData(data);
    } else if (error) {
      setError(error);
    }
  }, [data, error, loading]);

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Switch>
            <PageRouter exact path="/" component={MyStorage} />

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
