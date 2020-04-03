import React, { useEffect, useState } from "react";
import styled from "styled-components";
import FormCard from "../../components/form/FormCard";
import ModularForm from "../../components/form/ModularForm";
import FormBridge from "./FormBridge";
import { sum, mockAPI } from "../../functions/utils";

const testBridges = [
  { value: "1", label: "Brücke Nr. 1" },
  { value: "2", label: "Brücke Nr. 138" },
  { value: "3", label: "Brücke Nr. 231" }
];

export const SelectBrückenStorage = ({ values, completeData }) => {
  const [show, setShow] = useState(false);
  const [bridges, setBridges] = useState([]);
  const [bridge, setBridge] = useState(null);
  const [openBridges, setOpenBridges] = useState(null);

  useEffect(() => {
    setTimeout(() => setShow(true), 1000);
    mockAPI(testBridges).then(res => setOpenBridges(res.data));
  }, []);

  useEffect(() => {
    if (bridge) {
      console.log("br === ", bridge);

      setOpenBridges(
        openBridges.filter(
          bridge_ => bridge_.value !== bridge.bridgeNumber.value
        )
      );
      validateQuantityBridge();
    }
  }, [bridge]);

  const getMissingQuantity = () => {
    if (bridges.length > 0) {
      const prevQuantities = bridges.map(bridge => bridge.quantity);
      const sumQuantity = sum(prevQuantities);
      return parseInt(values.quantity) - sumQuantity;
    } else {
      return parseInt(values.quantity);
    }
  };

  const validateQuantityBridge = () => {
    bridge.quantity = parseInt(bridge.quantity);
    if (getMissingQuantity() - bridge.quantity > 0) {
      setBridges([...bridges, bridge]);
      setBridge(null);
      setShow(false);
      setTimeout(() => setShow(true), 300);
    } else {
      values["bridges"] = [...bridges, bridge];
      completeData(values);
    }
  };

  console.log("open br == ", openBridges);

  if (!show) return <></>;
  return (
    <div>
      <FormBridge
        max={getMissingQuantity()}
        bridgeCounter={bridges.length + 1}
        setBridge={setBridge}
        openBridges={openBridges}
      />
    </div>
  );
};
