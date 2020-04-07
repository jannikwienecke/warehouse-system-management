import React, { useState, useEffect } from "react";

import { SUB_PAGES } from "../data";
import { mockAPI, setArrInputSize } from "../../functions/utils";
import { dataRequest } from "./data";

import { INPUT, COLUMNS } from "../../baseComponents/base";
import { endGreaterStart, extractIdentifier } from "../../functions/middleware";
import { Parent } from "../../baseComponents/Parent";
import { fetchEinlagerungen } from "../store";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router";
import ModularModal from "../../components/modal/Modal";

const columns = [
  COLUMNS.datetime,
  COLUMNS.customer,
  COLUMNS.product,
  COLUMNS.quantity,
  COLUMNS.einlagerer,
  COLUMNS.storage,
  COLUMNS.row,
];

const arrInput = [
  INPUT.customers,
  INPUT.products,
  INPUT.dateStart,
  INPUT.dateEnd,
];

setArrInputSize(arrInput, 6);

export const AlleEinlagerungen = ({ setType, type }) => {
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
          // clickRow: {
          //   func: (rowData) => <Test name="MY NAME" rowData={rowData} />,
          //   baseComponent: {
          //     type: "Modal",
          //   },
          // },
          clickRow: {
            func: (rowData) => <Test name="MY NAME" rowData={rowData} />,
            baseComponent: {
              type: "Popup",
              settings: {
                height: "80vh",
                heightHeader: "35%",
              },
            },
          },
        }}
        form={{
          formTitle: "Einlagerungen Suchen",
          arrInput: arrInput,
          middlewareValidation: [endGreaterStart],
          middlewareParse: [extractIdentifier],
          requiredArguments: [INPUT.customers.name],
          cardWrapper: true,
          apiFunc: (dispatch, parameter) => {
            return mockAPI(dataRequest, parameter, 1000).then((res) =>
              dispatch(fetchEinlagerungen)
            );
          },
        }}
      >
        {/* <Test /> */}
      </Parent>
    </>
  );
};

const Test = ({ name, rowData, isSubmitted }) => {
  console.log("ROW DATA TEST= ", rowData);

  useEffect(() => {
    console.log("SUBMIT FUNC", rowData);
  }, [isSubmitted]);

  return (
    <>
      <h1>Einlagerung</h1>
      <h3>Kunde : {rowData.original.customer_id}</h3>
    </>
  );
};
