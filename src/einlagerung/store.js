import axios from "axios";
import { einlagerungen, storage, REM } from "../testData";
import {
  SET_STORAGE_BRIDGES,
  SET_STORAGE,
} from "../baseComponents/store/types";

const SET_EINLAGERUNGEN = "SET_EINLAGERUNGEN";
const SET_EINLAGERUNGEN_FULFILLED = "SET_EINLAGERUNGEN_FULFILLED";
const SELECT_BRIDGE = "SELECT_BRIDGE";
const IS_DOG = "IS_DOG";

const initialState = {
  fetching: null,
  einlagerungen: null,
  dog: null,
  error: false,
};

// -------------------------REDUCER--------------------------------
// ---------------------------------------------------------------

export default function (state = initialState, action) {
  // console.log("ACTION REDUCER == ", action);

  if (action.type.includes("_PENDING")) {
    return {
      ...state,
      fetching: true,
    };
  }

  switch (action.type) {
    case SET_EINLAGERUNGEN:
      return {
        ...state,
        einlagerungen: action.payload,
        fetching: false,
      };

    case IS_DOG + "_FULFILLED":
      return {
        ...state,
        dog: action.payload,
        fetching: false,
      };

    case IS_DOG + "_REJECTED":
      return {
        ...state,
        fetching: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

// -------------------------ACTIONS--------------------------------
// ---------------------------------------------------------------
const APPENDIX = "einlagerung";

export const fetchEinlagerungen = () => (dispatch, getState) => {
  // const url = "https://dog.ceo/api/breeds/image/randomm";

  // console.log("fetch einlagerungen....");

  // const res = dispatch({
  //   type: IS_DOG,
  //   payload: axios.get(url),
  //   dataName: "message",
  //   APPENDIX,
  // });

  dispatch({
    type: SET_EINLAGERUNGEN,
    payload: einlagerungen,
  });
};

export const selectBridge = (storageBridges, selectedBridge, values) => (
  dispatch,
  getState
) => {
  const keyValueNames = [
    "customer_id",
    "product_id",
    "employee_id",
    "notes",
    "datetime",
    "quantity",
  ];

  console.log("UPDATE STORAGE...", storageBridges);
  console.log("selectRow", selectedBridge);
  console.log("values = ", values);

  selectedBridge = selectedBridge.storageBridges;
  selectedBridge["isEmpty"] = false;

  // debugger;

  // copyKeyValuesByName(keyValueNames, values, selectedBridge);

  storageBridges.forEach((bridge) => {
    if (bridge.bridge_id !== selectedBridge.bridge_id) {
      bridge = selectedBridge;
    }
  });

  dispatch({ type: SET_STORAGE_BRIDGES, payload: storageBridges });
};

export const selectRow = (storage, selectedRow, values) => (
  dispatch,
  getState
) => {
  // const quantityLeft = selectedRow.open - selectedQuantity;
  // selectedRow.open = quantityLeft > 0 ? quantityLeft : 0;

  const selectedQuantity = parseInt(values.quantity);
  const freeSpace = selectedRow.maxStock - selectedRow.stock;

  const quantityToStore =
    selectedQuantity > freeSpace ? freeSpace : selectedQuantity;

  selectedRow.stock += quantityToStore;
  selectedRow.isEmpty = false;
  selectedRow.isFull =
    selectedRow.stock === selectedRow.maxStock ? true : false;

  storage.forEach((row) => {
    if (row.row_id !== selectedRow.row_id) {
      row = selectedRow;
    }
  });

  dispatch({ type: SET_STORAGE, payload: storage });
};

const copyKeyValuesByName = (keyValueNames, from, to) => {
  keyValueNames.forEach((name) => {
    to[name] = from[name];
  });
};
