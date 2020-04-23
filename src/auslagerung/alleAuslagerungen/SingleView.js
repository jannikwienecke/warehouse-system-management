import React, { useEffect, useRef, useState } from "react";
import { useGraphqlApi } from "../../functions/hooks.js/useGraphqlApi";
import { TableTours } from "./TableTours";
import { TableWithdrawals } from "./TableWithdrawals";
import { usePrevious } from "../../functions/hooks.js/usePrevious";

const dataType = "withdrawals";
export const SingleView = ({ tour, type, selectOpenTour }) => {
  let previousType = usePrevious(type);
  const {
    arrInput,
    tableData,
    tableColumns,
    fetchData,
    refetch,
  } = useGraphqlApi(dataType, {}, { tours: { id: tour.id } });
  useEffect(() => {
    if (previousType && previousType !== type) {
      selectOpenTour(null);
    }
  }, [type]);

  // console.log("tableData", tableData);

  return (
    <div>
      <Header tour={tour} />

      <TableWithdrawals
        tableColumns={tableColumns}
        tableData={tableData}
        arrInput={arrInput}
        // fetchData={fetchData}
        dataType={"withdrawals"}
        update={(openTour, x) => {
          selectOpenTour(openTour);
        }}
        fetchData={refetch}
      />
    </div>
  );
};

const Header = ({ tour }) => {
  if (!tour) return null;

  let splitName = tour.name.split("_tour_");
  let date = splitName[0].split("_").join("-");
  let tour_number = splitName[1];
  return (
    <>
      <h1 style={{ marginTop: "3rem" }}>
        Dattum: {date} - Tour Nr. {tour_number}
      </h1>
      <h2>Mitarbeiter: {tour.employee.name}</h2>
      <h2>Fahrzeug: {tour.vehicle.name}</h2>
    </>
  );
};
