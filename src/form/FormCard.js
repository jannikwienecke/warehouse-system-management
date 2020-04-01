import React from "react";
import PropTypes from "prop-types";

import styled from "styled-components";

const FormCard = ({ children, width, marginTop, marginBottom, color }) => {
  return (
    <FormCardWrapper
      width={width}
      marginBottom={marginBottom}
      marginTop={marginTop}
      color={color}
    >
      {children}
    </FormCardWrapper>
  );
};

export default FormCard;

const FormCardWrapper = styled.div`
  padding: 1.5rem;
  border: 1px solid #3f51b5;
  border-radius: 0.45rem;
  margin: 1rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
  transition: 0.3s;
  margin: 0 auto;
  background-color: #3f51b5;

  :hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }



  ${({ color }) =>
    color &&
    `
    background-color: ${color};
    border: 1px solid ${color};
  `}
  
${({ marginTop }) =>
  marginTop &&
  `
    margin-top: ${marginTop}rem;
  `}

${({ width }) =>
  width &&
  `
    width: ${width}%
  `}
  
${({ marginBottom }) =>
  marginBottom &&
  `
    margin-bottom: ${marginBottom}rem;
  `}

`;

FormCard.propTypes = {
  width: PropTypes.number,
  headline: PropTypes.string
};
