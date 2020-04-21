import gql from "graphql-tag";

import {
  RETURN_VALUES,
  QUERY_TRANSLATE,
  nullQuery,
  nullMutation,
} from "../../queries";
import { getTypeColumnBySchema } from "../utils";
import { getIdentifierField } from "../../wareBaseData/helperUseGraphql";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

const numberTypes = ["boolean", "number", "id", "int"];
export const useQueryBuilder = (
  queryList,
  queryType,
  options,
  returnValues = null
) => {
  const [query, setQuery] = useState(
    queryType === "get" ? nullQuery : nullMutation
  );

  const __schema = useSelector((state) => state.base.__schema);
  const schema = useSelector((state) => state.base.currentSchema);

  useEffect(() => {
    if (queryList && queryType) {
      loopQueries();
    }
  }, [queryList, queryType]);

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
        if (["createdBy", "createdAt"].includes(field.name)) return null;

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
    if (options && options.queryName === "__schema") {
      var returnString = returnValues ? returnValues : RETURN_VALUES[modelName];
    } else {
      if (queryType === "delete") {
        var returnValues_ = ["id"];
      } else {
        var returnValues_ = buildReturnQuery(schema, modelName);
      }

      var returnString = createReturnString(returnValues_);
    }

    return `
    ${queryName} ${queryStr}{
      ${returnString}
    }
  `;
  };

  const getQueryName = (modelName) => {
    const queryNameMapper = {
      put: "update",
      post: "create",
      delete: "delete",
    };

    let query = queryNameMapper[queryType];
    if (queryType === "get") {
      return modelName;
    }

    // dbugger",
    modelName =
      modelName.slice(-3) === "ies"
        ? modelName.replace("ies", "y")
        : modelName.slice(0, -1);

    let queryObject = __schema.types.find((type) => {
      type = type.name.toLowerCase();
      return type.includes(query) && type.includes(modelName);
    });

    let name = queryObject.name;
    return name.slice(0, 1).toLowerCase() + name.slice(1);
  };

  const loopQueries = () => {
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

    var listBuiltQueries = [];
    queryList.map((query) => {
      var { modelName, parameter } = query;

      const queryName = getQueryName(modelName, queryType);
      // console.log("queryname", queryName);

      const queryStr = setQueryString(parameter, modelName);

      const builtQuery = buildQuery(queryName, queryStr, modelName);
      // console.log(builtQuery);

      listBuiltQueries.push(builtQuery);
    });

    setQuery(completeQuery());
  };

  return query;
};

export const useUpdateStore = (dataType) => {
  const GET_ALL_ELEMENTS = useQueryBuilder([{ modelName: dataType }], "get");

  const updateStore = (cache, data, parameter) => {
    const response = cache.readQuery({ query: GET_ALL_ELEMENTS });
    const fetchElements = data[Object.keys(data)[0]];
    const _add = () => {
      return response[dataType].concat([fetchElements]);
    };
    const _update = () => {
      return response[dataType].map((data) => {
        if (parseInt(data.id) == parameter.id) {
          return fetchElements;
        } else {
          return data;
        }
      });
    };
    const _delete = () => {
      return response[dataType].filter(
        (data) => parseInt(data.id) !== parseInt(parameter.id)
      );
    };
    const dict_func = {
      put: _update,
      delete: _delete,
      post: _add,
    };
    var data_ = dict_func[parameter.action]();

    cache.writeQuery({
      query: GET_ALL_ELEMENTS,
      data: { [dataType]: data_ },
    });
  };

  return updateStore;
};
