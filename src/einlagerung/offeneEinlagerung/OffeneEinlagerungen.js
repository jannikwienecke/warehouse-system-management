import React, { useState, useEffect } from "react";
import { Table } from "./Table";
import { SUB_PAGES } from "../data";
import { HeaderElement } from "../../common/HeaderElement";
import { ValidationModal } from "./ValidationModal";
import { SuccessScreen } from "../../common/SuccessScreen";
import { mockAPI } from "../../functions/utils";
import { data, testRows } from "./data";

export const OffeneEinlagerungen = ({ setType, type }) => {
  const [selectedRow, selectRow] = useState(null);
  const [successScreen, showSuccessScreen] = useState(null);
  const [openOrders, setOpenOrders] = useState(null);
  const [openRows, setOpenRows] = useState();

  useEffect(() => {
    mockAPI(data).then((res) => setOpenOrders(res.data));
    mockAPI(testRows).then((res) => setOpenRows(sortRows(res.data)));
  }, []);

  const submitOrder = () => {
    console.log("suubmit order... API CALL HERE", selectedRow);

    showSuccessScreen("Einlagerung abgeschlossen");
    setTimeout(() => showSuccessScreen(false), 2000);

    setOpenOrders([
      ...openOrders.filter((order) => order.id !== selectedRow.id),
    ]);
    selectRow(null);
  };

  if (successScreen) {
    return <SuccessScreen text={successScreen} />;
  }
  return (
    <>
      <ValidationModal
        selectRow={selectRow}
        selectedRow={selectedRow}
        submitOrder={submitOrder}
        openRows={openRows}
      />
      <HeaderElement setType={setType} type={type} sub_pages={SUB_PAGES} />

      <Table selectRow={selectRow} openOrders={openOrders} />
    </>
  );
};

const sortRows = (rows) => {
  return rows.sort((a, b) => {
    if (a.isEmpty) return -1;
    if (a.open <= b.open) return 1;
    else return -1;
  });
};
