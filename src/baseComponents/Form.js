import React, { useState, useEffect } from "react";
import ModularForm from "../components/form/ModularForm";
import FormCard from "../components/form/FormCard";
import { mockAPI, copy } from "../functions/utils";
import { AlertBanner } from "../common/AlertBanner";
import { EXCEPTIONS } from "../baseComponents/base";

export const Form = (props) => {
  const { arrInput, middlewareValidation, middlewareParse } = props;
  const { ParseException, ValidationException } = EXCEPTIONS;

  const [optionsObj, setOptionsObject] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    runFetchDataFunctions();
  }, []);

  const runFetchDataFunctions = () => {
    var promise = setOptionStates();
    promise.then((promises) => {
      var obj = {};
      Promise.all(promises).then((options) => {
        options.forEach((option) => {
          if (!option) return;
          obj[option.name] = option.data;
        });
        setOptionsObject(obj);
      });
    });
  };

  const setOptionStates = () => {
    return new Promise((resolve) => {
      const promises = arrInput.map((input) => {
        if (!input.func) return;
        return new Promise((resolve) => {
          const x = input.func(input.name);
          x.then((data) => {
            resolve(data);
          });
        });
      });

      resolve(promises);
    });
  };

  const runMiddleware = (middlewareStack, data) => {
    if (middlewareStack.length === 0) return;
    const middleware = middlewareStack.pop();

    try {
      middleware(data);
    } catch (e) {
      if (e !== ValidationException && e !== ParseException) {
        console.log("run Middleware Error Form.js", e);
        throw e;
      } else {
        setError(e);
      }
    }
    formValidation(data);
  };

  const formValidation = (data) => {
    if (middlewareValidation) {
      runMiddleware(middlewareValidation, data);
    }

    if (middlewareParse) {
      runMiddleware(middlewareParse, data);
    }

    props.setApiRequest(data);
  };

  const allOptionsAreSet = () => {
    if (!optionsObj) return false;

    var isValid = true;
    arrInput.forEach((input) => {
      if (input.type == "input") {
        if (!(input.name in optionsObj)) {
          isValid = false;
        }
      }
    });
    if (isValid) return true;
  };

  if (!allOptionsAreSet()) return <></>;

  return (
    <div>
      <FormElement
        optionsObj={optionsObj}
        arrInput={arrInput}
        formValidation={formValidation}
        error={error}
        {...props}
      />
    </div>
  );
};

const FormElement = ({
  formValidation,
  error,
  isLoading,
  arrInput,
  optionsObj,
  formTitle,
  requiredArguments,
  colorScheme,
  btnSize,
  btnVariant,
  btnText,
  btnPosition,
  formColor,
  formTopMargin,
  formWidth,
}) => {
  arrInput.forEach((input) => {
    if (input.setOptions) {
      input.options = input.setOptions(optionsObj, input.name);
    }
    input.error = error;
  });

  return (
    <>
      {error && <AlertBanner err={error.msg} />}
      <FormCard
        width={formWidth ? formWidth : 90}
        marginTop={formTopMargin ? formTopMargin : 2}
        color={formColor ? formColor : "#e3e3e3"}
      >
        <ModularForm
          requiredArguments={requiredArguments}
          colorScheme={colorScheme ? colorScheme : "grey"}
          headline={formTitle}
          arrInput={arrInput}
          submitFunc={(data) => formValidation(data)}
          arrBtns={{
            btns: [
              {
                size: btnSize ? btnSize : "md",
                variant: btnVariant ? btnVariant : "dark",
                text: btnText ? btnText : "Suchen",
                isSubmitFunc: true,
                disabled: isLoading,
              },
            ],

            justifyContent: "flex-end",
            position: btnPosition ? btnPosition : "top",
          }}
        />
      </FormCard>
    </>
  );
};
