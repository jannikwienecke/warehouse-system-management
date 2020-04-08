import { einlagerungen, storage } from "../testData";
import {
  SET_STORAGE_BRIDGES,
  SET_STORAGE,
} from "../baseComponents/store/types";

const SET_EINLAGERUNGEN = "SET_EINLAGERUNGEN";
const SELECT_BRIDGE = "SELECT_BRIDGE";

const initialState = {
  einlagerungen: null,
};

// -------------------------REDUCER--------------------------------
// ---------------------------------------------------------------

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_EINLAGERUNGEN:
      return {
        ...state,
        einlagerungen: action.payload,
      };
    default:
      return state;
  }
}

// -------------------------ACTIONS--------------------------------
// ---------------------------------------------------------------

export const fetchEinlagerungen = () => (dispatch, getState) => {
  dispatch({ type: SET_EINLAGERUNGEN, payload: einlagerungen });
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
  const quantityLeft = selectedRow.open - parseInt(values.quantity);
  selectedRow.open = quantityLeft > 0 ? quantityLeft : 0;
  selectedRow.isEmpty = false;
  selectedRow.isFull = selectedRow.open === 0 ? true : false;

  storage.forEach((row) => {
    if (row.row_id !== selectedRow.row_id) {
      row = selectedRow;
    }
  });

  //   customers: {id: 1, customer_id: "37HOSTIE", customer_name: "Stitebel Eltron", value: "37HOSTIE", label: "Stitebel Eltron"}
  // employees: {employee_id: "1", employee_name: "Fricke, Torben", value: "1", label: "Fricke, Torben"}
  // products: undefined
  // chargennummer: undefined
  // quantity: "12"
  // datetime: undefined
  // notes: undefined
  // customer_id: "37HOSTIE"
  // employee_id: "1"
  // }

  dispatch({ type: SET_STORAGE, payload: storage });
};

const copyKeyValuesByName = (keyValueNames, from, to) => {
  keyValueNames.forEach((name) => {
    to[name] = from[name];
  });
};
