import React from "react";
import ReactDOM from "react-dom";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

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

export default function App() {
  return (
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
  );
}

const Table = styled.table`
  border-radius: 1000px;
  border: 10px solid gainsboro;
  border-collapse: collapse;
`;
