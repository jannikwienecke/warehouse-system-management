import React, { useState } from "react";
import { withApollo } from "react-apollo";

import { translate } from "../functions/utils";
import { Parent } from "../baseComponents/Parent";
import {
  INPUT,
  OPTIONS_BASE_DATA,
  SET_OPTIONS_BASE_DATA,
} from "../baseComponents/base";
import DetailView from "./DetailView";
import styled from "styled-components";
import { MySelect } from "../components/select/MySelect";
import { SuccessScreen } from "../common/SuccessScreen";
import { useGraphqlApi } from "../functions/hooks.js/useGraphqlApi";
import { PopupNewElement } from "./PopupNewElement";
import { GraphQlForm } from "./GraphQlForm";
import { GraphqlTable } from "./GraphqlTable";
const UPDATE_BTN_TEXT = "Ändern";

const GraphQl = (props) => {
  const [dataType, setDataType] = useState("vehicles");
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
          <div style={{ width: "90%", margin: "1rem auto" }}>
            <MySelect
              placeholder={"Stammdaten"}
              setValue={validateSelection}
              optionData={SET_OPTIONS_BASE_DATA()}
            />
          </div>

          <GraphQlForm
            arrInput={arrInput}
            fetchData={fetchData}
            showNewElementForm={showNewElementForm}
            dataType={dataType}
          />
          <GraphqlTable
            tableColumns={tableColumns}
            tableData={tableData}
            arrInput={arrInput}
            fetchData={fetchData}
            dataType={dataType}
          />
        </>
      )}
    </>
  );
};
export default withApollo(GraphQl);
