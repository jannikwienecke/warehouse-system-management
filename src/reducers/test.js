const initialState = {
  leads: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case true:
      return {
        ...state,
        leads: [1, 2, 3],
      };

    default:
      return state;
  }
}
