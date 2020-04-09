import React, { useState } from "react";
import styled from "styled-components";
import Compartment from "./Compartment";
import { compartments } from "./data";
import Popup from "../components/popup/Popup";
import { PopupRowView } from "./PopupRowView";

export const Storage = () => {
  const [showPopup, setShowPopups] = useState(null);
  const [showDetailPopup, setShowDetailPopup] = useState(null);

  const getCompartmentList = (showPopup, clickRow, showDetails) => {
    return Object.entries(compartments).map(([index, compartment]) => {
      return (
        <Compartment
          compartment={compartment}
          showPopup={showPopup}
          setShowPopup={removePopup}
          clickRow={clickRow}
          showDetails={showDetails}
        />
      );
    });
  };

  const removePopup = (rowData) => {
    setTimeout(() => {
      setShowPopups(null);
    }, 5);
  };

  const showDetails = (rowData) => {
    setTimeout(() => {
      setShowPopups(null);
      setShowDetailPopup(true);
    }, 5);
  };

  const clickRow = (rowData) => {
    setShowPopups(rowData["id"]);
  };

  return (
    <>
      <PopupRowView visible={showDetailPopup} setVisible={setShowDetailPopup} />

      <StorageHall showPopupCard={true}>
        {getCompartmentList(showPopup, clickRow, showDetails)}
      </StorageHall>
    </>
  );
};

const StorageHall = styled.div`
  position: absolute;
  background: #cecece;
  width: 75%;
  height: 75%;
  top: 15%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-between;
  align-content: flex-start;
  border: 2px solid;
  left: 50%;
  margin-left: -37.5%;
`;
