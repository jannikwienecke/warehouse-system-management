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
      value: PropTypes.string,
      label: PropTypes.string,
    })
  ),
  defaultFilter: PropTypes.string,
  setValue: PropTypes.func,
  placeholder: PropTypes.string,
};
