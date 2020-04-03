import React, { useState } from "react";
import { ButtonSelection } from "../../components/button/ButtonSelection";
import ModularTable from "../../components/table/ModularTable";
import styled from "styled-components";
import { sum } from "../../functions/utils";

export const SelectStorageRow = ({
  goBack,
  values,
  completeData,
  selectedStorage,
  filteredRows,
  selectedRows,
  setSelelectedRows
}) => {
  const handleAllSelected = (row, openQuantity) => {
    row.quantity = openQuantity;
    values["rows"] = selectedRows ? [...selectedRows, row] : [row];
    completeData(values);
  };

  const handleNotAllSelected = row => {
    row.quantity = row.open;

    if (selectedRows) {
      setSelelectedRows([...selectedRows, row]);
    } else {
      setSelelectedRows([row]);
    }
  };

  const handleRowClick = row => {
    row = row.original;
    const openQuantity = getOpenQuantity();

    if (row.open > openQuantity) {
      handleAllSelected(row, openQuantity);
    } else {
      handleNotAllSelected(row);
    }
  };

  const getOpenQuantity = () => {
    if (selectedRows) {
      const quantitySelected = selectedRows.map(row => row.quantity);

      return parseInt(values.quantity) - sum(quantitySelected);
    } else {
      return parseInt(values.quantity);
    }
  };

  return (
    <>
      <Wrapper>
        <OpenQuantity>Offene Anzahl: {getOpenQuantity()}</OpenQuantity>
        <h1>Lagerplatz auswählen - Halle {selectedStorage}</h1>
        <ButtonSelection onClick={goBack}>
          Anderes Lager auswählen
        </ButtonSelection>

        <TableOpenRows
          filteredRows={filteredRows}
          handleRowClick={handleRowClick}
          selectedStorage={selectedStorage}
        />
      </Wrapper>
    </>
  );
};

const TableOpenRows = ({ filteredRows, handleRowClick, selectedStorage }) => {
  if (!filteredRows) return <></>;
  console.log("selected", selectedStorage);

  return (
    <>
      <ModularTable
        data={filteredRows}
        columns={columns}
        paginatonFunc={data => console.log(data)}
        pagination={true}
        handleClick={rowData => handleRowClick(rowData)}
      />
    </>
  );
};

export const columns = [
  {
    Header: "ID",
    accessor: "value" // accessor is the "key" in the data
  },
  {
    Header: "Reihe",
    accessor: "label"
  },
  {
    Header: "Lager",
    accessor: "storage"
  },
  {
    Header: "Verfügbar",
    accessor: "open"
  },
  {
    Header: "Leer?",
    accessor: "isEmpty"
  }
];

const Wrapper = styled.div`
  margin-top: 5rem;
`;

const OpenQuantity = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  letter-spacing: 0.15rem;
`;
