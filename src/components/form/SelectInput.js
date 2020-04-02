import React from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const errorStyles = {
  // option: (provided, state) => ({
  //   ...provided,
  //   borderBottom: '1px dotted #eee',
  // }),
  control: (provided, state) => {
    return {
      ...provided,
      border: "0.5px solid red !important"
    };
  }
};

const SelectInput = ({ input, values, formFunc, errors }) => {
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
      placeholder={input.placeholder ? input.placeholder : ""}
      styles={errors[input.name] ? errorStyles : {}}
    />
  );
};

export default SelectInput;
