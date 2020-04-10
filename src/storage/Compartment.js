import React, { useState, useEffect } from "react";
import { warehouse } from "./data";
import Row from "./Row";
import { CompartmentWrapper } from "./CompartmentWrapper";

const Compartment = (props) => {
  const isFiltered = (row) => {
    return row.compartment === props.compartmentZoom || !props.compartmentZoom;
  };

  const isCompartment = (row) => {
    return row.compartment === props.compartment.name;
  };

  const getStorageList = () => {
    return props.storage
      .filter((row) => isCompartment(row) && isFiltered(row))
      .map((row, index) => (
        <Row {...props} {...props.compartment} key={index} data={row} />
      ));
  };

  return <CompartmentWrapper {...props}>{getStorageList()}</CompartmentWrapper>;
};
export default Compartment;
