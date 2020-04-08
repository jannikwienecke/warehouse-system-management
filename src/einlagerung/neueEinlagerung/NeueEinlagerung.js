import React, { useState, useEffect } from "react";
import { SUB_PAGES } from "../data";
import Form from "./Form";
import { Container } from "../../components/Container/Container";
import styled from "styled-components";
import { ModalValidationValues } from "./ModalValidationValues";
import SelectStorage from "./SelectStorage";
import SummaryPopup from "./SummaryPopup";
import { HeaderElement } from "../../common/HeaderElement";

export const NeueEinlagerung = ({ setType, type }) => {
  const [values, setValues] = useState(null);
  const [isValidated, validate] = useState(null);
  const [completedData, completeData] = useState(null);
  const [isApproved, approveOrder] = useState(null);
  const [approveAndPrintOrder, setApproveAndPrintOrder] = useState(null);
  const [cancelOrder, setCancelOrder] = useState(null);

  useEffect(() => {
    if (cancelOrder) setType(null);
    console.log("CANCEL ORDER - CALL API HERE", completedData);
    // NEED TO RELOAD STORAGE BRIDGES FROM DB COS REDUX STATE WAS UPDATED ALREADY
  }, [cancelOrder]);

  useEffect(() => {
    console.log("APPROVE....");

    if (isApproved) saveOrder();
  }, [isApproved]);

  useEffect(() => {
    if (approveAndPrintOrder) {
      saveOrder();
      printOrder();
    }
  }, [approveAndPrintOrder]);

  const saveOrder = () => {
    console.log("SAVE ORDER - CALL API HERE", completedData);
    setType(null);
  };

  const printOrder = () => {
    console.log("PRINT ORDER - CALL API HERE", completedData);
    setType(null);
  };

  return (
    <>
      <ModalValidationValues
        values={values}
        setValues={setValues}
        validate={validate}
      />

      <HeaderElement setType={setType} type={type} sub_pages={SUB_PAGES} />

      <Container>
        {!isValidated && <Form setValues={setValues} />}
        {isValidated && !completedData && (
          <SelectStorage values={values} completeData={completeData} />
        )}

        {completedData && (
          <SummaryPopup
            summary={completedData}
            cancel={setCancelOrder}
            approveAndPrint={setApproveAndPrintOrder}
            approve={approveOrder}
          />
        )}
      </Container>
    </>
  );
};
