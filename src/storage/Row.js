import React, { useState, useEffect } from "react";
import { RowWrapper, RowNumber, RowStock } from "./RowStyles";
import { SmallPopupRow } from "./SmallPopupRow";

const Row = (props) => {
  const {
    data,
    width,
    realPosition,
    direction,
    clickRow,
    showPopup,
    setShowPopup,
    showDetails,
    filter,
  } = props;

  // console.log("filter", filter);
  // console.log("data = ", data);
  // console.log("--------------");

  const stock = data["stock"];

  const stockLevel = (rowData) => {
    return (stock / rowData["maxStock"]) * 100;
  };

  const handleClick = (target) => {
    if (target === "row") {
      clickRow(data);
    }
    if (target === "btn") {
      showDetails(data);
    }
  };

  const isFiltered = () => {
    if (!filter) return null;
    return data.product_name.toLowerCase().includes(filter);
  };

  console.log("data", data);
  console.log("filter", filter);

  console.log(
    "data.product_name.includes(filter)",
    data.product_name.includes(filter)
  );

  return (
    <RowWrapper
      onClick={() => handleClick("row")}
      width={(data["width"] / width) * 100}
      hasStock={stock > 0}
      direction={direction}
      isFiltered={isFiltered()}
    >
      <RowStock
        stock={stockLevel(data)}
        realPosition={realPosition}
        direction={direction}
        isFiltered={isFiltered()}
      />

      <RowNumber
        stock={stockLevel(data)}
        realPosition={realPosition}
        direction={direction}
      >
        {data["row_id"]}

        <SmallPopupRow
          {...props}
          handleClick={handleClick}
          stockLevel={stockLevel}
          stock={stock}
          showPopup={showPopup === data["row_id"]}
        />
      </RowNumber>
    </RowWrapper>
  );
};

export default Row;
