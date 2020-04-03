import React, { useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import { SelectBrückenStorage } from "./SelectBrückenStorage";
import { SelectStorageRow } from "./SelectStorageRow";
import { mockAPI, copy } from "../../functions/utils";

const sortRows = rows => {
  return rows.sort((a, b) => {
    if (a.isEmpty) return -1;
    if (a.open <= b.open) return 1;
    else return -1;
  });
};
const testRows = [
  { value: "1", label: "C42", storage: 3, open: 10, isEmpty: false },
  { value: "2", label: "C38", storage: 3, open: 100, isEmpty: true },
  { value: "3", label: "B4", storage: 2, open: 1, isEmpty: false },
  { value: "4", label: "D22", storage: 4, open: 500, isEmpty: true }
];

const SelectStorage = props => {
  const [choise, setChoise] = useState(null);
  const [openRows, setOpenRows] = useState();
  const [filterdRows, setFilteredRows] = useState();
  const [selectedRows, setSelelectedRows] = useState(null);

  useEffect(() => {
    mockAPI(testRows).then(res => setOpenRows(sortRows(res.data)));
  }, []);

  useEffect(() => {
    if (choise) _filterRows();
  }, [choise, openRows]);

  useEffect(() => {
    if (selectedRows) removeRowFromOpenRows();
  }, [selectedRows]);

  const removeRowFromOpenRows = () => {
    const selectedRowValues = selectedRows.map(row => row.value);
    setOpenRows(openRows.filter(row => !selectedRowValues.includes(row.value)));
    console.log("HIER sel", selectedRowValues);
  };

  const _filterRows = () => {
    const rows = openRows
      .filter(row => row.storage === choise)
      .map(row => {
        row.isEmpty = row.isEmpty ? "Ja" : "Nein";
        return row;
      });

    setFilteredRows(rows);
  };

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
      {choise > 1 && (
        <SelectStorageRow
          goBack={() => setChoise(null)}
          {...props}
          selectedStorage={choise}
          selectedRows={selectedRows}
          setSelelectedRows={setSelelectedRows}
          filteredRows={filterdRows}
        />
      )}
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
