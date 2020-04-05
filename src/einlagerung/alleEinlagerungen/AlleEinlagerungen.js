import React, { useState, useEffect } from "react";

import { SUB_PAGES } from "../data";
import { mockAPI, setArrInputSize } from "../../functions/utils";
import { data, dataRequest } from "./data";

import { INPUT, COLUMNS } from "../../baseComponents/base";
import { endGreaterStart, extractIdentifier } from "../../functions/middleware";
import { Parent } from "../../baseComponents/Parent";

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

const props = {
  name: "AlleEinlagerungen",
  initFunc: (func, parameter) =>
    mockAPI(data, parameter, 1000).then((res) => func(res.data)),
  initParameter: {},
  formApiRequest: (func, parameter) =>
    mockAPI(dataRequest, parameter, 1000).then((res) => func(res.data)),
  table: {
    columnsArr: columns,
  },
  form: {
    formTitle: "Einlagerungen Suchen",
    arrInput: arrInput,
    middlewareValidation: [endGreaterStart],
    middlewareParse: [extractIdentifier],
    requiredArguments: [INPUT.customers.name],
  },
};

export const AlleEinlagerungen = ({ setType, type }) => {
  return (
    <Parent {...props} setType={setTimeout} type={type} sub_pages={SUB_PAGES} />
  );
};
