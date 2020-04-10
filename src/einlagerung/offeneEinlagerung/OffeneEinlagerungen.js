// import React, { useState, useEffect } from "react";
// import { Table } from "./Table";
// import { SUB_PAGES } from "../data";
// import { HeaderElement } from "../../common/HeaderElement";
import { ValidationModal } from "./ValidationModal";
// import { SuccessScreen } from "../../common/SuccessScreen";
// import { mockAPI } from "../../functions/utils";
// import { data, testRows } from "./data";

// export const OffeneEinlagerungen = ({ setType, type }) => {
//   const [selectedRow, selectRow] = useState(null);
//   const [successScreen, showSuccessScreen] = useState(null);
//   const [openOrders, setOpenOrders] = useState(null);
//   const [openRows, setOpenRows] = useState();

//   useEffect(() => {
//     mockAPI(data).then((res) => setOpenOrders(res.data));
//     mockAPI(testRows).then((res) => setOpenRows(sortRows(res.data)));
//   }, []);

// const submitOrder = () => {
//   console.log("suubmit order... API CALL HERE", selectedRow);

//   showSuccessScreen("Einlagerung abgeschlossen");
//   setTimeout(() => showSuccessScreen(false), 2000);

//   setOpenOrders([
//     ...openOrders.filter((order) => order.id !== selectedRow.id),
//   ]);
//   selectRow(null);
// };

//   if (successScreen) {
//     return <SuccessScreen text={successScreen} />;
//   }
//   return (
//     <>
//       <ValidationModal
//         selectRow={selectRow}
//         selectedRow={selectedRow}
//         submitOrder={submitOrder}
//         openRows={openRows}
//       />
//       <HeaderElement setType={setType} type={type} sub_pages={SUB_PAGES} />

//       <Table selectRow={selectRow} openOrders={openOrders} />
//     </>
//   );
// };

// const sortRows = (rows) => {
//   return rows.sort((a, b) => {
//     if (a.isEmpty) return -1;
//     if (a.open <= b.open) return 1;
//     else return -1;
//   });
// };

import React, { useState, useEffect } from "react";

import { SUB_PAGES } from "../data";
import { mockAPI, setArrInputSize } from "../../functions/utils";

import { INPUT, COLUMNS } from "../../baseComponents/base";
import { endGreaterStart, extractIdentifier } from "../../functions/middleware";
import { Parent } from "../../baseComponents/Parent";
import { fetchEinlagerungen } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import ModularModal from "../../components/modal/Modal";
import { einlagerungen } from "../../testData";

const columns = [
  COLUMNS.datetime,
  COLUMNS.customer,
  COLUMNS.product,
  COLUMNS.quantity,
  COLUMNS.einlagerer,
  COLUMNS.warehouse,
  COLUMNS.row,
];

export const OffeneEinlagerungen = ({ setType, type }) => {
  const initFunc = (dispatch) => {
    dispatch(fetchEinlagerungen);
  };

  const [updateEinlagerung, setUpdateEinlagerung] = useState(false);

  return (
    <>
      <Parent
        header={{
          name: "Alle Einlagerungen",
          setType: setType,
          type: type,
          sub_pages: SUB_PAGES,
        }}
        table={{
          columnsArr: columns,
          dataName: "einlagerungen",
          initFunc: (dispatch) => dispatch(fetchEinlagerungen()),
          middleware: [(data) => console.log("DATA VALIDATION")],
          clickRow: {
            func: (rowData, setRowData) => (
              <Test rowData={rowData} setRowData={setRowData} />
            ),
            baseComponent: {
              type: "Empty",
              headline: "",
              settings: {},
            },
          },
        }}
      />
    </>
  );
};

const sortRows = (rows) => {
  return rows.sort((a, b) => {
    if (a.isEmpty && !b.isEmpty) return -1;
    if (a.open <= b.open) return 1;
    else return -1;
  });
};

const Test = ({ rowData, setRowData, isSubmitted }) => {
  const storage = useSelector((state) => state.base.storage);
  const [row, selectRow] = useState(null);

  useEffect(() => {
    selectRow(rowData.original);
  }, [rowData]);
  useEffect(() => {
    if (isSubmitted) {
      submitOrder();
    }
  }, [isSubmitted]);

  const submitOrder = () => {
    console.log("suubmit order... API CALL HERE", row);

    // showSuccessScreen("Einlagerung abgeschlossen");
    // setTimeout(() => showSuccessScreen(false), 2000);

    // setOpenOrders([
    //   ...openOrders.filter((order) => order.id !== selectedRow.id),
    // ]);
    // selectRow(null);
  };

  const removeRow = () => {
    setRowData(null);
  };

  return (
    <>
      <ValidationModal
        selectRow={setRowData}
        selectedRow={row}
        removeRow={removeRow}
        submitOrder={submitOrder}
        openRows={sortRows(storage)}
      />
    </>
  );
};
