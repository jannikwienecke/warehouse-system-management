import React from "react";
import PropTypes from "prop-types";

import { Form } from "react-bootstrap";

import useFormValidation from "./useFormValidation";
import valueValidation from "./formValuesValidation";
import ButtonElement from "./ButtonElement";
import FormElement from "./FormElement";
import styled from "styled-components";
import FormCard from "./FormCard";

const ModularForm = (props) => {
  var {
    arrInput,
    submitFunc,
    requiredArguments,
    authFuncArr,
    arrBtns,
    headline,
    colorScheme,
  } = props;

  const setInitialState = () => {
    var state = {};
    arrInput.forEach((element, index) => {
      if (element.type === "button") return;
      state[element.name] = element.default;
    });
    return state;
  };

  const { values, errors, formFunc } = useFormValidation(
    setInitialState(),
    valueValidation,
    submitFunc,
    requiredArguments,
    authFuncArr,
    arrInput
  );

  return (
    <Form>
      <Header>
        <Headline scheme={colorScheme}>{headline}</Headline>
        <ButtonElement
          scheme={colorScheme}
          arrBtns={arrBtns}
          formFunc={formFunc}
        />
      </Header>

      <FormElement
        formFunc={formFunc}
        arrInput={arrInput}
        errors={errors}
        values={values}
        scheme={colorScheme}
      />
    </Form>
  );
};

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
`;

const Headline = styled.div`
  color: #dedede;
  font-size: 2.5rem;
  /* padding: 1rem; */
  text-align: left;

  ${({ scheme }) =>
    scheme === "dark" &&
    `
  color: #3f3f3f;
`}

  ${({ scheme }) =>
    scheme === "grey" &&
    `
  color: #3f51b5;
`}
`;

export default ModularForm;
ModularForm.propTypes = {
  headline: PropTypes.string,
  colorScheme: PropTypes.string,
  arrInput: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      size: PropTypes.number,
    })
  ),
  submitFunc: PropTypes.func,
  requiredArguments: PropTypes.array,
  authFuncArr: PropTypes.array,
  btns: PropTypes.shape({
    btnArr: PropTypes.arrayOf(
      PropTypes.shape({
        func: PropTypes.func,
        size: PropTypes.number,
        variant: PropTypes.string,
        text: PropTypes.string,
        isSubmitFunc: PropTypes.bool,
      })
    ),
    position: PropTypes.string,
  }),
};
