import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

export const AlertBanner = (props) => {
  const { err, warning, msg } = props;
  const [destroy, setDestroy] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setDestroy(true);
    }, 5000);
  }, []);

  return (
    <AlertWrapper onClick={() => setDestroy(true)} destroy={destroy} {...props}>
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
position: relative;
background: red;
// width: 100%;
width: 100vw;
top: 0;
left: 0;
text-align: left;
padding: 0.8rem 0.1rem 0.8rem 0.6rem ;
padding-left: 8rem;
background: #ef5350;
z-index: 10;

color: #fff;
font-size: 1.05rem;
font-weight: bold;

${({ destroy }) =>
  destroy &&
  `
  display: none;

 `}

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
