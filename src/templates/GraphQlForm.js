import React from "react";
import { useGraphqlApi } from "../functions/hooks.js/useGraphqlApi";
import { myDictonary } from "../functions/utils";
import ModularForm from "../components/form/ModularForm";
import { useSelector } from "react-redux";
import FormCard from "../components/form/FormCard";

export const GraphQlForm = () => {
  const { tableColumns, tableData, arrInput, fetchData } = useGraphqlApi(
    "products",
    {
      translateDict: myDictonary,
    }
  );

  return (
    <div>
      <FormCard width={90} marginTopMargin={2} color="#e3e3e3">
        <ModularForm
          colorScheme="grey"
          headline="HEADLINE"
          arrInput={arrInput}
          submitFunc={(values) => fetchData(values)}
          arrBtns={{
            btns: [
              {
                size: "md",
                variant: "dark",
                text: "Suchen",
                isSubmitFunc: true,
              },
            ],

            justifyContent: "flex-end",
            position: "top",
          }}
        />
      </FormCard>{" "}
    </div>
  );
};
