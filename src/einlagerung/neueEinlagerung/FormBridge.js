import React, { useEffect, useState } from "react";
import styled from "styled-components";
import FormCard from "../../components/form/FormCard";
import ModularForm from "../../components/form/ModularForm";
import ModularModal from "../../components/modal/Modal";

const FormBridge = props => {
  return (
    <Wrapper>
      <FormElement {...props} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 5rem 0;
`;

const FormElement = ({ setBridge, bridgeCounter, max }) => {
  const [modal, showModal] = useState(null);
  const [error, setError] = useState(null);

  const validate = data => {
    data.quantity = parseInt(data.quantity);

    if (data.quantity <= max) {
      setBridge(data);
    } else {
      setError(`Die maximale Anzahl ist ${max}`);
    }
  };
  return (
    <>
      <ErrorModal error={error} setError={setError} />
      <FormCard width={90} marginTop={2} color="white">
        <ModularForm
          headline={`${bridgeCounter}. Brücke auswählen`}
          colorScheme="dark"
          arrInput={[
            {
              placeholder: "Brückenummer",
              name: "bridgeNumber",
              type: "number",
              size: 4
            },
            {
              name: "quantity",
              placeholder: "Anzahl [Stück]",
              type: "number",
              size: 4,
              max: max
            },

            {
              name: "Anmerkungen",
              type: "text",
              size: 4
            }
          ]}
          submitFunc={data => validate(data)}
          requiredArguments={["bridgeNumber"]}
          arrBtns={{
            btns: [
              {
                size: "md",
                variant: "dark",
                text: "Weiter",
                isSubmitFunc: true
              }
            ],

            justifyContent: "flex-end",
            position: "top"
          }}
        />
      </FormCard>
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
            func: () => setError(null)
          }
        ]}
      >
        <h4>{error}</h4>
      </ModularModal>
    </>
  );
};
