import React from "react";
import styled from "styled-components";

export const MyButton = (props) => {
  return <Button {...props}>{props.children}</Button>;
};

const Button = styled.button`
background : #f50057;
color: #fff;
padding: 6px 16px;
font-size: 0.875rem;
min-width: 64px;
box-sizing: border-box;
transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
font-family: "Roboto", "Helvetica", "Arial", sans-serif;
font-weight: 500;
line-height: 1.75;
border: 0;
border-radius: 4px;
letter-spacing: 0.02857em;
text-transform: uppercase;
margin: 8px;
box-shadow: 2px 2px 10px 1px rgba(0, 0, 0, 0.2);

${({ size }) =>
  size === "small" &&
  `
  font-size: 0.7rem;
  padding: 4px 10px;
`}

:hover{
  background: #c51162;
    color: #e8e8e8;
}
}
`;
