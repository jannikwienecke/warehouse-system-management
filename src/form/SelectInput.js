import React from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const SelectInput = ({ input, values, formFunc }) => {
  console.log(input.options);
  return (
    <Select
      components={makeAnimated()}
      className="formInput"
      name={input.name}
      options={input.options}
      value={values.name}
      onBlur={formFunc.handleBlur}
      onChange={data => formFunc.handleInputChange(data, input.name)}
      isMulti={input.multiSelect}
      defaultValue={input.defaultValue}
      isDisabled={input.disable && true}
    />
  );
};

export default SelectInput;
