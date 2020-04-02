import React from "react";
import styled from "styled-components";

export const Container = ({ children, width }) => {
  return <Wrapper>{children}</Wrapper>;
};

const Wrapper = styled.div`
  width: 90%;
  margin: 0 auto;

  ${({ width }) =>
    width &&
    `
  width: ${width}
`}
`;
