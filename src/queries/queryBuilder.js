import gql from "graphql-tag";

import { RETURN_VALUES, QUERY_DICT, QUERY_TRANSLATE } from "./queries";
import { getTypeColumnBySchema } from "../functions/utils";
import { getIdentifierField } from "../wareBaseData/helperUseGraphql";

const numberTypes = ["boolean", "number", "id", "int"];
export const queryBuilder = (
  queryList,
  queryType = "get",
  schema,
  returnValues = null
) => {
  const setQueryString = (parameter, modelName) => {
    let queryStr = "";
    if (!parameter) return queryStr;
    Object.keys(parameter).forEach((key) => {
      var val = parameter[key];

      if (!val && val !== 0) return;

      if (key === modelName && val) {
        queryStr += `id: ${parseInt(val["id"])} `;
        return;
      }

      let [type, schemaColumn] = getTypeColumnBySchema(
        key,
        schema[modelName].fields
      );

      if (type === "object") {
        let identifierField = getIdentifierField(schema[key]);
        if (identifierField) {
          let name = identifierField.name;

          queryStr += `${schemaColumn.name}Id : ${val[name]} `;
          return;
        } else {
          return;
        }
      }

      if (!type) return;

      if (type === "boolean") {
        val = val.value;
      }

      if (numberTypes.includes(type)) {
        queryStr += `${key} : ${val} `;
      } else {
        queryStr += `${key} : "${val}" `;
      }
    });

    if (!queryStr) return queryStr;

    return `(${queryStr})`;
  };

  const buildReturnQuery = (schema, modelName) => {
    const _getSchema = () => {
      if (modelName) {
        return schema[modelName];
      } else {
        return schema;
      }
    };

    const _loopFields = () => {
      let schemaModel = _getSchema();

      return schemaModel.fields.map((field) => {
        if (field.name === "createdBy") return null;

        if (field.name.slice(-3) === "Set") return;

        if (returnValues && !returnValues.includes(field.name)) {
          return null;
        }
        if (!field.fields) {
          return field.name;
        }
        const names = buildReturnQuery(field);
        return { name: field.name, names };
      });
    };

    return _loopFields();
  };

  const createReturnString = (returnValues) => {
    let str = "";
    returnValues.forEach((value) => {
      // console.log("value = ", value);

      if (!value) return;
      if (typeof value === "string") {
        str += value + " ";
        return;
      }

      const _subString = createReturnString(value.names);

      str += `${value.name} {
        ${_subString}
      }`;
    });

    return str;
  };

  const buildQuery = (queryName, queryStr, modelName) => {
    if (schema === "__schema") {
      var returnString = returnValues ? returnValues : RETURN_VALUES[modelName];
    } else {
      var returnValues_ = buildReturnQuery(schema, modelName);

      var returnString = createReturnString(returnValues_);
    }

    return `
    ${queryName} ${queryStr}{
      ${returnString}
    }
  `;
  };

  const completeQuery = (type) => {
    let str = "";
    listBuiltQueries.forEach((query) => {
      str += query + " ";
    });

    if (queryList[0].modelName !== "__schema") {
      // console.log(str);
    }

    return gql`
      ${QUERY_TRANSLATE[queryType]} {
       ${str}
      }
    `;
  };

  const getQueryName = (modelName) => {
    if (!QUERY_DICT[modelName] || !QUERY_DICT[modelName][queryType]) {
      alert("NOT IMPLEMENTED");
      return false;
    }

    return QUERY_DICT[modelName][queryType];
  };

  const loopQueries = () => {
    queryList.map((query) => {
      var { modelName, parameter } = query;
      // console.log("PARAMETER = ", parameter);

      const queryName = getQueryName(modelName, queryType);
      // console.log("queryname", queryName);

      const queryStr = setQueryString(parameter, modelName);

      const builtQuery = buildQuery(queryName, queryStr, modelName);
      // console.log(builtQuery);

      listBuiltQueries.push(builtQuery);
    });

    return completeQuery();
  };

  let listBuiltQueries = [];
  return loopQueries();
};

export const updateStore = (cache, data, dataType, parameter) => {
  const GET_ALL_ELEMENTS = queryBuilder(
    [{ modelName: dataType }],
    "get",
    parameter.currentSchema
  );
  const response = cache.readQuery({ query: GET_ALL_ELEMENTS });
  const fetchElements = data[Object.keys(data)[0]];

  const _add = () => {
    return response[dataType].concat([fetchElements]);
  };

  const _update = () => {
    return response[dataType].map((data) => {
      if (parseInt(data.id) === parameter.id) {
        return fetchElements;
      } else {
        return data;
      }
    });
  };

  const _delete = () => {
    return response[dataType].filter(
      (data) => parseInt(data.id) !== parameter.id
    );
  };

  const dict_func = {
    update: _update,
    delete: _delete,
    add: _add,
  };

  cache.writeQuery({
    query: GET_ALL_ELEMENTS,
    data: { [dataType]: dict_func[parameter.action]() },
  });
};
