import React, { useState, useEffect } from "react";
import { Parent } from "../baseComponents/Parent";
import { COLUMNS, INPUT, INPUT_TYPES } from "../baseComponents/base";
import { withApollo } from "react-apollo";
import { INIT_QUERY, PRODUCT_QUERY } from "../queries/queries";
import { setArrInputSize, translate, copy } from "../functions/utils";
import { extractIdentifier } from "../functions/middleware";

const SIZE_FIELDS = 6;

const GraphQl = (props) => {
  const [tableData, setTableData] = useState([]);
  const [tableColumns, setTableColumns] = useState([]);
  const [arrInput, setArrInput] = useState(null);
  const [dataType, setDataType] = useState("products");

  useEffect(() => {
    getTableData();
  }, []);

  useEffect(() => {
    if (tableData.length > 0 && tableColumns.length === 0) {
      getTableColumns();
    }
  }, [tableData]);

  useEffect(() => {
    setArrInput([]);
    setTableColumns([]);
  }, [dataType]);

  const _parseParameter = (parameter) => {
    if (!parameter) return;
    Object.keys(parameter).forEach((key) => {
      const val = parameter[key];
      if (typeof val !== "object") {
        return;
      }

      if (key === dataType) {
        parameter["id"] = val["id"];
      } else if (typeof val.value === "boolean") {
        parameter[key] = val.value;
      } else {
        const key_obj = key.slice(0, -1) + "Id";

        parameter[key_obj] = val["id"];
      }
    });
  };

  const getTableData = async (parameter) => {
    _parseParameter(parameter);

    console.log("PARAMETER=", parameter);

    const result = await props.client.query({
      query: PRODUCT_QUERY,
      variables: { ...parameter },
    });

    setTableData(result.data.products);
  };

  const getTableColumns = () => {
    const keysTable = Object.keys(tableData[0]);

    const columns = keysTable.map((key) => {
      const val = tableData[0][key];
      if (typeof val === "object") return null;

      return [translate(key), key];
    });

    setTableColumns(columns);
    getArrInput();
  };

  const getArrInput = () => {
    const sampleData = tableData[0];
    const keysTable = Object.keys(tableData[0]);

    let arrInput_ = [INPUT_TYPES[dataType][dataType]];

    const columns = keysTable.forEach((key) => {
      if (key.includes("__type")) return;

      const placeholder = translate(key);
      const typeColumn = typeof sampleData[key];

      if (typeColumn == "object") {
        key = key + "s";
        var input = INPUT[key];
        if (!input) return;
      } else {
        var input = INPUT[typeColumn];
      }

      input.name = key;
      input.placeholder = placeholder;
      input.size = SIZE_FIELDS;

      arrInput_.push(Object.assign({}, input));
    });

    const fuzzy_input = INPUT.text;
    fuzzy_input.name = "search";
    fuzzy_input.placeholder = "Fuzzy Search";
    fuzzy_input.size = 12;
    arrInput_.push(fuzzy_input);
    setArrInput(arrInput_);
  };

  return (
    <>
      <Parent
        header={{
          name: "Alle Auslagerunge",
          setType: null,
          type: null,
          sub_pages: [],
        }}
      />

      <Parent
        table={{
          columnsArr: tableColumns,
          dataName: "auslagerungen",
          data: tableData,
          initFunc: (dispatch) => null,
          middleware: [(data) => console.log("DATA VALIDATION")],

          clickRow: {
            func: (rowData) => null,
          },
        }}
        form={{
          formTitle: "Auslagerungen Suchen",
          arrInput: arrInput,
          middlewareValidation: [],
          middlewareParse: [],
          requiredArguments: [],
          cardWrapper: true,
          apiFunc: (dispatch, parameter) => getTableData(parameter),
        }}
      />
    </>
  );
};

export default withApollo(GraphQl);
