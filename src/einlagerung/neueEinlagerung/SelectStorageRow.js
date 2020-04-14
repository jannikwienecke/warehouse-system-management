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
import { showAlert } from "../../baseComponents/store/actions";

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
      setSelelectedRows([row]);
    }

    showSuccessScreen(true);
  };

  const handleClickRowStorage = (row) => {
    const { product_id, product_name } = values.products;
    if (row.product_id !== product_id) {
      dispatch(
        showAlert(
          `Bitte Gültiges Produkt auswählen: ${product_name} (${product_id})`
        )
      );
    } else {
      row.open = row.maxStock - row.stock;
      handleRowClick(row);
    }
  };

  const handleRowClick = (row) => {
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

  // if (successScreen) {
  //   const text = `Offene Anzahl ${getOpenQuantity()}`;
  //   return <SuccessScreen text={text} />;
  // }

  const filterStorage = (data) => {
    return data.filter((row) => row.warehouse_id === selectedStorage);
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

  console.log("VALUES = ", values);

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

        {!storageScreen && successScreen && <SuccessScreen />}
        {!storageScreen ? (
          <Parent
            table={{
              columnsArr: columns,
              dataName: "storage",
              filterFuncStack: [filterStorage, filterFullRows],
              parseFuncStack: [parseBoolean, sortRows],
              middleware: [(data) => console.log("DATA VALIDATION")],
              clickRow: {
                func: (row) => handleRowClick(row.original),
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
                warehouse_id={selectedStorage}
                defaultFilter={values.products.product_name}
                clickRowFunc={{
                  text: "Auswählen",
                  func: handleClickRowStorage,
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
  COLUMNS.warehouse,
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
