import React, { useState, useEffect } from "react";
import { INPUT, getFormInput } from "../baseComponents/base";
import { translate, copy, createErrListFromApiError } from "../functions/utils";
import { QUERY_DICT, queryBuilder } from "../queries/queryBuilder";
import { useMutation, useQuery } from "react-apollo";
import { nullQuery } from "../queries/queries";
import { useDispatch } from "react-redux";

export const useGraphqlApi = (dataType, sizeFields = 6) => {
  const [tableData, setTableData] = useState([]);
  const [tableColumns, setTableColumns] = useState([]);
  const [arrInput, setArrInput] = useState(null);
  const [query, setQuery] = useState({ query: nullQuery });

  const { data, error, loading } = useQuery(query.query, {
    ...query.options,
    onError: (err) =>
      createErrListFromApiError(error, dispatch, "useGraphqlApi Fetching"),
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      setTableData(data[dataType]);
    }
  }, [data]);

  useEffect(() => {
    if (dataType) {
      setTableData([]);
      setTableColumns([]);
      fetchData();
    }
  }, [dataType]);

  useEffect(() => {
    if (tableData.length > 0 && tableColumns.length === 0) {
      getTableColumns();
    }
  }, [tableData]);

  useEffect(() => {
    if (tableColumns.length > 0) {
      getArrInput();
    }
  }, [tableColumns]);

  const fetchData = async (parameter) => {
    _parseParameter(parameter);
    const query_ = queryBuilder([{ modelName: dataType, parameter }]);
    setQuery({ query: query_ });
  };

  const getTableColumns = () => {
    const keysTable = Object.keys(tableData[0]);

    const columns = keysTable.map((key) => {
      const val = tableData[0][key];
      if (typeof val === "object") return null;

      return [translate(key), key];
    });

    setTableColumns(columns);
  };

  const _parseParameter = (parameter) => {
    if (!parameter) return;

    Object.keys(parameter).forEach((key) => {
      let val = parameter[key];

      if (val === "") parameter[key] = undefined;

      if (typeof val !== "object") return;

      if (key === dataType) {
        parameter["id"] = parseInt(val["id"]);
      } else if (typeof val.value === "boolean") {
        parameter[key] = val.value;
      } else {
        const key_obj = key.slice(0, -1) + "Id";
        parameter[key_obj] = parseInt(val["id"]);
      }
    });
  };
  const getArrInput = () => {
    const addInputToArray = (input, key) => {
      input.name = key;
      input.placeholder = translate(key);
      input.size = sizeFields;
      arrInput_.push(Object.assign({}, input));
    };

    const loopKeysTable = () => {
      keysTable.forEach((key) => {
        if (key.includes("__type")) return;

        const typeColumn = typeof sampleData[key];

        if (typeColumn === "object" && sampleData[key] !== null) {
          key = key + "s";

          var input = getFormInput(key);

          if (!input) return;
        } else {
          var input = getFormInput(typeColumn, key);
          if (!input) {
            input = getFormInput("text", key);
          }
        }
        addInputToArray(input, key);
      });
    };

    const sampleData = tableData[0];
    const keysTable = Object.keys(sampleData);
    let arrInput_ = [getFormInput(dataType)];

    loopKeysTable();
    addFuzzySearch(arrInput_);
    setArrInput(arrInput_);
  };

  const addFuzzySearch = (arrInput_) => {
    const fuzzy_input = Object.assign({}, INPUT.text);
    fuzzy_input.name = "search";
    fuzzy_input.placeholder = "Alles Durchsuchen";
    fuzzy_input.size = 12;
    arrInput_.push(fuzzy_input);
  };

  return { arrInput, tableColumns, tableData, fetchData };
};
