import React from "react";
import { useGraphqlApi } from "../functions/hooks.js/useGraphqlApi";
import { myDictonary, translate } from "../functions/utils";
import ModularForm from "../components/form/ModularForm";
import { useSelector } from "react-redux";
import FormCard from "../components/form/FormCard";

export const GraphQlForm = (props) => {
  const { fetchData, arrInput, showNewElementForm, dataType } = props;
  return (
    <div>
      <FormCard width={90} marginTopMargin={2} color="#e3e3e3">
        <ModularForm
          {...props}
          colorScheme="grey"
          headline={`${translate(dataType)}: Suchen`}
          arrInput={arrInput}
          submitFunc={(values) => fetchData(values)}
          arrBtns={{
            btns: [
              {
                size: "md",
                variant: "dark",
                text: "Neu Anlegen",
                isSubmitFunc: false,
                func: () => showNewElementForm(true),
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
