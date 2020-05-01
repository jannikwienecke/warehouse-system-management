import React from "react";
import { Table } from "../../baseComponents/Table";
import { useGraphqlApi } from "../../functions/hooks.js/useGraphqlApi";
import ModularForm from "../../components/form/ModularForm";

export const FormChooseEmployee = ({ setEmployee, indexLkw }) => {
  const { arrInput, tableData, tableColumns, fetchData } = useGraphqlApi(
    "employees"
  );

  return (
    <div>
      <ModularForm
        colorScheme="grey"
        arrInput={
          arrInput
            ? arrInput
                .filter((input) => input.name === "employees")
                .map((input) => {
                  input.size = 12;
                  return input;
                })
            : arrInput
        }
        submitFunc={(values) => setEmployee(values.employees, indexLkw)}
      />
    </div>
  );
};
