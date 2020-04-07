import { EXCEPTIONS } from "../baseComponents/base";

export const getDateString = (date) => {
  var month = date.getMonth();
  var year = date.getFullYear();
  var day = date.getDay();

  day = day >= 10 ? day : `0${day}`;
  month = month >= 10 ? month : `0${month}`;

  return `${year}-${month}-${day}`;
};

export const sum = (arr) => {
  return arr.reduce((pv, cv) => pv + cv, 0);
};

export const mockAPI = (data, time) => {
  time = time ? time : 100;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: "ok",
        data,
      });
    }, time);
  });
};

export const copy = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

const dictonary = {
  quantity: "Anzahl",
};

export const translate = (text) => {
  if (text in dictonary) {
    return dictonary[text];
  }

  return text;
};

export const setArrInputSize = (arr, size) => {
  arr.forEach((input) => {
    input.size = size;
  });
};

export const traceDataName = (state, toFind, traceKeys) => {
  // RETURNS KEY HIERACHY TILL THE INPUT KEY IS FOUND
  // obj = {
  // person: {
  // name : {last: Wienecke, first: Jannik}
  // }
  // }
  // toFind 'first' --> ['person', ['name']]
  if (!state || typeof state !== "object" || state.length) {
    traceKeys = [];
    return;
  }

  var keys = Object.keys(state, keys);
  var found = false;

  if (keys.includes(toFind)) {
    EXCEPTIONS.BreakException = { trace: [...traceKeys] };
    throw EXCEPTIONS.BreakException;
  }

  keys.forEach((key) => {
    var sub_state = state[key];
    traceDataName(sub_state, toFind, [...traceKeys, key]);
  });
};

export const getDataByTrace = (state, dataName, trace) => {
  // RETIEVES DATA FROM OBJ BY A LIST OF KEYS
  // obj['person']['name'] = 'JANNIK'
  // ['person', 'name'] --> 'Jannik'
  var sub_state = null;
  trace.forEach((key) => {
    sub_state = state[key];
  });
  return sub_state[dataName];
};

export const runMiddleware = (
  middlewareStack,
  data,
  recursiveFunc,
  setError
) => {
  if (middlewareStack.length === 0) return;
  const middleware = middlewareStack.pop();

  try {
    middleware(data);
  } catch (e) {
    if (
      e !== EXCEPTIONS.ValidationException &&
      e !== EXCEPTIONS.ParseException
    ) {
      console.log("run Middleware Error Form.js", e);
      throw e;
    } else {
      setError(e);
    }
  }
  recursiveFunc(data);
};
