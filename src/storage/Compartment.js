import React, { useState, useEffect } from "react";

import { test_storage } from "./data";
import Row from "./Row";
import { CompartmentWrapper } from "./CompartmentWrapper";

const Compartment = (props) => {
  const { compartment, setShowPopup, showPopup, clickRow, showDetails } = props;
  const { name, width, direction, realPosition } = compartment;

  const getStorageList = () => {
    return Object.entries(test_storage)
      .filter(([index, val]) => val["compartment"] === name)
      .map(([index, val]) => {
        return (
          <Row
            key={index}
            data={val}
            widthCompartment={width}
            positionCompartment={realPosition}
            directionCompartment={direction}
            showPopup={showPopup}
            setShowPopup={setShowPopup}
            clickRow={clickRow}
            showDetails={showDetails}
          />
        );
      });
  };

  return <CompartmentWrapper {...props}>{getStorageList()}</CompartmentWrapper>;
};
export default Compartment;
