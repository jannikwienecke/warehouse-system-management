import { INPUT, getInputField } from "../baseComponents/base";
import { translate, getTypeColumnBySchema } from "../functions/utils";

export const getArrInput = (dataType, sizeFields, currentSchema) => {
  const addFuzzySearch = (arrInput_) => {
    const fuzzy_input = Object.assign({}, INPUT.text);
    fuzzy_input.name = "search";
    fuzzy_input.placeholder = "Alles Durchsuchen";
    fuzzy_input.size = 12;
    arrInput_.push(fuzzy_input);
  };

  const addInputToArray = (input, key) => {
    if (input.type !== "input") {
      input.name = key;
      input.placeholder = translate(key);
    }
    input.size = sizeFields;
    arrInput_.push(Object.assign({}, input));
  };

  const isSearchParameter = (key) => {
    var isSearchParameter = currentSchema[dataType].parameter.find(
      (para) => para.name === key || para.name === key + "Id"
    );
    if (isSearchParameter) return true;
  };

  const loopKeysTable = () => {
    arrInput_ = [getInputField(dataType, "object")];
    schemaFields.forEach((column) => {
      const key = column.name;
      if (key.includes("__type")) return;
      if (!isSearchParameter(key)) return;

      let typeColumn = getTypeColumnBySchema(column.name, schemaFields);
      let inputField = getInputField(column.name, typeColumn);

      if (!inputField) {
        console.log("Key not implemented: ", column.name);
        return;
      }

      addInputToArray(inputField, column.name);
    });
  };

  const schemaFields = currentSchema[dataType].fields;
  let arrInput_;

  loopKeysTable();
  addFuzzySearch(arrInput_);
  return arrInput_;
};

export const getIdentifierField = (schemaField) => {
  let identifierField = schemaField.fields.find((field) => {
    if (!field.type.ofType) return false;
    return field.type.ofType.name === "ID";
  });
  return identifierField;
};

export const _parseParameter = (parameter, dataType, currentSchema) => {
  if (!parameter) return parameter;

  let columnFields = currentSchema[dataType].fields;

  Object.keys(parameter).forEach((key) => {
    let val = parameter[key];

    if (!val) {
      parameter[key] = undefined;
      return;
    }

    let type = getTypeColumnBySchema(key, columnFields);

    if (!type || type !== "object") return;

    if (key === dataType) {
      let identifierField = getIdentifierField(currentSchema[dataType]);
      let identifierName = identifierField.name;
      parameter[identifierName] = parseInt(val[identifierName]);
    }

    if (type === "boolean") {
      parameter[key] = val.value;
    } else {
      const key_obj = key.slice(0, -1) + "Id";
      parameter[key_obj] = parseInt(val["id"]);
    }
  });

  return parameter;
};
