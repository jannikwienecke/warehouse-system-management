import React from "react";
import styled from "styled-components";

export const ButtonSelection = props => {
  return <Button {...props}>{props.children}</Button>;
};

const Button = styled.button`
margin: 1rem;
max-width: 40rem;
padding: .5rem;
background: transparent;
border: .5px solid #333;
border-radius: .5rem;
width: 50%;
font-size: 1.3rem;
font-weight: 400;
transition: .3s;
box-shadow: 2px 2px 10px 1px rgba(0, 0, 0, 0.2);

:hover{
  background: #333;
    color: #e8e8e8;
}
}
`;
