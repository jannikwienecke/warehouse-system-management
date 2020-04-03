import React, { useState } from "react";
import styled, { keyframes, css } from "styled-components";
import { SelectBrückenStorage } from "./SelectBrückenStorage";

const SelectStorage = props => {
  const [choise, setChoise] = useState(null);

  return (
    <>
      <OptionWrapper choise={choise}>
        <StorageOption onClick={() => setChoise(1)} index={1} choise={choise}>
          Brückenlager
        </StorageOption>
        <StorageOption onClick={() => setChoise(2)} index={2} choise={choise}>
          Lager 2
        </StorageOption>
        <StorageOption onClick={() => setChoise(3)} index={3} choise={choise}>
          Lager 3
        </StorageOption>
        <StorageOption onClick={() => setChoise(4)} index={4} choise={choise}>
          Lager 4
        </StorageOption>
      </OptionWrapper>

      {choise === 1 && <SelectBrückenStorage {...props} />}
    </>
  );
};
export default SelectStorage;

const OptionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 60%;
  margin: 0 auto;
  justify-content: space-around;
  margin-top: 3rem;

  transition: 1s;
  ${({ choise }) =>
    choise &&
    `
    margin-top: 0;
  `}
`;

const keyFrame = keyframes`
  0% {
    opacity: 1;
    visibility: visible;
    transform: translate(0px, 0px);
    height: 100%;
    border: none;
    
  }
  50%{
    visibility: hidden;
    padding: 0px;
    margin: 0px;
    font-size: 0px;
    border: none;
    transform: translate(+300px, +200px);
  }

  100% {
      border: none;
    font-size: 0px;
    transform: translate(+300px, +200px);
    padding: 0px;
    margin: 0px;
    visibility: hidden;
    
  }

  `;

const StorageOption = styled.div`
  width: 40%;
  border: 0.5px solid #c8c8c8;
  padding: 2rem;
  margin: 1rem 0 1rem 0;
  border-radius: 1rem;
  font-size: 1.2rem;
  font-weight: 600;
  box-shadow: 2px 4px 8px 1px rgba(0, 0, 0, 0.1);
  transition: 2s;

  ${({ choise, index }) =>
    choise &&
    choise === index &&
    `
        opacity: 0;
        width: 0px;
        height: 0px;
        margin: 0px;
        padding: 0px;  
  
  `}

  ${({ choise, index }) =>
    choise &&
    choise !== index &&
    css`
      animation: ${keyFrame} 1.5s ease-in-out forwards;
      animation-iteration-count: 1;
    `}
  
  
      :hover {
    box-shadow: 2px 4px 8px 1px rgba(0, 0, 0, 0.2);
    font-weight: 900;
    font-size: 1.25rem;
    transform: scale(1.05);
    border: 1px solid #3f51b5;
  }
`;
