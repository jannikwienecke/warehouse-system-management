import React from "react";
import styled from "styled-components";

export const Navigation = ({ children }) => {
  return <NavigationWrapper>{children}</NavigationWrapper>;
};

const NavigationWrapper = styled.div`
  text-align: left;
`;
