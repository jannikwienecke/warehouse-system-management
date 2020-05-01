import React, { useEffect, useState } from "react";
import { SUB_PAGES } from "../data";
import { useDispatch } from "react-redux";
import { fetchAuslagerungen } from "../store";
import { Parent } from "../../baseComponents/Parent";
import CreateTour from "../createTour/CreateTour";
import { AlertBanner } from "../../common/AlertBanner";
import styled from "styled-components";
export const NeueAuslagerung = ({ setType, type }) => {
  const [error, setError] = useState(null);
  return (
    <>
      {error && (
        <ErrorWrapper>
          <AlertBanner err={error} />
        </ErrorWrapper>
      )}
      <Parent
        header={{
          name: "Neue Auslagerung",
          setType: setType,
          type: type,
          sub_pages: SUB_PAGES,
        }}
      />

      <CreateTour setError={setError} />
    </>
  );
};

const ErrorWrapper = styled.div`
  position: fixed;
  z-index: 100;
`;
