import React from "react";
import styled from "styled-components";

export const Content = ({ width, children }) => {
  return (
    <Container width={width}>
      <Header>
        <Headline>{children}</Headline>
      </Header>
    </Container>
  );
};

const Header = styled.div`
  // margin-top: 7%;
`;
const Headline = styled.div``;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;
