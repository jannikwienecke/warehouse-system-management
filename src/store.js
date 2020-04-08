import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import rootReducer from "./rootReducer";

import promise_helper from "./functions/redux-middleware";

const initialState = {};

// const middleware = [thunk, promise];
const middleware = [thunk, promise_helper];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
