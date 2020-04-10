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
    clickRowFunc,
  } = props;

  if (!showPopup) return null;

  console.log("clickRowFunc", clickRowFunc);

  return (
    <RowPopup
      stock={stockLevel(data)}
      position={position}
      direction={direction}
    >
      <div>
        Lager {data.warehouse_id} Lagerplatz {data.row_id}
        <br />
        {data.stock > 0 ? (
          <>
            Material: {data.product_id} <br />
            Anzahl : {data.stock} Paletten
          </>
        ) : (
          <>--Leer--</>
        )}
      </div>

      <MyButton size="small" onClick={() => setShowPopup(null)}>
        Close
      </MyButton>

      {!clickRowFunc ? (
        <MyButton size="small" onClick={() => handleClick("btn")}>
          Details
        </MyButton>
      ) : (
        <MyButton
          size="small"
          onClick={() => {
            setShowPopup(false);
            clickRowFunc.func(data);
          }}
        >
          {clickRowFunc.text}}
        </MyButton>
      )}
    </RowPopup>
  );
};
