import React, { useState, useEffect } from "react";
import { withApollo } from "react-apollo";

import { translate } from "../functions/utils";
import { Parent } from "../baseComponents/Parent";
import { INPUT } from "../baseComponents/base";
import { QUERY_DICT } from "../queries/queries";
import DetailView from "./DetailView";
import styled from "styled-components";
import { MySelect } from "../components/select/MySelect";
import { SuccessScreen } from "../common/SuccessScreen";

const SIZE_FIELDS = 6;
const UPDATE_BTN_TEXT = "Ändern";

const GraphQl = (props) => {
  const [tableData, setTableData] = useState([]);
  const [tableColumns, setTableColumns] = useState([]);
  const [arrInput, setArrInput] = useState(null);
  const [dataType, setDataType] = useState("packagings");
  const [successScreen, showSuccessScreen] = useState(null);

  useEffect(() => {
    getTableData();
  }, []);

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

  const changeScreen = () => {
    showSuccessScreen(true);
    setTimeout(() => {
      showSuccessScreen(false);
    }, 1500);
  };
  useEffect(() => {
    setTableData([]);
    getTableData();
    setTableColumns([]);
  }, [dataType]);

  const _parseParameter = (parameter) => {
    if (!parameter) return;

    Object.keys(parameter).forEach((key) => {
      let val = parameter[key];

      if (val === "") parameter[key] = undefined;

      if (typeof val !== "object") return;

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

    const result = await props.client.query({
      query: QUERY_DICT[dataType].query_,
      variables: { ...parameter },
    });

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

  const getArrInput = () => {
    const addInputToArray = (input, key) => {
      input.name = key;
      input.placeholder = translate(key);
      input.size = SIZE_FIELDS;
      arrInput_.push(Object.assign({}, input));
    };

    const loopKeysTable = () => {
      keysTable.forEach((key) => {
        if (key.includes("__type")) return;

        const typeColumn = typeof sampleData[key];

        if (typeColumn === "object") {
          key = key + "s";
          var input = INPUT[key];
          if (!input) return;
        } else {
          var input = INPUT[typeColumn];
        }
        addInputToArray(input, key);
      });
    };

    const sampleData = tableData[0];
    const keysTable = Object.keys(sampleData);
    let arrInput_ = [INPUT[dataType]];

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

  const options_ = [
    { value: "products", label: "Produkte" },
    { value: "packagings", label: "Verpackungen" },
  ];

  const validateSelection = (selection) => {
    if (selection.option) {
      console.log("SET...", selection.option.value);
      changeScreen();
      setDataType(selection.option.value);
    }
  };

  return (
    <>
      <Parent
        header={{
          setType: null,
          type: "Stammdaten",
          sub_pages: [],
        }}
      />
      {successScreen ? (
        <SuccessScreen text={`Stammdaten: ${translate(dataType)}`} />
      ) : (
        <>
          <div style={{ width: "90%", margin: "0 auto" }}>
            <MySelect
              placeholder={"Stammdaten"}
              setValue={validateSelection}
              optionData={options_}
              // defaultFilter={"products"}
            />
          </div>

          <Parent
            table={{
              columnsArr: tableColumns,
              dataName: "auslagerungen",
              data: tableData,
              initFunc: (dispatch) => null,
              middleware: [(data) => null],
              clickRow: {
                func: (rowData) => {
                  return {
                    header: rowData.original.name,
                    btnList: [
                      {
                        func: (updatedRow) => null,
                        text: UPDATE_BTN_TEXT,
                      },
                    ],
                    children: (
                      <DetailView
                        rowData={rowData}
                        arrInput={arrInput}
                        dataType={dataType}
                        client={props.client}
                        trigger={UPDATE_BTN_TEXT}
                      />
                    ),
                  };
                },
                baseComponent: {
                  type: "Popup",
                  settings: {
                    height: "80vh",
                    heightHeader: "35%",
                    header: "Detail Ansicht",
                  },
                },
              },
            }}
            form={{
              formTitle: translate(dataType),
              arrInput: arrInput,
              // middlewareValidation: [],
              // middlewareParse: [],
              // requiredArguments: [],
              cardWrapper: true,
              apiFunc: (dispatch, parameter) => getTableData(parameter),
            }}
          />
        </>
      )}
    </>
  );
};

export default withApollo(GraphQl);

const Menu = styled.div``;

const Item = styled.div``;
