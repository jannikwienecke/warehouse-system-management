import {
  SET_INIT,
  SET_CUSTOMER,
  SET_PRODUCTS,
  SET_STORAGE,
  SET_STORAGE_BRIDGES,
  SET_EMPLOYEES,
  SET_ERROR,
  SET_SYM_BUILDINGS,
  SET_WAREHOUSE,
  SET_COMPARTMENTS,
} from "./types";

const initialState = {
  storage: null,
  storageBridges: null,
  customers: null,
  products: null,
  employees: null,
  symBuildings: null,
  compartments: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_INIT:
      return action.payload;

    case SET_CUSTOMER:
      return {
        ...state,
        customers: action.payload,
      };

    case SET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };

    case SET_STORAGE:
      return {
        ...state,
        storage: action.payload,
      };
    case SET_STORAGE_BRIDGES:
      return {
        ...state,
        storageBridges: action.payload,
      };

    case SET_EMPLOYEES:
      return {
        ...state,
        employees: action.payload,
      };

    case SET_SYM_BUILDINGS:
      return {
        ...state,
        symBuildings: action.payload,
      };

    case SET_COMPARTMENTS:
      return {
        ...state,
        compartments: action.payload,
      };

    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
}
