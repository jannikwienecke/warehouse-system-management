import React, { Fragment, Component, useState, useEffect } from "react";
import { css } from "@emotion/core";
import { HashLoader } from "react-spinners";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export const Loader = ({ time, marginTop, color }) => {
  time = time ? time : 500;
  const [spinner, showSpinner] = useState(null);
  useEffect(() => {
    setTimeout(() => {
      showSpinner(true);
    }, time);
  }, []);

  if (spinner) {
    return (
      <div style={{ marginTop: marginTop }}>
        <HashLoader
          css={override}
          sizeUnit={"px"}
          size={100}
          color={color ? color : "#123abc"}
        />
      </div>
    );
  }
  return <></>;
};
