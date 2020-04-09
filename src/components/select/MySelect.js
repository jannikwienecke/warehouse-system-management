import React, { useState } from "react";
import PropTypes from "prop-types";
import { OutsideAlerter } from "./ClickAlerter";
import { Select } from "./Select";

export const MySelect = (props) => {
  const [outside, setOutside] = useState(null);

  return (
    <>
      <OutsideAlerter setOutside={setOutside}>
        <Select {...props} setOutside={setOutside} outside={outside} />
      </OutsideAlerter>
    </>
  );
};

MySelect.propTypes = {
  optionData: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number,
      label: PropTypes.string,
    })
  ),
};
