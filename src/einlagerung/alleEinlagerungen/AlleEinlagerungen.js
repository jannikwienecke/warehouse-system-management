import React, { useState, useEffect } from "react";

import { SUB_PAGES } from "../data";
import { mockAPI, setArrInputSize } from "../../functions/utils";
import { dataRequest } from "./data";

import { INPUT, COLUMNS } from "../../baseComponents/base";
import { endGreaterStart, extractIdentifier } from "../../functions/middleware";
import { Parent } from "../../baseComponents/Parent";
import { fetchEinlagerungen } from "../store";
import { useDispatch } from "react-redux";

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
  const props = {
    name: "AlleEinlagerungen",
    formApiRequest: (parameter) =>
      (dataRequest, parameter, 1000).then((res) => res),
    table: {
      columnsArr: columns,
      dataName: "einlagerungen",
      initFunc: (dispatch) => dispatch(fetchEinlagerungen()),
    },
    form: {
      formTitle: "Einlagerungen Suchen",
      arrInput: arrInput,
      middlewareValidation: [endGreaterStart],
      middlewareParse: [extractIdentifier],
      requiredArguments: [INPUT.customers.name],
      apiFunc: (dispatch, parameter) =>
        mockAPI(dataRequest, parameter, 1000).then((res) =>
          dispatch(fetchEinlagerungen)
        ),
    },
  };

  return (
    <Parent {...props} setType={setTimeout} type={type} sub_pages={SUB_PAGES} />
  );
};
