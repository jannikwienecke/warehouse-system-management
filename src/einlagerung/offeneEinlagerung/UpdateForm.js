import React from "react";
import styled from "styled-components";
import ModularForm from "../../components/form/ModularForm";

export const UpdateForm = (props) => {
  return (
    <WrapperForm>
      <FormElement {...props} />
    </WrapperForm>
  );
};

const WrapperForm = styled.div``;

const FormElement = ({ selectedRow, openRows, _submitUpdatedData }) => {
  return (
    <ModularForm
      headline="Einlagerung Änder"
      colorScheme="dark"
      arrInput={[
        {
          name: "row",
          placeholder: "Lagerplatz",
          type: "input",
          size: 10,
          options: openRows,
          default: { value: selectedRow.row_id, label: selectedRow.row_name },
        },
        {
          name: "quantity",
          placeholder: "Anzahl [Stück]",
          type: "number",
          size: 10,
          default: selectedRow.quantity,
          style: { position: "relative", right: "0" },
        },
        {
          name: "einlagerer",
          type: "input",
          size: 10,
          options: employee,
          placeholder: "Einlagerer",
          default: {
            value: selectedRow.einlagerer_id,
            label: selectedRow.einlagerer_name,
          },
        },
        {
          name: "notes",
          placeholder: "Anmerkungen",
          type: "textfield",
          size: 10,
          default: selectedRow.notes,
          style: { position: "relative", right: "0" },
        },
      ]}
      submitFunc={(data) => _submitUpdatedData(data)}
      requiredArguments={[]}
      arrBtns={{
        btns: [
          {
            size: "md",
            variant: "dark",
            text: "Abschließen",
            isSubmitFunc: true,
          },
        ],

        justifyContent: "flex-end",
        position: "top",
      }}
    />
  );
};

const employee = [
  { value: "1", label: "Fricke, Torben" },
  { value: "2", label: "Jagata, Maurice" },
  { value: "3", label: "Sylla, Ibrahima" },
];
