import React, { useState, useEffect } from "react";
import { SUB_PAGES } from "../data";
import { mockAPI, setArrInputSize } from "../../functions/utils";
import { INPUT, COLUMNS } from "../../baseComponents/base";
import { endGreaterStart, extractIdentifier } from "../../functions/middleware";
import { Parent } from "../../baseComponents/Parent";
import { fetchAuslagerungen } from "../store";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { withApollo } from "react-apollo";
import { FEED_QUERY } from "../../layout/LayoutBase";

const columns = [
  ["url", "url"],
  COLUMNS.tour,
  COLUMNS.datetime,
  COLUMNS.customer,
  COLUMNS.product,
  COLUMNS.quantity,
  COLUMNS.row,
  COLUMNS.driver,
];

const arrInput = [
  INPUT.customers,
  INPUT.products,
  // INPUT.dateStart,
  // INPUT.dateEnd,
  INPUT.text,
];

INPUT.text.type = "text";
INPUT.text.placeholder = "url";
INPUT.text.name = "search";

setArrInputSize(arrInput, 6);

const AlleAuslagerungen = ({ setType, type, client }) => {
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    getTableData();
  }, []);
  const getTableData = async (parameter) => {
    // console.log("PARAMETER = =", parameter);
    const result = await client.query({
      query: FEED_QUERY,
      variables: { ...parameter },
    });

    console.log("log", result);
    setTableData(result.data.links);
  };

  return (
    <>
      <Parent
        header={{
          name: "Alle Auslagerunge",
          setType: setType,
          type: type,
          sub_pages: SUB_PAGES,
        }}
      />

      <Parent
        table={{
          columnsArr: columns,
          dataName: "auslagerungen",
          data: tableData,
          initFunc: (dispatch) => dispatch(fetchAuslagerungen()),
          middleware: [(data) => console.log("DATA VALIDATION")],

          clickRow: {
            func: (rowData) => <DetailView rowData={rowData} />,
            baseComponent: {
              type: "Popup",
              settings: {
                height: "80vh",
                heightHeader: "35%",
              },
            },
          },
        }}
        form={{
          formTitle: "Auslagerungen Suchen",
          arrInput: arrInput,
          middlewareValidation: [endGreaterStart],
          middlewareParse: [extractIdentifier],
          requiredArguments: [INPUT.customers.name],
          cardWrapper: true,
          apiFunc: (dispatch, parameter) => getTableData(parameter),
        }}
      ></Parent>
    </>
  );
};

export default withApollo(AlleAuslagerungen);

const DetailView = ({ name, rowData, isSubmitted }) => {
  useEffect(() => {
    console.log("SUBMIT FUNC", rowData);
  }, [isSubmitted]);

  return (
    <>
      <h1>Zusammenfassung Auslagerung</h1>
      <h3>Kunde : {rowData.original.customer_id}</h3>
    </>
  );
};
