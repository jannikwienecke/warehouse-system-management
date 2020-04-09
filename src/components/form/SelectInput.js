import React from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const errorStyles = {
  control: (provided, state) => {
    return {
      ...provided,
      border: "0.5px solid red !important",
    };
  },
};

const SelectInput = ({ input, values, formFunc, errors }) => {
  const _parse = () => {
    // console.log("input = ", input);
    // console.log("options= ", input.options);

    input.options.map((option) => {
      option["value"] = option[input.identifier];
      option["label"] = option[input.labelName];
      return option;
    });

    if (input.default && typeof input.default === "object") {
      input.default["value"] = input.default[input.identifier];
      input.default["label"] = input.default[input.labelName];
    }
  };

  if (input.identifier) _parse();

  const hasError = () => {
    const name = input.name;
    if (errors[name]) {
      return true;
    }

    const hasFormValidationErr = input.error;
    if (hasFormValidationErr && input.error.nameList) {
      const nameInErrorList = input.error.nameList.includes(name);
      if (nameInErrorList) {
        return true;
      }
    }
  };

  return (
    <>
      <Select
        components={makeAnimated()}
        className={input.class ? input.class : "formInput"}
        name={input.name}
        options={input.options}
        value={values.name}
        onBlur={formFunc.handleBlur}
        onChange={(data) => formFunc.handleInputChange(data, input.name)}
        isMulti={input.multiSelect}
        defaultValue={input.default}
        isDisabled={input.disable && true}
        placeholder={input.placeholder ? input.placeholder : ""}
        styles={hasError() ? errorStyles : {}}
      />
    </>
  );
};

export default SelectInput;
