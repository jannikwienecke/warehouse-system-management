import React, { useState, useEffect } from "react";
import { test_storage } from "./data";
import Row from "./Row";
import { CompartmentWrapper } from "./CompartmentWrapper";

const Compartment = (props) => {
  const filterByZoom = (test_storage) => {
    if (!props.compartmentZoom) return test_storage;
    return Object.entries(test_storage)
      .filter(([index, val]) => {
        return val["compartment"] === props.compartmentZoom;
      })
      .map(([index, val]) => {
        return val;
      });
  };

  const getStorageList = () => {
    const filteredStorage = filterByZoom(test_storage);

    return Object.entries(filteredStorage)
      .filter(([index, val]) => val["compartment"] === props.compartment.name)

      .map(([index, val]) => {
        return <Row {...props} {...props.compartment} key={index} data={val} />;
      });
  };

  return <CompartmentWrapper {...props}>{getStorageList()}</CompartmentWrapper>;
};
export default Compartment;
