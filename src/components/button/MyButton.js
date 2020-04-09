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

// margin: 1rem .5rem 1rem .5rem;
// width: 12rem;
// padding: .5rem;
// background: transparent;
// border: .5px solid #333;
// border-radius: .5rem;
// font-size: 1rem;
// font-weight: 400;
// transition: .3s;
box-shadow: 2px 2px 10px 1px rgba(0, 0, 0, 0.2);

:hover{
  background: #c51162;
    color: #e8e8e8;
}
}
`;
