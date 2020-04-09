import React from "react";
import Popup from "../components/popup/Popup";

export const PopupRowView = ({ visible, setVisible }) => {
  if (!visible) return null;

  return (
    <Popup
      visible={visible}
      close={() => setVisible(false)}
      marginTop="2rem"
      height={"300px"}
      heightHeader="40%"
      headline="Mein Popup"
      btnArr={[{ func: () => console.log("click btn"), text: "Click Me" }]}
    >
      THIS IS A CHILDREN PROP
    </Popup>
  );
};
