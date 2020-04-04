import React, { useEffect, useState } from "react";
import styled from "styled-components";

export const SuccessScreen = ({ text }) => {
  const [show, setShow] = useState(null);
  useEffect(() => {
    console.log("mounted");
    setTimeout(() => setShow(true), 10);
  }, []);

  return <Success show={show}>{text}</Success>;
};

const Success = styled.div`
  padding: 10rem;
  color: #81c784;
  font-size: 2rem;
  font-weight: 600;
  opacity: 0;
  transition: 1s;

  ${({ show }) =>
    show &&
    `
    opacity: 1;
 `}
`;
