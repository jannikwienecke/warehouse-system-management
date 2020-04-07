import Popup from "../components/popup/Popup";
import React, { useEffect, useState } from "react";

export const Popup_ = ({ setValues, values, settings, children }) => {
  const [showModal, setShowModal] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (values) setShowModal(true);
  }, [values]);

  const _validate = () => {
    setShowModal(false);
    setValues(false);
    setIsSubmitted(true);
  };

  const _cancel = () => {
    setShowModal(false);
    setValues(false);
  };

  useEffect(() => {
    setShowModal(true);
  }, [values]);

  const childrenWithProps = React.Children.map(children, (child) =>
    React.cloneElement(child, { isSubmitted: isSubmitted })
  );

  return (
    <>
      <Popup
        visible={showModal}
        close={_cancel}
        marginTop="2rem"
        height={settings.height ? settings.height : "800px"}
        heightHeader={settings.heightHeader ? settings.heightHeader : "30%"}
        headline="Mein Popup"
        btnArr={[
          { func: _cancel, text: "Schließen" },
          { func: _validate, text: "Submit" },
        ]}
      >
        {childrenWithProps}
      </Popup>
    </>
  );
};
