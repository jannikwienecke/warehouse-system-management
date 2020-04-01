import React from "react";
import styled from "styled-components";

const StandardInput = ({ input, values, formFunc }) => {
  console.log("inout sixe", input);
  return (
    <InputElement
      type={input.type}
      name={input.name}
      placeholder={input.placeHolder ? input.placeHolder : input.name}
      onChange={formFunc.handleChange}
      onBlur={formFunc.handleBlur}
      defaultValue={input.defaultValue}
      disabled={input.disable && true}
    />
  );
};

export default StandardInput;

const InputElement = styled.input`
  width: 95%;
  font-size: 1rem;
  padding: 0.3rem;
  margin-right: 1rem;
  color: #444;
  font-weight: 700;
  text-transform: uppercase;
  text-align: center;
  border-radius: 0.4rem;
  border: 0.04rem solid #cecece;

  background-color: transparent;
  color: #efefef;

  :hover {
    border: 0.1rem solid green;
  }

  :focus {
    outline: none;
  }

  ::placeholder {
    color: #888;
    opacity: 0.7;
`;
