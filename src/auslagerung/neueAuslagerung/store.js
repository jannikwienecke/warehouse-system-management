const SET_AUSLAGERUNGEN = "SET_AUSLAGERUNGEN";

const initialState = {
  auslagerungen: null,
};

// -------------------------REDUCER--------------------------------
// ---------------------------------------------------------------

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_AUSLAGERUNGEN:
      return {
        ...state,
        auslagerungen: action.payload,
      };

    default:
      return state;
  }
}

// -------------------------ACTIONS--------------------------------
// ---------------------------------------------------------------

export const fetchAuslagerungen = () => (dispatch, getState) => {
  dispatch({ type: SET_AUSLAGERUNGEN, payload: [1, 2, 3] });
};
