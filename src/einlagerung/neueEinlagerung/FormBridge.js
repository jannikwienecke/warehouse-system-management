import React, { useEffect, useState } from "react";
import styled from "styled-components";
import FormCard from "../../components/form/FormCard";
import ModularForm from "../../components/form/ModularForm";
import ModularModal from "../../components/modal/Modal";
import { mockAPI, setArrInputSize } from "../../functions/utils";
import { Parent } from "../../baseComponents/Parent";
import { INPUT, EXCEPTIONS } from "../../baseComponents/base";
import { extractIdentifier } from "../../functions/middleware";

const FormBridge = (props) => {
  return (
    <Wrapper>
      <FormElement {...props} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 5rem 0;
`;

const FormElement = ({ setBridge, bridgeCounter, max, openBridges }) => {
  const [modal, showModal] = useState(null);
  const [error, setError] = useState(null);

  const validateMaxValue = (data) => {
    console.log("VALIDATE MAX VALUE...", data);
    console.log("max = ", max);

    if (parseInt(data.quantity) > max) {
      setError(`Die maximale Anzahl ist ${max}`);
      EXCEPTIONS.ValidationException["msg"] = "Anzahl zu hoch";
      EXCEPTIONS.ValidationException["nameList"] = ["quantity"];

      throw EXCEPTIONS.ValidationException;
    }
  };

  const arrInput = [INPUT.quantity, INPUT.notes, INPUT.storageBridges];
  setArrInputSize(arrInput, 10);
  INPUT.storageBridges.filter = (storageBridges) => {
    return storageBridges.filter((bridge) => bridge.isEmpty === true);
  };

  if (!openBridges) return <></>;
  return (
    <>
      <ErrorModal error={error} setError={setError} />
      <OpenQuantity>Offene Anzahl: {max}</OpenQuantity>

      <Parent
        form={{
          formTitle: `${bridgeCounter}. Brücke auswählen`,
          arrInput: arrInput,
          middlewareValidation: [validateMaxValue],
          middlewareParse: [extractIdentifier],
          requiredArguments: [INPUT.storageBridges.name],
          cardWrapper: true,
          btnText: "Bestätigen",
          apiFunc: (dispatch, parameter) => setBridge(parameter),
        }}
      />
    </>
  );
};

export default FormBridge;

const ErrorModal = ({ error, setError }) => {
  return (
    <>
      <ModularModal
        close={() => setError(null)}
        visible={error}
        headline="Fehlerhafte Eingabe"
        btnArr={[
          {
            text: "OK",
            variant: "outline-dark",
            func: () => setError(null),
          },
        ]}
      >
        <h4>{error}</h4>
      </ModularModal>
    </>
  );
};

const OpenQuantity = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  letter-spacing: 0.15rem;
`;
