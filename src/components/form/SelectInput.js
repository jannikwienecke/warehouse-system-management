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
      border: "0.5px solid red !important",
    };
  },
};

const SelectInput = ({ input, values, formFunc, errors }) => {
  return (
    <>
      <Select
        components={makeAnimated()}
        className="formInput"
        name={input.name}
        options={input.options}
        value={values.name}
        onBlur={formFunc.handleBlur}
        onChange={(data) => formFunc.handleInputChange(data, input.name)}
        isMulti={input.multiSelect}
        defaultValue={input.default}
        isDisabled={input.disable && true}
        placeholder={input.placeholder ? input.placeholder : ""}
        styles={errors[input.name] ? errorStyles : {}}
      />

      {/* <InputLabel htmlFor={input.name}>Age</InputLabel>
      <Select
        style={{ width: "100%" }}
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
        value={10}
        onChange={() => console.log("sekect....")}
        placeholder="HALLo"
        inputProps={{
          name: input.name,
          id: input.name
        }}
      >
        {input.options.map((option, index) => {
          console.log("option", option);

          return (
            <MenuItem key={index} value={option.value}>
              {option.label}
            </MenuItem>
          );
        })}

        {/* <MenuItem value={10}>Ten</MenuItem> */}
      {/* <MenuItem value={20}>Twenty</MenuItem> */}
      {/* <MenuItem value={30}>Thirty</MenuItem> */}
    </>
  );
};

export default SelectInput;
