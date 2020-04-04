import React, { useState, useEffect } from "react";
import { ButtonSelection } from "../../components/button/ButtonSelection";
import ModularTable from "../../components/table/ModularTable";
import styled from "styled-components";
import { sum } from "../../functions/utils";
import { SuccessScreen } from "../../common/SuccessScreen";
export const SelectStorageRow = ({
  goBack,
  values,
  completeData,
  selectedStorage,
  filteredRows,
  selectedRows,
  setSelelectedRows,
}) => {
  const [successScreen, showSuccessScreen] = useState(null);

  const handleAllSelected = (row, openQuantity) => {
    row.quantity = openQuantity;
    values["rows"] = selectedRows ? [...selectedRows, row] : [row];
    completeData(values);
  };

  useEffect(() => {
    if (successScreen) {
      setTimeout(() => {
        showSuccessScreen(false);
      }, 1500);
    }
  }, [successScreen]);

  const handleNotAllSelected = (row) => {
    row.quantity = row.open;

    if (selectedRows) {
      setSelelectedRows([...selectedRows, row]);
    } else {
      setSelelectedRows([row]);
    }

    showSuccessScreen(true);
  };

  const handleRowClick = (row) => {
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
      const quantitySelected = selectedRows.map((row) => row.quantity);

      return parseInt(values.quantity) - sum(quantitySelected);
    } else {
      return parseInt(values.quantity);
    }
  };

  if (successScreen) {
    const text = `Offene Anzahl ${getOpenQuantity()}`;
    return <SuccessScreen text={text} />;
  }
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

  return (
    <>
      <ModularTable
        data={filteredRows}
        columns={columns}
        pagination={true}
        handleClick={(rowData) => handleRowClick(rowData)}
      />
    </>
  );
};

export const columns = [
  {
    Header: "ID",
    accessor: "value", // accessor is the "key" in the data
  },
  {
    Header: "Reihe",
    accessor: "label",
  },
  {
    Header: "Lager",
    accessor: "storage",
  },
  {
    Header: "Verfügbar",
    accessor: "open",
  },
  {
    Header: "Leer?",
    accessor: "isEmpty",
  },
];

const Wrapper = styled.div`
  margin-top: 5rem;
`;

const OpenQuantity = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  letter-spacing: 0.15rem;
`;
