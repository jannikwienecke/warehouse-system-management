import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

export const AlertBanner = (props) => {
  const { err, warning, msg } = props;

  return (
    <AlertWrapper {...props}>
      {err} {warning} {msg}
    </AlertWrapper>
  );
};

AlertBanner.propTypes = {
  err: PropTypes.string,
  warning: PropTypes.string,
  msg: PropTypes.string,
};

// FormCard.propTypes = {
//   width: PropTypes.number,
//   headline: PropTypes.string
// };

const AlertWrapper = styled.div`
position: absolute;
background: red;
height: 3rem;
width: 75%;
top: 0;
left: 0;
text-align: left;
padding: 0.6rem;
padding-left: 8rem;
background: #ef5350;

color: #fff;
font-size: 1.05rem;
font-weight: bold;

${({ err }) =>
  err &&
  `
  background: #ef5350;

 `}

${({ warning }) =>
  warning &&
  `
  background: #ffab40;
 `}

 
${({ msg }) =>
  msg &&
  `
  background: #81c784;
 `}

`;
