import React, { useState, useEffect } from "react";
import { ListWrapper, ButtonWrapper } from "./StylesDetailView";
import { MyButton } from "../components/button/MyButton";
import { removeErrors } from "../functions/utils";
import ModularForm from "../components/form/ModularForm";

export const FormNewElement = ({
  arrInput,
  dataType,
  close,
  submit,
  missingValues,
}) => {
  const [values, setValues] = useState(null);

  const ignoreFields = [dataType, "id", "search"];

  const close_ = () => {
    removeErrors(arrInput);
    setTimeout(() => {
      close();
    }, 100);
  };

  const prepareArrInput = () => {
    const addErrorToInput = () => {
      if (!missingValues) return arrInput_;
      arrInput_.forEach((input) => {
        input["error"] = { nameList: missingValues };
      });
    };
    const filterArrInput = () => {
      arrInput_ = arrInput_
        .filter((input) => !ignoreFields.includes(input.name))
        .map((input) => {
          delete input["default"];
          return input;
        });
    };

    var arrInput_ = arrInput;

    filterArrInput();
    addErrorToInput();

    return arrInput_;
  };

  return (
    <>
      <ListWrapper>
        <ModularForm
          arrInput={prepareArrInput()}
          submitFunc={(parameter) => setValues(parameter)}
        />
      </ListWrapper>

      <ButtonWrapper>
        <MyButton color="#4caf50" onClick={() => submit(values)}>
          Anlegen
        </MyButton>
        <MyButton onClick={close_}>Abbrechen</MyButton>
      </ButtonWrapper>
    </>
  );
};
