// import axios from "axios";

import {
  SET_INIT,
  SET_CUSTOMER,
  SET_PRODUCTS,
  SET_STORAGE,
  SET_EMPLOYEES,
  SET_STORAGE_BRIDGES,
  SET_SYM_BUILDINGS,
  SET_WAREHOUSE,
  SET_COMPARTMENTS,
  SET_ERROR,
} from "./types";
import {
  customers,
  products,
  storage,
  employees,
  storageBridges,
  symBuildings,
  compartments,
} from "../../testData";

// const apiCall = (obj) => setTimeout(() => obj, 200);

export const setInitData = (initData) => (dispatch, getState) => {
  dispatch({ type: SET_INIT, payload: initData });
};

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

export const fetchSymBuildings = () => (dispatch, getState) => {
  setTimeout(() => {
    dispatch({ type: SET_SYM_BUILDINGS, payload: symBuildings });
  }, 50);
};

export const fetchCompartments = () => (dispatch, getState) => {
  setTimeout(() => {
    dispatch({ type: SET_COMPARTMENTS, payload: compartments });
  }, 50);
};

export const showAlert = (msg, code) => (dispatch, getState) => {
  dispatch({
    type: SET_ERROR,
    payload: {
      code: code ? code : "USER_ERROR",
      message: msg,
    },
  });
};
