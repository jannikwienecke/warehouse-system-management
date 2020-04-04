import React, { useState } from "react";
import styled from "styled-components";
import { Header } from "../components/header/Header";
import { ButtonSelection } from "../components/button/ButtonSelection";
// import { NeueEinlagerung } from "./neueEinlagerung/NeueEinlagerung";
import {
  SUB_PAGES,
  NEUE_AUSLAGERUNG,
  OFFENE_AUSLAGERUNGEN,
  ALLE_AUSLAGERUNGEN,
} from "./data";
import { NeueAuslagerung } from "./neueAuslagerung/NeueAuslagerung";

const COMPONENTS = {
  [NEUE_AUSLAGERUNG.name]: NeueAuslagerung,
  [OFFENE_AUSLAGERUNGEN.name]: null,
  [ALLE_AUSLAGERUNGEN.name]: null,
};

export const DashboardAuslagerung = () => {
  const [type, setType] = useState(null);

  if (type) {
    const page = SUB_PAGES.find((page) => page.name === type);
    const Component = COMPONENTS[page.name];
    return <Component setType={setType} type={type} />;
  }
  return (
    <>
      <Header>Lager Auslagerung</Header>

      <DashboardWrapper>
        {SUB_PAGES.map((page, index) => (
          <ButtonSelection key={index} onClick={() => setType(page.name)}>
            {page.name}
          </ButtonSelection>
        ))}
      </DashboardWrapper>
    </>
  );
};

const DashboardWrapper = styled.div`
  margin-top: 3rem;
`;
