import { useState, useEffect } from "react";

function useFormValidation(
  state,
  validateAuth,
  submitFunc,
  requiredArguments,
  authFuncArr,
  arrInput
) {
  const [values, setValues] = useState(state);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isSubmitting) {
      let noErrors = Object.keys(errors).length === 0;
      if (noErrors) {
        submitFunc(values);
        setSubmitting(false);
      } else {
        setSubmitting(false);
      }
    }
  }, [errors]);

  const handleChange = (e, type) => {
    if (type && type === "number") {
      var val = parseInt(e.target.value);
    } else {
      var val = e.target.value;
    }
    setValues({
      ...values,
      [e.target.name]: val,
    });
  };

  useEffect(() => {
    if (values) {
      const hasValues = Object.keys(values).find((key) => values[key]);
      if (hasValues) handleSubmit();
    }
  }, [values]);

  const removeValue = (name) => {
    var oldValues = values;
    delete oldValues[name];
    setValues(oldValues);
  };

  const setMissingValues = (element) => {
    var newValues = values;
    newValues[element.name] = element.defaultValues;
    setValues(newValues);
  };

  const handleInputChange = (data, name) => {
    var e = {
      target: {
        value: data,
        name,
      },
    };

    handleChange(e);
  };

  const handleBlur = () => {
    let validationErrors = validateAuth(values, requiredArguments, authFuncArr);
    setErrors(validationErrors);
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    let validationErrors = validateAuth(values, requiredArguments, authFuncArr);

    setSubmitting(true);
    setErrors(validationErrors);
  };

  const formFunc = {
    handleBlur,
    handleChange,
    handleInputChange,
    handleSubmit,
  };

  return {
    values,
    errors,
    isSubmitting,
    setMissingValues,
    removeValue,
    formFunc,
  };
}

export default useFormValidation;
