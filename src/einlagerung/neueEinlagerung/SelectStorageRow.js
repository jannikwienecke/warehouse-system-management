import React, { useState, useEffect } from "react";
import { ButtonSelection } from "../../components/button/ButtonSelection";
import styled from "styled-components";
import { sum, copy } from "../../functions/utils";
import { SuccessScreen } from "../../common/SuccessScreen";
import { Parent } from "../../baseComponents/Parent";
import { COLUMNS } from "../../baseComponents/base";
import { useDispatch, useSelector } from "react-redux";
import { selectRow } from "../store";
import { Storage } from "../../storage/Storage";

export const SelectStorageRow = ({
  goBack,
  values,
  completeData,
  selectedStorage,
  selectedRows,
  setSelelectedRows,
}) => {
  const [successScreen, showSuccessScreen] = useState(null);
  const [storageScreen, showStorageScreen] = useState(false);

  const storage = useSelector((state) => state.base.storage);

  const dispatch = useDispatch();

  useEffect(() => {
    if (successScreen) {
      setTimeout(() => {
        showSuccessScreen(false);
      }, 1500);
    }
  }, [successScreen]);

  const handleAllSelected = (row, openQuantity) => {
    row.quantity = openQuantity;
    values["rows"] = selectedRows ? [...selectedRows, row] : [row];
    completeData(values);
  };

  const handleNotAllSelected = (row) => {
    row.quantity = row.open;

    if (selectedRows) {
      setSelelectedRows([...selectedRows, row]);
    } else {
      console.log("set selected rows", copy(row));

      setSelelectedRows([row]);
    }

    showSuccessScreen(true);
  };

  const handleClickRowStorage = (row) => {
    row.quantity = row.maxStock - row.stock;
  };

  const handleRowClick = (row) => {
    row = row.original;
    const openQuantity = getOpenQuantity();

    if (row.open >= openQuantity) {
      handleAllSelected(row, openQuantity);
    } else {
      handleNotAllSelected(row);
    }
    dispatch(selectRow(storage, row, values));
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

  const filterStorage = (data) => {
    return data.filter((row) => row.storage === selectedStorage);
  };

  const filterFullRows = (data) => {
    return data.filter((row) => !row.isFull);
  };

  const parseBoolean = (data) => {
    return data.map((row) => {
      row.isEmpty = row.isEmpty ? "Ja" : "Nein";
      return row;
    });
  };

  const sortRows = (rows) => {
    return rows.sort((a, b) => {
      if (a.isEmpty) return -1;
      if (a.open <= b.open) return 1;
      else return -1;
    });
  };

  console.log("VALUES == ", values);

  return (
    <>
      <Wrapper>
        <OpenQuantity>Offene Anzahl: {getOpenQuantity()}</OpenQuantity>
        <h1>Lagerplatz auswählen - Halle {selectedStorage}</h1>
        <ButtonSelection onClick={goBack}>
          Anderes Lager auswählen
        </ButtonSelection>

        <ButtonSelection onClick={() => showStorageScreen(!storageScreen)}>
          Anischt Wechseln
        </ButtonSelection>

        {!storageScreen ? (
          <Parent
            table={{
              columnsArr: columns,
              dataName: "storage",
              filterFuncStack: [filterStorage, filterFullRows],
              parseFuncStack: [parseBoolean, sortRows],
              middleware: [(data) => console.log("DATA VALIDATION")],
              clickRow: {
                func: handleRowClick,
                baseComponent: {
                  type: "Empty",
                  headline: "",
                  settings: {},
                },
              },
            }}
          />
        ) : (
          <>
            <StorageWrapper>
              <Storage
                defaultFilter={values.products.product_name}
                clickRowFunc={{
                  text: "Auswählen",
                  func: (data) => console.log("SELECT...", data),
                }}
              />
            </StorageWrapper>
          </>
        )}
      </Wrapper>
    </>
  );
};

const StorageWrapper = styled.div`
  display: relative;
  height: 100vh;
  width: 100%;
  margin-top: 5rem;
`;

const columns = [
  COLUMNS.row,
  COLUMNS.storage,
  COLUMNS.open,
  COLUMNS.isEmptyRow,
];

const Wrapper = styled.div`
  margin-top: 5rem;
`;

const OpenQuantity = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  letter-spacing: 0.15rem;
`;
