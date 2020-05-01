import React from "react";
import { Table } from "../../baseComponents/Table";
import { useGraphqlApi } from "../../functions/hooks.js/useGraphqlApi";
import ModularForm from "../../components/form/ModularForm";

export const FormChooseTruck = ({ setVehicle, indexLkw, vehicles }) => {
  const { arrInput, tableData, tableColumns, fetchData } = useGraphqlApi(
    "vehicles"
  );

  const setDefaultVehicle = () => {
    if (!arrInput) return;

    arrInput.forEach((input) => {
      input.size = 12;
      if (input.name === "vehicles") {
        input.default = {
          name: vehicles[indexLkw % vehicles.length].name,
          id: vehicles[indexLkw % vehicles.length].id,
        };
      }
    });
  };

  setDefaultVehicle();

  return (
    <div>
      <ModularForm
        colorScheme="grey"
        arrInput={
          arrInput
            ? arrInput.filter((input) => input.name === "vehicles")
            : arrInput
        }
        submitFunc={(values) => setVehicle(values.vehicles, indexLkw)}
      />
    </div>
  );
};
