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
    if (arrInput) runFetchDataFunctions();
  }, [arrInput]);

  useEffect(() => {
    validateIfAllOptionsAreLoaded();
  }, [optionsObj]);

  const validateIfAllOptionsAreLoaded = () => {
    if (!optionsObj || !arrInput) {
      return;
    }
    var optionMissing = false;
    arrInput.forEach((input) => {
      var options = optionsObj[input.name];
      if (!options && input.type === "input") {
        optionMissing = true;
      }
    });
    if (!optionMissing) {
      setOptionsLoaded(true);
      setLoading(false);
    } else {
      setLoading(true);
      setTimeout(() => {
        runFetchDataFunctions();
      }, 100);
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
            return;
          }

          const input = arrInput.find((input) => input.name === option.name);
          if (input.filter) {
            option.data = input.filter(option.data);
          }

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
        // console.log("INPUT +++ ", input);

        if (!input.func) return;
        if (input.name in optionsObj) return; //input was fetched already

        return new Promise((resolve) => {
          const response = input.func(state, input);
          // console.log("RESPONSE = ", response);

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
      formValidation(data);
    } catch (e) {
      if (e !== ValidationException && e !== ParseException) {
        console.log("run Middleware Error Form.js", e);
        throw e;
      } else {
        setError(e);
      }
    }
  };

  const formValidation = (data) => {
    if (middlewareValidation && middlewareValidation.length > 0) {
      runMiddleware(middlewareValidation, data);
    } else if (middlewareParse && middlewareParse.length > 0) {
      runMiddleware(middlewareParse, data);
    } else {
      props.apiFunc(dispatch, data);
    }
  };

  const allOptionsAreSet = () => {
    if (!arrInput) return false;
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

const FormElement = (props) => {
  const {
    arrInput,
    optionsLoaded,
    isLoading,
    optionsObj,
    cardWrapper,
    error,
    formWidth,
    formTopMargin,
    formColor,
    classOverride,
  } = props;

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
      if (error) {
        input.error = error;
      }
      input.class = classOverride;
    });

    setOptionsReady(true);
  };

  if (!optionsReady || arrInput.length == 0)
    return (
      <>
        <Loader time={1} />
      </>
    );

  arrInput.forEach((input) => {
    if (error) input.error = error;
  });

  return (
    <>
      {error && <AlertBanner err={error.msg} />}
      {cardWrapper ? (
        <FormCard
          width={formWidth ? formWidth : 90}
          marginTop={formTopMargin ? formTopMargin : 2}
          color={formColor ? formColor : "#e3e3e3"}
        >
          <FormRaw {...props} />
        </FormCard>
      ) : (
        <FormRaw {...props} />
      )}
    </>
  );
};

const FormRaw = ({
  formValidation,
  isLoading,
  arrInput,
  formTitle,
  requiredArguments,
  colorScheme,
  btnSize,
  btnVariant,
  btnText,
  btnPosition,
  formColor,
  optionsLoaded,
  hideSubmitBtn,
  replaceFuncSubmit,
}) => {
  return (
    <ModularForm
      requiredArguments={requiredArguments}
      colorScheme={colorScheme ? colorScheme : "grey"}
      headline={formTitle}
      arrInput={arrInput}
      submitFunc={(data) => formValidation(data)}
      arrBtns={
        hideSubmitBtn
          ? null
          : {
              btns: [
                {
                  size: btnSize ? btnSize : "md",
                  variant: btnVariant ? btnVariant : "dark",
                  text: btnText ? btnText : "Suchen",
                  isSubmitFunc: replaceFuncSubmit ? false : true,
                  disabled: isLoading,
                  func: replaceFuncSubmit,
                },
              ],

              justifyContent: "flex-end",
              position: btnPosition ? btnPosition : "top",
            }
      }
    />
  );
};
