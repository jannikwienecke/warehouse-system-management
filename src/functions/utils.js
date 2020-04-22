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
    nameToFind =
      nameToFind.length > 5
        ? nameToFind.toLowerCase().slice(0, -3)
        : nameToFind.toLowerCase().slice(0, -1);
    var modelType_ = __schema.types.find((type) => {
      // console.log("NAME TO FIND", nameToFind);

      return type.name.toLowerCase().includes(nameToFind);
    });

    return Object.assign({}, modelType_);
  };

  const _updateSchema = (name, fields) => {
    var modelToUpdate = modelType.fields.find((field) => {
      const ofType = field.type.ofType;

      return (ofType && ofType.name === name) || field.type.name === name;
    });

    modelToUpdate["fields"] = fields;
  };

  const isObjectModel = (field) => {
    const ofType = field.type.ofType;
    if (ofType && ofType.kind === "OBJECT") {
      return field.type.ofType.name;
    }
    if (field.type.kind === "OBJECT") {
      return field.type.name;
    }
  };

  const _parse = () => {
    modelType.fields.forEach((field) => {
      const nameOfType = isObjectModel(field);
      if (!nameOfType) return;

      const modelType = _getModelType(nameOfType);

      modelType.fields = modelType.fields.filter((field) => {
        if (!field.type.ofType) return true;
        if (field.type.ofType.kind !== "OBJECT") return true;
      });

      _updateSchema(nameOfType, modelType.fields);
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

  let toFind =
    columnName.length > 4 ? columnName.slice(0, -3) : columnName.slice(0, -1);

  const schemaColumn = schemaFields.find((field) => {
    return field.name === columnName || field.name.includes(toFind);
  });

  if (!schemaColumn) return;

  let typeColumn = schemaColumn.type;

  if (typeColumn.ofType) {
    if (typeColumn.ofType.kind.toLowerCase() === "object") {
      typeColumn = typeColumn.ofType.kind;
    } else {
      typeColumn = typeColumn.ofType.name;
    }
  } else if (typeColumn.kind.toLowerCase() === "object") {
    typeColumn = "OBJECT";
  } else {
    typeColumn = typeColumn.name;
  }
  typeColumn = typeColumn ? typeColumn.toLowerCase() : typeColumn;
  return [typeColumn, schemaColumn];
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
};

export const parseArrInput = (arrInput, values, dataType) => {
  const handleInputType = (input) => {
    const { name, identifier, labelName, id } = input;
    const valueName = name.slice(0, -1);

    let identifierVal;
    let labelNameVal;

    if (typeof values[name] === "boolean") {
      identifierVal = values[name];
      labelNameVal = identifierVal ? "Ja" : "Nein";
    } else if (values[valueName]) {
      identifierVal = values[valueName][identifier];
      labelNameVal = values[valueName][labelName];
    }

    input.default = {
      [identifier]: identifierVal,
      [labelName]: labelNameVal,
    };
  };

  const loopArr = () => {
    arrInput.forEach((input) => {
      if (ignoreInputList.includes(input.name)) {
        return null;
      } else if (input.type === "input") {
        handleInputType(input);
      } else {
        input.default = values[input.name];
      }
      return arrInput_.push(input);
    });
  };

  const ignoreInputList = ["search", "id", dataType];
  let arrInput_ = [];
  loopArr();

  return arrInput_;
};
