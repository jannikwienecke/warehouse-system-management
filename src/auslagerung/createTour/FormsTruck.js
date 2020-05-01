import React from "react";
import styled from "styled-components";
import { FormChooseTruck } from "./FormChooseTruck";
import { FormChooseEmployee } from "./FormChooseEmployee";

export const FormsTruck = (props) => {
  return (
    <Wrapper>
      <FormWrapper>
        <FormChooseTruck {...props} />
      </FormWrapper>
      <FormWrapper>
        <FormChooseEmployee {...props} />
      </FormWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const FormWrapper = styled.div`
  width: 45%;
`;
