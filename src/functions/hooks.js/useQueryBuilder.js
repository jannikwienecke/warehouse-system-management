import gql from "graphql-tag";

import {
  RETURN_VALUES,
  QUERY_TRANSLATE,
  nullQuery,
  nullMutation,
} from "../../queries";
import { getTypeColumnBySchema } from "../utils";
import { getIdentifierField } from "../../wareBaseData/helperUseGraphql";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { setInitData } from "../../baseComponents/store/actions";

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
    if (queryList && queryList.length > 0 && queryType) {
      loopQueries();
    } else if (queryType && queryList && queryList.length == 0) {
      setQuery(queryType === "get" ? nullQuery : nullMutation);
    }
  }, [queryList, queryType]);

  const setQueryString = (parameter, modelName) => {
    const _validateVal = (val) => {
      if (typeof val === "string") {
        let val_ = parseInt(val);
        if (String(val_) !== "NaN") {
          val = val_;
        }
      }

      if (typeof val === "number" && isNaN(val)) {
        val = 0;
      }
      if (!val && val !== 0 && val !== false && val !== "") val = undefined;

      return val;
    };

    let queryStr = "";
    if (!parameter) return queryStr;
    Object.keys(parameter).forEach((key) => {
      var val = parameter[key];
      console.log("BEFORE= ", val);
      val = _validateVal(val);
      console.log("VAL = ", val);

      if (val === undefined) return;

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
        if (typeof val !== "boolean") {
          val = val.value === "Ja" ? true : false;
        }
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
      if (!schemaModel.fields) {
        return;
      }

      return schemaModel.fields.map((field) => {
        if (["createdBy", "createdAt"].includes(field.name)) return null;
        if (field.name.slice(-5) === "_name") {
          console.log("RETURN HIER", field);
          return;
        }

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

  const buildQuery = (queryName, queryStr, modelName, alias) => {
    // console.log(queryName, queryStr, modelName, alias);

    if (options && options.queryName === "__schema") {
      var returnString = returnValues ? returnValues : RETURN_VALUES[modelName];
    } else {
      if (queryType === "delete") {
        var returnValues_ = ["id"];
      } else {
        var returnValues_ = buildReturnQuery(schema, modelName);
        // console.log("restul ", returnValues_);
      }

      var returnString = createReturnString(returnValues_);
    }
    let queryAlias = queryType + "_" + "counter";

    let aliasStr = alias ? `${alias}: ` : "";

    return `
    ${aliasStr} ${queryName} ${queryStr}{
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
    if (!queryList[0].modelName) {
      setQuery(queryType === "get" ? nullQuery : nullMutation);
      setQuery(queryType === "get" ? nullQuery : nullMutation);
      return;
    }
    queryList.map((query) => {
      var { modelName, parameter, alias } = query;

      // console.log("mode", modelName);
      // console.log("para", parameter);

      const queryName = getQueryName(modelName, queryType);
      // console.log("queryname", queryName);

      const queryStr = setQueryString(parameter, modelName);

      const builtQuery = buildQuery(queryName, queryStr, modelName, alias);
      // console.log(builtQuery);

      listBuiltQueries.push(builtQuery);
    });

    setQuery(completeQuery());
  };

  return query;
};

// '---------------------------------------'
// '---------------------------------------'
// '---------------------------------------'
// '---------------------------------------'
// '---------------------------------------'
