import React from "react";
import ModularForm from "../components/form/ModularForm";

export const UpdateFormElement = (props) => {
  const { apiFunc, arrInput } = props;
  return (
    <div>
      <ModularForm {...props} arrInput={arrInput} submitFunc={apiFunc} />
    </div>
  );
};
