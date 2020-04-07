import React, { useState, useEffect } from "react";
import ModularModal from "../components/modal/Modal";

export const Modal = ({
  setValues,
  values,
  validate,
  headline,
  children,
  btnList,
  setClickRowComponent,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  useEffect(() => {
    if (values) setShowModal(true);
  }, [values]);

  const _validate = () => {
    // setShowModal(false);
    // validate(true);
    setIsSubmitted(true);
  };

  const _cancel = () => {
    // console.log("CANCEL......");

    setShowModal(false);
    setValues(false);
    // setClickRowComponent(null);
  };

  const childrenWithProps = React.Children.map(children, (child) =>
    React.cloneElement(child, { isSubmitted: isSubmitted })
  );

  // console.log("btnLIST = ", btnList);
  var btnArr = [
    {
      text: "Cancel",
      variant: "outline-dark",
      func: _cancel,
    },
    {
      text: "OK",
      variant: "dark",
      func: _validate,
    },
  ];

  if (btnList) {
    btnArr = btnArr.concat(btnList);
  }

  return (
    <>
      <ModularModal
        close={() => _cancel}
        visible={showModal}
        headline={headline ? headline : ""}
        btnArr={btnArr}
      >
        {childrenWithProps}
      </ModularModal>
    </>
  );
};
