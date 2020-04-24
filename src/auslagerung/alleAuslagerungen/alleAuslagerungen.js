import React, { useState, useEffect } from "react";
import { useGraphqlApi } from "../../functions/hooks.js/useGraphqlApi";
import { GraphQlForm } from "../../wareBaseData/GraphQlForm";
import { GraphqlTable } from "../../wareBaseData/GraphqlTable";
import { Parent } from "../../baseComponents/Parent";
import { SUB_PAGES } from "../data";
import { HeaderElement } from "../../common/HeaderElement";
import { TableTours } from "./TableTours";
import { SingleView } from "./SingleView";

let dataType = "tours";
export const Auslagerungen = ({ type, setType }) => {
  const [openTour, selectOpenTour] = useState(null);

  return (
    <>
      <HeaderElement setType={setType} type={type} sub_pages={SUB_PAGES} />

      {!openTour ? (
        <Overview type={type} selectOpenTour={selectOpenTour} />
      ) : (
        <SingleView
          type={type}
          selectOpenTour={selectOpenTour}
          tour={openTour}
        />
      )}
    </>
  );
};

const Overview = ({ selectOpenTour, type }) => {
  const { arrInput, tableData, tableColumns, fetchData } = useGraphqlApi(
    dataType
  );

  let openWithdrawals = type === "Offene Auslagerungen";

  if (tableData && tableData.length === 0) {
    return <h1>Keine Offenen Auslagerungen</h1>;
  }

  return (
    <div style={{ marginTop: "2rem" }}>
      {!openWithdrawals ? (
        <GraphQlForm
          arrInput={arrInput}
          fetchData={fetchData}
          dataType={dataType}
        />
      ) : (
        <h1>OFFENE AUSLAGERUNGEN</h1>
      )}

      <TableTours
        openWithdrawals={openWithdrawals}
        tableColumns={tableColumns}
        tableData={tableData}
        arrInput={arrInput}
        fetchData={fetchData}
        dataType={dataType}
        update={(openTour) => {
          selectOpenTour(openTour);
        }}
      />
    </div>
  );
};
