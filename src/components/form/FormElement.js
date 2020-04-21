import React from "react";
import { Button, Row, Col, Form } from "react-bootstrap";
import styled from "styled-components";
import SelectInput from "./SelectInput";
import StandardInput from "./StandardInput";

import Select from "react-select";

const ERROR_MISSING_DATA = "NICHT ALLE NÖTIGEN DATEN ÜBERGEBEN";

const employee = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const FormElement = (props) => {
  const { arrInput } = props;
  if (!arrInput) return <></>;

  console.log(props);
  console.log("arrInput.lengt", arrInput.length);

  const isFullSize = props.fullSize && arrInput.length < 6 ? true : false;

  const formElements = arrInput.map((input, index) => {
    console.log(input);

    if (!input || !input.name || !input.type) {
      console.log(ERROR_MISSING_DATA);
      throw new Error("ERROR - No Name or Type");
    }

    return (
      <InputHolder key={index} size={input.size} isFullSize={isFullSize}>
        {input.label ? input.label : ""}
        {input.type === "input" ? (
          <SelectInput {...props} input={input} isFullSize={isFullSize} />
        ) : (
          <StandardInput {...props} input={input} isFullSize={isFullSize} />
        )}
      </InputHolder>
    );
  });

  return (
    <>
      <FormHolder isFullSize={isFullSize}>{formElements}</FormHolder>
    </>
  );
};

export default FormElement;

const InputHolder = styled.div`
  // width: 10%;
  height: 30px;
  margin-bottom: 1rem;
  border: none;

  ${({ size }) =>
    size &&
    `
    width: ${(size / 12) * 100}%;
  `}

  ${({ isFullSize }) =>
    isFullSize &&
    `
    width: 60%;
    margin: .7rem;
  `}
`;

const FormHolder = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  flex-direction: row;
  width: 100%;

  ${({ justifyContent }) =>
    justifyContent &&
    `
    justify-content: ${justifyContent}
  `}

  ${({ isFullSize }) =>
    isFullSize &&
    `
    width: 100%;
    justify-content: space-around;
  `}
`;

// const FormLabel = styled.div`
//   font-size: 0.9rem;
//   text-align: left;
//   padding-left: 1rem;
// `;
