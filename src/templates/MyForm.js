import React from "react";

import ModularForm from "../components/form/ModularForm";
import FormCard from "../components/form/FormCard";

const employee = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" }
];

const MyForm = () => {
  return (
    <FormCard width={80} marginTop={2}>
      <ModularForm
        headline="Mitarbeiter Anlegen"
        arrInput={[
          { name: "name", type: "text", size: 6 },
          { name: "Age", type: "number", size: 6 },
          {
            name: "Mitarbeiter",
            type: "input",
            size: 12,
            options: employee
          }
        ]}
        submitFunc={data => console.log("SUBMIT", data)}
        arrBtns={{
          btns: [
            {
              size: "md",
              variant: "light",
              text: "Anlegen",
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
