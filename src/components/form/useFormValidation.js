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

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
    handleSubmit();
  };

  const removeValue = (name) => {
    var oldValues = values;
    delete oldValues[name];
    setValues(oldValues);
  };

  const setMissingValues = (element) => {
    // console.log('ELEMENT = ', element);
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
