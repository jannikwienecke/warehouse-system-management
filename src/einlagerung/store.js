import { einlagerungen } from "../testData";

const SET_EINLAGERUNGEN = "SET_EINLAGERUNGEN";

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
