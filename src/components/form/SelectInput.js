import React, { useState, useEffect } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useSelector } from "react-redux";
import { usePrevious } from "../../functions/hooks.js/usePrevious";

const errorStyles = {
  control: (provided, state) => {
    return {
      ...provided,
      border: "0.5px solid red !important",
    };
  },
};

const SelectInput = (props) => {
  const { input, values, formFunc, errors, isFullSize } = props;

  const state = useSelector((state) => state);
  const prevValues = usePrevious(values);
  const [loading, setLoading] = useState(false);

  const _parse = () => {
    if (input.setOptions) {
      input.options = input.setOptions(state, input.name);
    }

    input.options.map((option) => {
      option["value"] = option[input.identifier];
      option["label"] = option[input.labelName];
      return option;
    });

    if (input.default && typeof input.default === "object") {
      if (input.options.length === 0) {
        input.default = null;
        return;
      }
    }

      if (input.default && typeof input.default === "object") {
        input.default["value"] = input.default[input.identifier];
        input.default["label"] = input.default[input.labelName];
      }
    }
  

  if (input.identifier) {
    _parse();
  }

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

  let className = input.class ? input.class : "formInput";
  className = isFullSize ? className + " fullSize" : className;

 
  if (values) {
    var hasValues = Object.keys(values).find((name) => {
      return values[name] && values[name].id;
    });
  } else {
    var hasValues = false;
  }
  if (!hasValues) {
    return (
      <>
        <Select
          components={makeAnimated()}
          className={className}
          name={input.name}
          options={input.options}
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
  } else {
    return (
      <Select
        components={makeAnimated()}
        className={className}
        name={input.name}
        value={{
          value: values[input.name].id,
          label: values[input.name].name,
        }}
        options={input.options}
        onBlur={formFunc.handleBlur}
        onChange={(data) => formFunc.handleInputChange(data, input.name)}
        isMulti={input.multiSelect}
        defaultValue={input.default}
        isDisabled={input.disable && true}
        placeholder={input.placeholder ? input.placeholder : ""}
        styles={hasError() ? errorStyles : {}}
      />
    );
  }
};

export default SelectInput;
