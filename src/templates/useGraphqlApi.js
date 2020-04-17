import React, { useState, useEffect } from "react";
import { INPUT, getFormInput } from "../baseComponents/base";
import { translate } from "../functions/utils";
import { QUERY_DICT, queryBuilder } from "../queries/queryBuilder";

export const useGraphqlApi = (dataType, client, sizeFields = 6) => {
  const [tableData, setTableData] = useState([]);
  const [tableColumns, setTableColumns] = useState([]);
  const [arrInput, setArrInput] = useState(null);

  useEffect(() => {
    if (client && dataType) {
      setTableData([]);
      fetchData();
      setTableColumns([]);
    }
  }, [client, dataType]);

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

    const query = queryBuilder([{ modelName: dataType, parameter }]);

    const result = await client.query({
      query: query,
      //   variables: { ...parameter },
    });
    // F;
    // const result = await client.query({
    //   query: QUERY_DICT[dataType].query_,
    //   variables: { ...parameter },
    // });

    setTableData(result.data[dataType]);
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

        if (typeColumn === "object") {
          key = key + "s";

          var input = getFormInput(key);

          if (!input) return;
        } else {
          var input = getFormInput(typeColumn, key);
        }
        addInputToArray(input, key);
      });
    };

    const sampleData = tableData[0];
    const keysTable = Object.keys(sampleData);
    let arrInput_ = [getFormInput(dataType)];
    // let arrInput_ = [INPUT[dataType]()];
    console.log("ARR INPUT", arrInput_);
    // arrInput_();

    loopKeysTable();
    addFuzzySearch(arrInput_);
    setArrInput(arrInput_);
  };

  const addFuzzySearch = (arrInput_) => {
    const fuzzy_input = INPUT.text;
    fuzzy_input.name = "search";
    fuzzy_input.placeholder = "Alles Durchsuchen";
    fuzzy_input.size = 12;
    arrInput_.push(fuzzy_input);
  };
  return { arrInput, tableColumns, tableData, fetchData };
};
