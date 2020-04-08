// import axios from "axios";

import {
  SET_CUSTOMER,
  SET_PRODUCTS,
  SET_STORAGE,
  SET_EMPLOYEES,
  SET_STORAGE_BRIDGES,
} from "./types";
import {
  customers,
  products,
  storage,
  employees,
  storageBridges,
} from "../../testData";

// const apiCall = (obj) => setTimeout(() => obj, 200);

export const fetchCustomer = () => (dispatch, getState) => {
  setTimeout(() => {
    dispatch({ type: SET_CUSTOMER, payload: customers });
  }, 50);
};

export const fetchProducts = () => (dispatch, getState) => {
  setTimeout(() => {
    dispatch({ type: SET_PRODUCTS, payload: products });
  }, 50);
};

export const fetchStorage = () => (dispatch, getState) => {
  setTimeout(() => {
    dispatch({ type: SET_STORAGE, payload: storage });
  }, 50);
};

export const fetchStorageBridges = () => (dispatch, getState) => {
  setTimeout(() => {
    dispatch({ type: SET_STORAGE_BRIDGES, payload: storageBridges });
  }, 50);
};

export const fetchEmployees = () => (dispatch, getState) => {
  setTimeout(() => {
    dispatch({ type: SET_EMPLOYEES, payload: employees });
  }, 50);
};
