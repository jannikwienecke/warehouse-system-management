import React from "react";
import styled from "styled-components";
import {
  getDateString,
  setArrInputSize,
  copy,
  get_input,
} from "../../functions/utils";
import { Parent } from "../../baseComponents/Parent";
import { INPUT } from "../../baseComponents/base";
import { extractIdentifier } from "../../functions/middleware";

const Form = (props) => {
  const input_chargennummer = get_input(
    "text",
    "chargennummer",
    "Chargennummer"
  );
  const input_date = get_input("datetime", "datetime", "Einlagerungsdatum");

  const arrInput = [
    INPUT.customers,
    INPUT.employees,
    INPUT.products,
    input_chargennummer,
    INPUT.quantity,
    input_date,
    INPUT.notes,
  ];

  setArrInputSize(arrInput, 10);

  return (
    <Wrapper>
      <Parent
        form={{
          formTitle: "Einlagerungen Eingeben",
          arrInput: arrInput,
          middlewareValidation: [],
          middlewareParse: [extractIdentifier],
          requiredArguments: [],
          cardWrapper: true,
          apiFunc: (dispatch, parameter) => props.setValues(parameter),
        }}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 80%;
  margin: 5rem auto;
`;
export default Form;
