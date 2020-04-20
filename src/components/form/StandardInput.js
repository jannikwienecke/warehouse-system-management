import React from "react";
import styled from "styled-components";

const StandardInput = ({ input, values, formFunc, colorScheme, errors }) => {
  // console.log("input error....", input);
  // console.log("inpujt.errr", input.error);

  const hasError = () => {
    const name = input.name;
    if (errors[name]) {
      return true;
    }

    const hasFormValidationErr = input.error;
    if (hasFormValidationErr && input.error.nameList) {
      const nameInErrorList = input.error.nameList.includes(name);
      if (nameInErrorList) {
        return true;
      }
    }
  };

  return (
    <InputElement
      type={input.type}
      name={input.name}
      placeholder={input.placeholder ? input.placeholder : input.name}
      onChange={(e) => formFunc.handleChange(e, input.type)}
      onBlur={formFunc.handleBlur}
      defaultValue={input.default}
      disabled={input.disable && true}
      scheme={colorScheme}
      error={hasError()}
      max={input.max}
      style={input.style}
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
  text-align: left;
  border-radius: 0.4rem;
  border: 0.04rem solid #cecece;
  position: relative;
  right: 1%;
  background-color: transparent;
  // color: #efefef;

  ${({ error }) =>
    error &&
    `
border: 1px solid red;
`}

  ${({ scheme }) =>
    scheme === "grey" &&
    `
        color: #3f51b5;

`} :hover {
    border: 0.1rem solid green;
  }

  :focus {
    outline: none;
  }

  ::placeholder {
    color: #888;
    opacity: 0.7;
    font-size: 1rem;

    ${({ scheme }) =>
      scheme === "grey" &&
      `
        color: #3f51b5;

`}
  }
`;
