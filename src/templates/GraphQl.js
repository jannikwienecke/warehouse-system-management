import React, { useState } from "react";
import { withApollo } from "react-apollo";

import { translate } from "../functions/utils";
import { Parent } from "../baseComponents/Parent";
import { INPUT, OPTIONS_BASE_DATA } from "../baseComponents/base";
import DetailView from "./DetailView";
import styled from "styled-components";
import { MySelect } from "../components/select/MySelect";
import { SuccessScreen } from "../common/SuccessScreen";
import { useGraphqlApi } from "./useGraphqlApi";
import { PopupNewElement } from "./PopupNewElement";

const UPDATE_BTN_TEXT = "Ändern";

const GraphQl = (props) => {
  const [dataType, setDataType] = useState("products");
  const [successScreen, showSuccessScreen] = useState(null);
  const [newElementForm, showNewElementForm] = useState(null);

  const { arrInput, tableData, tableColumns, fetchData } = useGraphqlApi(
    dataType
  );

  const changeScreen = () => {
    showSuccessScreen(true);
    setTimeout(() => {
      showSuccessScreen(false);
    }, 1000);
  };

  const validateSelection = (selection) => {
    if (selection.option) {
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

      {newElementForm && (
        <PopupNewElement
          show={newElementForm}
          close={() => showNewElementForm(false)}
          arrInput={arrInput}
          dataType={dataType}
          client={props.client}
          fetchData={fetchData}
        />
      )}

      {successScreen ? (
        <SuccessScreen text={`Stammdaten: ${translate(dataType)}`} />
      ) : (
        <>
          <div style={{ width: "90%", margin: "0 auto" }}>
            <MySelect
              placeholder={"Stammdaten"}
              setValue={validateSelection}
              optionData={OPTIONS_BASE_DATA}
            />
          </div>

          <Parent
            table={{
              columnsArr: tableColumns,
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
                        fetchData={fetchData}
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
              btnText: "Neu Anlegen",
              replaceFuncSubmit: {
                func: () => showNewElementForm(true),
                text: "Neu",
              },

              // middlewareValidation: [],
              // middlewareParse: [],
              // requiredArguments: [],
              cardWrapper: true,
              apiFunc: (dispatch, parameter) => fetchData(parameter),
            }}
          />
        </>
      )}
    </>
  );
};
export default withApollo(GraphQl);
