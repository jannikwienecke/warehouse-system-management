import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Compartment from "./Compartment";
import { compartments } from "./data";
import Popup from "../components/popup/Popup";
import { PopupRowView } from "./PopupRowView";
import { MySelect } from "../components/select/MySelect";

export const Storage = () => {
  const [filter, setFilter] = useState(null);
  const [showPopup, setShowPopups] = useState(null);
  const [showDetailPopup, setShowDetailPopup] = useState(null);
  const [compartmentZoom, setCompartmentZoom] = useState(null);
  const [hide, setHide] = useState(null);
  useEffect(() => {
    if (!compartmentZoom) {
      setTimeout(() => {
        setHide(false);
      }, 1);
    }
  }, [compartmentZoom]);

  const zoom = (compartment) => {
    console.log("zoom compartment", compartment);
    if (!compartment) setHide(true);
    setCompartmentZoom(compartment);
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
    setShowPopups(rowData["row_id"]);
  };

  const getCompartmentList = () => {
    return Object.entries(compartments)
      .filter(([index, compartment]) => {
        if (compartmentZoom) {
          return compartmentZoom === index;
        } else {
          return index;
        }
      })
      .map(([index, compartment]) => {
        return (
          <Compartment
            compartment={compartment}
            showPopup={showPopup}
            setShowPopup={removePopup}
            clickRow={clickRow}
            showDetails={showDetails}
            zoom={zoom}
            compartmentZoom={compartmentZoom}
            filter={filter}
          />
        );
      });
  };

  const options_ = [
    { value: 2276312, label: "Polykanister" },
    { value: 2744558, label: "CP3 Paletten" },
    { value: 2766358, label: "Flachkannen" },
  ];

  console.log("filter = ", filter);

  return (
    <>
      {/* <Control /> */}

      <PopupRowView visible={showDetailPopup} setVisible={setShowDetailPopup} />

      {!hide && (
        <StorageHall showPopupCard={true}>
          <Wrapper>
            <MySelect
              placeholder={"Material Suchen"}
              setValue={(filter_) => setFilter(filter_.toLowerCase())}
              optionData={options_}
            />
          </Wrapper>
          {getCompartmentList()}
        </StorageHall>
      )}
    </>
  );
};

const Wrapper = styled.div`
  position: absolute;
  top: -60px;
  right: 15%;
  z-index: 3;
  width: 20%;
  text-align: right;
`;

const Control = () => {};

const StorageHall = styled.div`
  position: relative;
  background: #cecece;
  width: 95%;
  height: 75%;
  top: 5%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-between;
  align-content: flex-start;
  border: 2px solid;
  // left: 55%;
  // margin-left: -47.5%;
  margin: 0 auto;
  margin-bottom: 10%;
`;
