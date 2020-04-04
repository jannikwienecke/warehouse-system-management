import React from "react";
import ModularForm from "../../components/form/ModularForm";
import FormCard from "../../components/form/FormCard";
import { products, customers } from "./data";

export const Form = (props) => {
  return (
    <div>
      <FormElement {...props} />
    </div>
  );
};

const FormElement = () => {
  return (
    <FormCard width={90} marginTop={2} color="#e3e3e3">
      <ModularForm
        colorScheme="grey"
        headline="Einlagerung Suchen"
        arrInput={[
          {
            placeholder: "Produktnummer",
            name: "product",
            type: "input",
            size: 6,
            options: products,
          },
          {
            placeholder: "Kundennummer",
            name: "customer",
            type: "input",
            size: 6,
            options: customers,
          },
          {
            placeholder: "Datum Beginn",
            name: "dateStart",
            type: "date",
            size: 6,
          },
          { placeholder: "Datum Ende", name: "dateEnd", type: "date", size: 6 },
        ]}
        submitFunc={(data) => console.log("SUBMIT", data)}
        arrBtns={{
          btns: [
            {
              size: "md",
              variant: "dark",
              text: "Suchen",
              isSubmitFunc: true,
            },
          ],

          justifyContent: "flex-end",
          position: "top",
        }}
      />
    </FormCard>
  );
};
