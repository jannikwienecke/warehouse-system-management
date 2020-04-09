import React from "react";
import styled from "styled-components";
import { FaExchangeAlt, FaSearch } from "react-icons/fa";
import { MyButton } from "../../components/button/MyButton";
import { TABLE_VIEW, ANMITION_VIEW, DELIVERY } from "./data";

export const Control = ({
  incrCounter,
  counter,
  setDelivery,
  delivery,
  setView,
  view,
}) => {
  const updateView = () => {
    setView(view === TABLE_VIEW ? ANMITION_VIEW : TABLE_VIEW);
  };
  const generateDelivery = () => {
    const randInt = parseInt(Math.random() * DELIVERY.length);
    setDelivery(DELIVERY[randInt]);
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
      </ButtonWrapper>
    </>
  );
};

const ButtonWrapper = styled.div`
  width: 90%;
  text-align: left;
  margin: 2rem auto;
`;
