import { SET_CUSTOMER, SET_PRODUCTS } from "./types";

const initialState = {
  customers: null,
  products: null,
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

    default:
      return state;
  }
}
