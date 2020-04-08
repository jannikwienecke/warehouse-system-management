import React, { useEffect, useState } from "react";
import styled from "styled-components";
import FormCard from "../../components/form/FormCard";
import ModularForm from "../../components/form/ModularForm";
import FormBridge from "./FormBridge";
import { sum, mockAPI } from "../../functions/utils";
import { fetchStorageBridges } from "../../baseComponents/store/actions";
import { useSelector, useDispatch } from "react-redux";
import { selectBridge } from "../store";

export const SelectBrückenStorage = ({ values, completeData }) => {
  const [show, setShow] = useState(false);
  const [bridges, setBridges] = useState([]);
  const [bridge, setBridge] = useState(null);

  const storageBridges = useSelector((state) => state.base.storageBridges);

  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => setShow(true), 500);
    dispatch(fetchStorageBridges());
  }, []);

  useEffect(() => {
    if (bridge) {
      validateQuantityBridge();
      dispatch(selectBridge(storageBridges, bridge, values));
    }
  }, [bridge]);

  const getMissingQuantity = () => {
    if (bridges.length > 0) {
      const prevQuantities = bridges.map((bridge) => bridge.quantity);
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

  if (!show) return <></>;
  return (
    <div>
      <FormBridge
        max={getMissingQuantity()}
        bridgeCounter={bridges.length + 1}
        setBridge={setBridge}
        openBridges={storageBridges}
      />
    </div>
  );
};
