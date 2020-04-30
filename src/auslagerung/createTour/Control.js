import React from "react";
import styled from "styled-components";
import { FaExchangeAlt, FaSearch, FaCheckCircle } from "react-icons/fa";
import { MyButton } from "../../components/button/MyButton";
import { TABLE_VIEW, ANMITION_VIEW, DELIVERY } from "./data";
import { condenseTruckLoading } from "./PalletsTableView";

export const Control = ({
  incrCounter,
  counter,
  setDelivery,
  delivery,
  setView,
  trucks,
  view,
}) => {
  const updateView = () => {
    setView(view === TABLE_VIEW ? ANMITION_VIEW : TABLE_VIEW);
  };
  const generateDelivery = () => {
    const randInt = parseInt(Math.random() * DELIVERY.length);
    setDelivery(DELIVERY[randInt]);
  };

  const submitTours = () => {
    console.log("submit...", trucks);
    const condensedOrders = condenseTruckLoading(trucks);
    console.log("codensed", condensedOrders);
  };

  return (
    <>
      <ButtonWrapper>
        <MyButton onClick={generateDelivery}>
          Auftrag Generieren <FaSearch />
        </MyButton>

        {delivery && (
          <MyButton onClick={updateView}>
            Ansicht Wechseln <FaExchangeAlt />
          </MyButton>
        )}
        {delivery && (
          <MyButton onClick={submitTours}>
            Touren Abschließen <FaCheckCircle />
          </MyButton>
        )}
      </ButtonWrapper>
    </>
  );
};

const ButtonWrapper = styled.div`
  width: 90%;
  text-align: left;
  margin: 2rem auto;
`;
