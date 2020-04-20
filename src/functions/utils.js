import { EXCEPTIONS, INPUT } from "../baseComponents/base";
import { useRef, useEffect } from "react";
import { showAlert } from "../baseComponents/store/actions";

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

export const myDictonary = {
  quantity: "Anzahl",
  products: "Produkt",
  employees: "Mitarbeiter",
  customers: "Kunde",
  chargennummer: "Chargennummer",
  datetime: "Datum",
  notes: "Notizen",
  width: "Breite",
  length: "Länge",
  id: "ID",
  packagings: "Verpackung",
  name: "Name",
  productNumber: "Produkt Nr.",
  notesPicking: "Notiz Auslagerung",
  notesPutaway: "Notiz Einlagerung",
  threeInRow: "3 Pal. Möglich",
};

export const translate = (text, dictonary) => {
  let dictonary_ = dictonary ? dictonary : myDictonary;
  if (text in dictonary_) {
    return dictonary_[text];
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

export const get_input = (type, name, placeholder) => {
  var input = copy(INPUT[type]);
  input["name"] = name;
  input["placeholder"] = placeholder;
  return input;
};

export const useTraceUpdate = (props) => {
  const prev = useRef(props);
  useEffect(() => {
    const changedProps = Object.entries(props).reduce((ps, [k, v]) => {
      if (prev.current[k] !== v) {
        ps[k] = [prev.current[k], v];
      }
      return ps;
    }, {});
    if (Object.keys(changedProps).length > 0) {
      console.log("Changed props:", changedProps);
    }
    prev.current = props;
  });
};

// red positional arguments: 'name', 'product_number', 'three_in_row', and 'packaging_id'
export const parsePyToJsNameConvention = (names) => {
  return names.map((name) => {
    if (!name.includes("_")) return name;
    let renamed = "";

    let isDivider = false;
    Object.values(name).forEach((letter) => {
      if (!isDivider && letter !== "_") {
        renamed += letter;
      } else if (!isDivider && letter === "_") {
        isDivider = true;
      } else {
        renamed += letter.toUpperCase();
        isDivider = false;
      }
    });

    if (renamed.includes("Id")) {
      renamed = renamed.replace("Id", "s");
    }

    return renamed;
  });
};

export const _extractErrorParameter = (msg) => {
  console.log(msg);

  var words = [];
  let currentWord = "";
  if (msg.includes("missing") && msg.includes("positional")) {
    let isWord = false;
    Object.values(msg).forEach((letter) => {
      if (!currentWord && letter === "'") {
        isWord = true;
      } else if (isWord && letter === "'") {
        isWord = false;
        words.push(currentWord);
        currentWord = "";
      } else if (isWord) {
        currentWord += letter;
      }
    });
  }
  words = parsePyToJsNameConvention(words);
  return words.length > 0 ? words : null;
};

export const createErrListFromApiError = (
  apiError,
  dispatch,
  msgPrefix = ""
) => {
  var errorList;
  const errorKeys = ["graphQLErrors", "networkError"];
  errorKeys.forEach((key) => {
    try {
      if (key === "graphQLErrors") {
        errorList = apiError[key];
      } else {
        errorList = apiError[key].result.errors;
      }
    } catch (e) {
      if (!(e instanceof TypeError)) {
        throw e;
      }
      return [];
    }

    errorList.forEach((err) => {
      const errMsg = `${err.message} - Position ${JSON.stringify(
        err.locations
      )}`;
      dispatch(showAlert(msgPrefix + errMsg));
    });

    // errorList.forEach((errMsg) => store.dispatch(showAlert(errMsg)));
  });
  const errorMsg = errorList[0].message;
  const errorParameter = _extractErrorParameter(errorMsg);
  return { errorMsg, errorParameter };
};

export const removeErrors = (arrInput) => {
  arrInput.forEach((input) => {
    delete input["error"];
  });
};

export const findModelSchema = (dataType, __schema) => {
  const _getSchema = () => {
    let types = __schema.types.find((type) => type.name === "Query");
    schema = types.fields.find((field) => field.name === dataType);

    if (!schema) {
      types = __schema.types.find((type) => type.name === "Mutation");
      schema = types.fields.find((field) => field.name === dataType);
    }
  };

  const _getModelType = (nameToFind) => {
    return __schema.types.find((type) =>
      type.name.toLowerCase().includes(nameToFind.toLowerCase().slice(0, -1))
    );
  };

  const _updateSchema = (name, fields) => {
    var modelToUpdate = modelType.fields.find((field) => {
      const ofType = field.type.ofType;

      return ofType && ofType.name === name;
    });
    modelToUpdate["fields"] = fields;
  };

  const _parse = () => {
    modelType.fields.forEach((field) => {
      const ofType = field.type.ofType;

      if (ofType && ofType.kind === "OBJECT") {
        const nameOfType = field.type.ofType.name;

        const modelType = _getModelType(nameOfType);
        // console.log("MODEL", modelType);
        modelType.fields = modelType.fields.filter((field) => {
          // console.log("FIELD = ", field);

          if (!field.type.ofType) return true;
          if (field.type.ofType.kind !== "OBJECT") return true;
        });

        _updateSchema(nameOfType, modelType.fields);
      }
    });
  };

  let schema;
  _getSchema();
  let modelType = _getModelType(dataType);
  _parse();
  modelType["parameter"] = schema.args;
  return modelType;
};

export const getTypeColumnBySchema = (columnName, schemaFields) => {
  if (columnName === "search") return "string";

  const schemaColumn = schemaFields.find(
    (field) =>
      field.name === columnName || field.name === columnName.slice(0, -1)
  );

  if (!schemaColumn) return;

  let typeColumn = schemaColumn.type;
  if (typeColumn.ofType) {
    if (typeColumn.ofType.kind.toLowerCase() === "object") {
      typeColumn = typeColumn.ofType.kind;
    } else {
      typeColumn = typeColumn.ofType.name;
    }
  } else {
    typeColumn = typeColumn.name;
  }
  return typeColumn.toLowerCase();
};

export const _parseColumns = (columnsArr) => {
  if (columnsArr[0].accessor) {
    var columns = columnsArr;
  } else {
    var columns = [];
    columnsArr.forEach((column) => {
      if (column && column.length > 0 && column[0] !== "__typename") {
        columns.push({
          Header: column[0],
          accessor: column[1],
        });
      }
    });
  }

  return columns;
  // setColumns(columns_);
};
