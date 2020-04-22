import React, { useEffect, useRef } from "react";
import { useGraphqlApi } from "../../functions/hooks.js/useGraphqlApi";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export const SingleView = ({ tour, type, selectOpenTour }) => {
  console.log("tours", tour);
  const { arrInput, tableData, tableColumns, fetchData } = useGraphqlApi(
    "withdrawals",
    {
      parameter: { tours: { id: tour.original.id } },
    }
  );

  let previousType = usePrevious(type);

  useEffect(() => {
    if (previousType && previousType !== type) {
      selectOpenTour(null);
    }
  }, [type]);

  console.log("tableData", tableData);

  return <div>SINGLE VIEW</div>;
};
