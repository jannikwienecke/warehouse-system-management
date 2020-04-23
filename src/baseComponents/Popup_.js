import Popup from "../components/popup/Popup";
import React, { useEffect, useState } from "react";

export const Popup_ = ({
  setValues,
  values,
  height,
  heightHeader,
  children,
  header,
  btnList,
  hideSubmitBtn,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [runFunc, setRunFunc] = useState(null);

  useEffect(() => {
    if (values) setShowModal(true);
  }, [values]);

  const _validate = () => {
    setIsSubmitted(true);
    setTimeout(() => {
      setShowModal(false);
      setValues(false);
    });
  };

  const _cancel = () => {
    setShowModal(false);
    setValues(false);
  };

  useEffect(() => {
    setShowModal(true);
  }, [values]);

  if (hideSubmitBtn) {
    var defaultBtns = [{ func: _cancel, text: "Schließen" }];
  } else {
    var defaultBtns = [
      { func: _cancel, text: "Schließen" },
      { func: _validate, text: "Submit" },
    ];
  }

  const wrapper = (func) => {
    const inner = () => {
      setRunFunc(func.triggerName);
      func.func();
    };
    return {
      func: inner,
      text: func.text,
    };
  };

  const childrenWithProps = React.Children.map(children, (child) =>
    React.cloneElement(child, { isSubmitted, runFunc, setValues, setRunFunc })
  );

  const getBtns = () => {
    if (btnList) {
      btnList = btnList.map((btnFunc) => {
        return wrapper(btnFunc);
      });

      return defaultBtns.concat(btnList);
    } else {
      return defaultBtns;
    }
  };

  return (
    <>
      <Popup
        visible={showModal}
        close={_cancel}
        marginTop="2rem"
        height={height ? height : "800px"}
        heightHeader={heightHeader ? heightHeader : "30%"}
        headline={header ? header : "Details"}
        btnArr={getBtns()}
      >
        {childrenWithProps}
      </Popup>
    </>
  );
};
