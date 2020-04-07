import {
  SET_CUSTOMER,
  SET_PRODUCTS,
  SET_STORAGE,
  SET_EMPLOYEES,
} from "./types";

const initialState = {
  storage: null,
  customers: null,
  products: null,
  employees: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
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

    case SET_EMPLOYEES:
      return {
        ...state,
        employees: action.payload,
      };

    default:
      return state;
  }
}
