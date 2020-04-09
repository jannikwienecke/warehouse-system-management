import React from "react";
import styled from "styled-components";

export const Content = ({ width, children }) => {
  return <Container width={width}>{children}</Container>;
};

const Header = styled.div`
  // margin-top: 7%;
`;
const Headline = styled.div``;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  // position: relative;
  position: relative;
  min-height: 100vh;
  height: 100vh;
`;
