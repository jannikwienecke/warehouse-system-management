export default ({ dispatch }) => (next) => (action) => {
  if (action.type && action.type.includes("_REJECTED")) {
    if (action.APPENDIX && action.payload.message) {
      if (!action.payload.message.includes("reducer")) {
        action.payload.message = (
          action.payload.message + ` (reducer: ${action.APPENDIX})`
        ).slice(0, 150);
      }
    }

    setTimeout(() => {
      const error = dispatch({
        type: "SET_ERROR",
        payload: action.payload,
      });
    }, 10);
    dispatch({ type: "SET_ERROR", payload: null });

    return next(action);
  }

  if (!action.payload || !action.payload.then) {
    return next(action);
  }

  if (action.type && !action.type.includes("_PENDING")) {
    const pending = { ...action, type: action.type + "_PENDING" };
    dispatch(pending);
  }

  action.payload
    .then((res) => {
      const payload = action.dataName ? res.data[action.dataName] : res.data;
      const newAction = {
        ...action,
        payload: payload,
        type: action.type + "_FULFILLED",
      };
      dispatch(newAction);
    })
    .catch((err) => {
      const newAction = {
        ...action,
        payload: err.response.data,
        type: action.type + "_REJECTED",
      };
      dispatch(newAction);
    });
};
