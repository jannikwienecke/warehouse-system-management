import React, { useEffect, useRef, useState } from "react";
import { useGraphqlApi } from "../../functions/hooks.js/useGraphqlApi";
import { TableTours } from "./TableTours";
import { TableWithdrawals } from "./TableWithdrawals";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export const SingleView = ({ tour, type, selectOpenTour }) => {
  const [dataType, setDataType] = useState(null);
  const { arrInput, tableData, tableColumns, fetchData } = useGraphqlApi(
    dataType
  );

  useEffect(() => {
    console.log("tours", tour);
    setDataType("withdrawals");
  }, []);

  useEffect(() => {
    if (dataType) {
      fetchData({ tours: { id: tour.original.id } });
    }
  }, [dataType]);

  let previousType = usePrevious(type);

  useEffect(() => {
    if (previousType && previousType !== type) {
      selectOpenTour(null);
    }
  }, [type]);

  console.log("tableData", tableData);

  return (
    <div>
      SINGLE VIEW
      <TableWithdrawals
        tableColumns={tableColumns}
        tableData={tableData}
        arrInput={arrInput}
        fetchData={fetchData}
        dataType={"withdrawals"}
        update={(openTour, x) => {
          selectOpenTour(openTour);
        }}
      />
    </div>
  );
};
