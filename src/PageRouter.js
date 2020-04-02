import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { MyLayout } from "./MyLayout";

export const PageRouter = ({
  component: Component,
  auth,
  driver,
  noMargin,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props => {
        return (
          <MyLayout>
            <Component {...props} />
          </MyLayout>
        );
      }}
    />
  );
};
