import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { RowWrapper, RowNumber, RowStock } from "./RowStyles";
import { SmallPopupRow } from "./SmallPopupRow";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  small: {
    fontSize: "10px;",
  },
}));

const Row = (props) => {
  const {
    data,
    width,
    positionCompartment,
    direction,
    clickRow,
    showPopup,
    setShowPopup,
    showDetails,
  } = props;

  const [stock, setStock] = useState(data["stock"]);
  const classes = useStyles();

  const stockLevel = (rowData) => {
    return (stock / rowData["maxStock"]) * 100;
  };

  const handleClick = (target) => {
    console.log("click == ", data);

    if (target === "row") {
      clickRow(data);
    }
    if (target === "btn") {
      showDetails(data);
    }
  };

  return (
    <RowWrapper
      onClick={() => handleClick("row")}
      width={(data["width"] / width) * 100}
      hasStock={stock > 0}
      direction={direction}
    >
      <RowStock
        stock={stockLevel(data)}
        positionCompartment={positionCompartment}
        direction={direction}
      />

      <RowNumber
        stock={stockLevel(data)}
        positionCompartment={positionCompartment}
        direction={direction}
      >
        {data["id"]}

        <SmallPopupRow
          {...props}
          handleClick={handleClick}
          stockLevel={stockLevel}
          stock={stock}
          showPopup={showPopup === data["id"]}
        />
      </RowNumber>
    </RowWrapper>
  );
};

export default Row;
