import React from "react";
import { Table } from "../../baseComponents/Table";
import { useGraphqlApi } from "../../functions/hooks.js/useGraphqlApi";
import ModularForm from "../../components/form/ModularForm";

export const FormChooseTruck = ({ setVehicle, indexLkw }) => {
  const { arrInput, tableData, tableColumns, fetchData } = useGraphqlApi(
    "vehicles"
  );

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
