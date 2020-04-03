import React, { useState, useEffect } from "react";
import { Header } from "../../components/header/Header";
import { ButtonPageNav } from "../../components/button/ButtonPageNav";
import { Navigation } from "../../components/navigation/Navigation";
import { SUB_PAGES } from "../data";
import Form from "./Form";
import { Container } from "../../components/Container/Container";
import styled from "styled-components";
import { ModalValidationValues } from "./ModalValidationValues";
import SelectStorage from "./SelectStorage";
import SummaryPopup from "./SummaryPopup";

export const NeueEinlagerung = ({ setType, type }) => {
  const [values, setValues] = useState(null);
  const [isValidated, validate] = useState(null);
  const [completedData, completeData] = useState(null);
  const [isApproved, approveOrder] = useState(null);
  const [approveAndPrintOrder, setApproveAndPrintOrder] = useState(null);
  const [cancelOrder, setCancelOrder] = useState(null);

  useEffect(() => {
    if (cancelOrder) setType(null);
  }, [cancelOrder]);

  useEffect(() => {
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
      <Alert err="Test Error Msg" />

      <ModalValidationValues
        values={values}
        setValues={setValues}
        validate={validate}
      />

      <HeaderElement setType={setType} type={type} />

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

const HeaderElement = ({ setType, type }) => {
  return (
    <>
      <Header>Neue Einlagerung</Header>
      <Navigation>
        <ButtonPageNav onClick={() => setType(null)}>Zurück</ButtonPageNav>

        {SUB_PAGES.filter(page => page.name !== type).map((page, index) => (
          <ButtonPageNav key={index} onClick={() => setType(page.name)}>
            {page.name}
          </ButtonPageNav>
        ))}
      </Navigation>
    </>
  );
};

const Alert = props => {
  const { err, warning, msg } = props;

  return (
    <AlertWrapper {...props}>
      {err} {warning} {msg}
    </AlertWrapper>
  );
};

const AlertWrapper = styled.div`
  position: absolute;
  background: red;
  height: 3rem;
  width: 75%;
  top: 0;
  left: 0;
  text-align: left;
  padding: 0.6rem;
  padding-left: 8rem;
  background: #ef5350;

  color: #fff;
  font-size: 1.05rem;
  font-weight: bold;

  ${({ err }) =>
    err &&
    `
    background: #ef5350;

   `}

  ${({ warning }) =>
    warning &&
    `
    background: #ffab40;
   `}

   
  ${({ msg }) =>
    msg &&
    `
    background: #81c784;
   `}

`;
