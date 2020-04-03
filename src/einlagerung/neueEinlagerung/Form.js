import React from "react";

import ModularForm from "../../components/form/ModularForm";
import FormCard from "../../components/form/FormCard";
import styled from "styled-components";
import { getDateString } from "../../functions/utils";

const employee = [
  { value: "1", label: "Fricke, Torben" },
  { value: "2", label: "Jagata, Maurice" },
  { value: "3", label: "Sylla, Ibrahima" }
];

const customer = [
  { value: "37HOSTIE00", label: "Stiebel Eltron" },
  { value: "37HOSYMR00", label: "Symrise" },
  { value: "57ERAST00", label: "AST Erntebrück" }
];

const product = [
  { value: "227445", label: "Polykanister Staub. (227445)" },
  { value: "244675", label: "Container (244675)" },
  { value: "227445", label: "Flachkanne 30l (232445)" }
];

const MyForm = props => {
  return (
    <Wrapper>
      <FormElement {...props} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 80%;
  margin: 5rem auto;
`;

const FormElement = ({ setValues }) => {
  return (
    <FormCard width={90} marginTop={2} color="white">
      <ModularForm
        headline="Einlagerung Eingeben"
        colorScheme="dark"
        arrInput={[
          {
            name: "Lieferant",
            type: "input",
            size: 10,
            options: customer,
            placeholder: "Lieferant"
          },

          {
            name: "Einlagerer",
            type: "input",
            size: 10,
            options: employee,
            placeholder: "Einlagerer"
          },
          {
            name: "Produkt",
            type: "input",
            size: 10,
            options: product,
            placeholder: "Produkt"
          },
          {
            name: "Chargennummer",
            type: "text",
            size: 10
          },
          {
            name: "quantity",
            placeholder: "Anzahl [Stück]",
            type: "number",
            size: 10
          },

          {
            name: "Einlagerungsdatum",
            type: "date",
            size: 10,
            default: getDateString(new Date())
          },
          {
            name: "Anmerkungen",
            type: "textfield",
            size: 10
          }
        ]}
        submitFunc={data => setValues(data)}
        requiredArguments={[]}
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
  );
};

export default MyForm;
