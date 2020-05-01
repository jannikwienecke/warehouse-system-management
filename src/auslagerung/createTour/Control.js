import React, { useEffect } from "react";
import styled from "styled-components";
import { FaExchangeAlt, FaSearch, FaCheckCircle } from "react-icons/fa";
import { MyButton } from "../../components/button/MyButton";
import { TABLE_VIEW, ANMITION_VIEW, DELIVERY } from "./data";
import { condenseTruckLoading } from "./PalletsTableView";
import { useSubmit } from "./useSubmit";

export const Control = ({
  incrCounter,
  counter,
  setDelivery,
  delivery,
  setView,
  trucks,
  view,
  setError,
  setCompleted,
}) => {
  const { submit, completed } = useSubmit();

  useEffect(() => {
    if (completed) setCompleted(true);
  }, [completed]);

  const updateView = () => {
    setView(view === TABLE_VIEW ? ANMITION_VIEW : TABLE_VIEW);
  };
  const generateDelivery = () => {
    const randInt = parseInt(Math.random() * DELIVERY.length);
    setDelivery(DELIVERY[randInt]);
  };

  const validateTours = () => {
    let err;
    trucks.forEach((truck, index) => {
      if (!truck.employee) {
        setError(
          `Fehlende Angabe: Bitte Mitarbeiter Angeben (LKW Nr. ${index + 1})`
        );
        err = true;
      }
    });
    if (err) return false;

    return true;
  };
  const submitTours = () => {
    if (!validateTours()) return;

    const condensedOrders = condenseTruckLoading(trucks);
    submit(trucks, condensedOrders);
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
