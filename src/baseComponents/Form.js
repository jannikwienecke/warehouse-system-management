import React, { useState, useEffect } from "react";
import ModularForm from "../components/form/ModularForm";
import FormCard from "../components/form/FormCard";
import { mockAPI, copy } from "../functions/utils";
import { AlertBanner } from "../common/AlertBanner";
import { EXCEPTIONS } from "../baseComponents/base";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../common/Loader";

export const Form = (props) => {
  const { arrInput, middlewareValidation, middlewareParse, setLoading } = props;
  const { ParseException, ValidationException } = EXCEPTIONS;

  const [optionsObj, setOptionsObject] = useState({});
  const [error, setError] = useState(null);
  const [optionsLoaded, setOptionsLoaded] = useState(false);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    runFetchDataFunctions();
  }, []);

  useEffect(() => {
    validateIfAllOptionsAreLoaded();
  }, [optionsObj]);

  const validateIfAllOptionsAreLoaded = () => {
    if (!optionsObj) {
      return;
    }
    var optionMissing = false;
    arrInput.forEach((input) => {
      const options = optionsObj[input.name];
      if (!options && input.type === "input") {
        optionMissing = true;
      }
    });
    if (!optionMissing) {
      setOptionsLoaded(true);
      setLoading(false);
    } else {
      // console.log("s");

      setLoading(true);
      setTimeout(() => {
        runFetchDataFunctions();
      }, 500);
    }
  };

  const runFetchDataFunctions = () => {
    var promise = setOptionStates();
    promise.then((promises) => {
      var obj = {};
      Promise.all(promises).then((options) => {
        options.forEach((option) => {
          if (!option) return;
          if (!option || !option.data) {
            console.log("OPTION EMPTY = ", option);

            return;
          }
          console.log("arrinput", arrInput);
          console.log("option", option);

          obj[option.name] = option.data;
        });

        setOptionsObject({ ...optionsObj, ...obj });
      });
    });
  };

  const setOptionStates = () => {
    return new Promise((resolve) => {
      var error = false;
      const promises = arrInput.map((input) => {
        if (!input.func) return;
        if (input.name in optionsObj) return; //input was fetched already

        return new Promise((resolve) => {
          const response = input.func(state);
          if (!response.then) {
            resolve(response);
          } else {
            response.then((data) => {
              resolve(data);
            });
          }
          if (response.data) {
            response.then((data) => {
              resolve(data);
            });
          }
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
    props.apiFunc(dispatch, data);
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
        optionsLoaded={optionsLoaded}
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
  optionsLoaded,
}) => {
  const [optionsReady, setOptionsReady] = useState(false);

  useEffect(() => {
    if (optionsLoaded) {
      setOptions();
    }
  }, [optionsLoaded]);

  const setOptions = () => {
    arrInput.forEach((input) => {
      if (input.setOptions) {
        input.options = input.setOptions(optionsObj, input.name);
      }
      input.error = error;
    });

    setOptionsReady(true);
  };

  if (!optionsReady)
    return (
      <>
        <Loader />
      </>
    );

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
