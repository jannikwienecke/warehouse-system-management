import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { Provider, connect, useDispatch } from "react-redux";

import "./styles.css";
import MyForm from "./templates/MyForm";
import MyTable from "./templates/MyTable";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import MyPopup from "./templates/MyPopup";
import MyModal from "./templates/MyModal";
import { MyLayout } from "./MyLayout";
import { PageRouter } from "./PageRouter";
import { Dashboard } from "./einlagerung/Dashboard";
import { DashboardAuslagerung } from "./auslagerung/DashboardAuslagerung";
import CreateTour from "./auslagerung/createTour/CreateTour";
import store from "./store";
import { fetchCustomer, fetchProducts } from "./baseComponents/store/actions";

const initializeData = () => {
  // const dispatch = useDispatch();
  const funcArr = [fetchCustomer, fetchProducts];
  funcArr.forEach((func) => {
    store.dispatch(func());
  });
};

export default function App() {
  useEffect(() => {
    console.log("PROGRAMM STARTS...");
    initializeData();
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          {/* <MyPopup />
      <MyModal />
      <MyForm />
      <MyTable /> */}
          <Switch>
            <PageRouter exact path="/" component={Dashboard} />

            <PageRouter
              exact
              path="/auslagerung"
              component={DashboardAuslagerung}
            />
            <PageRouter exact path="/einlagerung" component={Dashboard} />

            <PageRouter exact path="/table" component={MyTable} />
          </Switch>
          {/* <MyLayout /> */}
        </div>
      </Router>
    </Provider>
  );
}

const Table = styled.table`
  border-radius: 1000px;
  border: 10px solid gainsboro;
  border-collapse: collapse;
`;
