import React from "react";
import styled from "styled-components";
export const Header = ({ children }) => {
  return <Header_>{children}</Header_>;
};

const Header_ = styled.div`
  background: #3f51b5;
  height: 12rem;
  display: relative;
  color: #e8e8e8;
  padding-top: 6%;
  font-size: 2.2rem;
  text-align: left;
  font-weight: bold;
  padding-left: 10%;
`;
