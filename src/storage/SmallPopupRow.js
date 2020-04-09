import React from "react";
import { MyButton } from "../components/button/MyButton";
import { RowPopup } from "./RowStyles";

export const SmallPopupRow = (props) => {
  const {
    data,
    position,
    direction,
    showPopup,
    setShowPopup,
    handleClick,
    stockLevel,
    stock,
  } = props;

  if (!showPopup) return null;

  console.log("DATA ROW = ", data);

  return (
    <RowPopup
      stock={stockLevel(data)}
      position={position}
      direction={direction}
    >
      <div>
        Lager 1 - Lagerplatz 4 Material: 227454 <br /> Anzahl : {stock}
      </div>

      <MyButton size="small" onClick={() => setShowPopup(null)}>
        Close
      </MyButton>

      <MyButton size="small" onClick={() => handleClick("btn")}>
        Details
      </MyButton>
    </RowPopup>
  );
};
