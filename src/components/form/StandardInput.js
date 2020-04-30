import React, { useState, useEffect } from "react";
import styled from "styled-components";

const StandardInput = ({
  input,
  values,
  formFunc,
  colorScheme,
  errors,
  isFullSize,
}) => {
  const [error, setError] = useState(null);
  const [hover, setHover] = useState(null);

  useEffect(() => {
    if (input.max || input.max === 0) {
      addError();
    }
  }, [values, input.max]);

  const addError = () => {
    let msg;
    if (input.max === 0) msg = "Produkt nicht auf Lager";
    else if (input.max < values[input.name])
      msg = `Anzahl muss kleiner bzw.gleich ${input.max} sein`;

    if (msg) setError(msg);
    else setError(null);
  };

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
    <>
      {error && <ToolTip show={hover}>{error}</ToolTip>}
      <InputElement
        onMouseOver={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        isFullSize={isFullSize}
        type={input.type}
        name={input.name}
        placeholder={input.placeholder ? input.placeholder : input.name}
        onChange={(e) => formFunc.handleChange(e, input.type)}
        onBlur={formFunc.handleBlur}
        defaultValue={input.default}
        disabled={input.disable && true}
        scheme={colorScheme}
        error={hasError() || error}
        max={input.max}
        style={input.style}
      />
    </>
  );
};

export default StandardInput;

const ToolTip = styled.div`
  position: absolute;
  z-index: 1;
  background: #333;
  padding: 0.5rem 1rem 0.5rem 1rem;
  border: none;
  border-radius: 0.2rem;
  top: -2rem;
  left: 0%;
  box-shadow: 2px 2px 10px 1px rgba(0, 0, 0, 0.1);
  color: red;
  opacity: 0;
  transition: 1s;

  ${({ show }) =>
    show &&
    `
    opacity: 1;
  `}
`;
const InputElement = styled.input`
position: relative;
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
  padding-left: 1.5rem;
  background-color: transparent;
  // color: #efefef;

      ${({ isFullSize }) =>
        isFullSize &&
        `
        padding: .6rem;
        padding-left: 1.5rem;

`}

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
