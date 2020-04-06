// import axios from "axios";

import { SET_CUSTOMER, SET_PRODUCTS } from "./types";
import { customers, products } from "../../testData";

const apiCall = (obj) => setTimeout(() => obj, 200);

export const fetchCustomer = () => (dispatch, getState) => {
  //   dispatch(apiCall({ type: SET_CUSTOMER, payload: customers }));

  setTimeout(() => {
    dispatch({ type: SET_CUSTOMER, payload: customers });
  }, 500);
};

export const fetchProducts = () => (dispatch, getState) => {
  //   dispatch(apiCall({ type: SET_PRODUCTS, payload: products }));
  setTimeout(() => {
    dispatch({ type: SET_PRODUCTS, payload: products });
  }, 500);
};
