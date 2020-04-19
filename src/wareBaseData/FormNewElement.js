import React, { useState, useEffect } from "react";
import { Parent } from "../baseComponents/Parent";
import { ListWrapper, ButtonWrapper } from "./StylesDetailView";
import { MyButton } from "../components/button/MyButton";
import { extractIdentifier } from "../functions/middleware";
import { removeErrors } from "../functions/utils";

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
        <Parent
          form={{
            cardWrapper: false,
            marginTop: "2rem",
            arrInput: prepareArrInput(),
            hideSubmitBtn: true,
            middlewareParse: [extractIdentifier],
            requiredArguments: [""],
            apiFunc: (dispatch, parameter) => setValues(parameter),
          }}
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

// z-index: 1;
