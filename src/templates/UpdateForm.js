import React, { useState, useEffect } from "react";
import { ListWrapper, ButtonWrapper } from "./StylesDetailView";
import { Parent } from "../baseComponents/Parent";
import { queryBuilder } from "../queries/queryBuilder";
import { extractIdentifier } from "../functions/middleware";
import { MyButton } from "../components/button/MyButton";

export const UpdateForm = ({
  setValues,
  setRow,
  dataType,
  arrInput,
  values,
  client,
  setRunFunc,
}) => {
  const [updateParameter, setUpdateParamter] = useState(null);
  const [mutationResult, setMutationResult] = useState(null);

  useEffect(() => {
    if (mutationResult) {
      updateValues();
    }
  }, [mutationResult]);

  const runMutation = async () => {
    console.log("IPDATE PARAMTER", updateParameter);

    const mutation = queryBuilder(
      [
        {
          modelName: dataType,
          parameter: { id: parseInt(values["id"]), ...updateParameter },
        },
      ],
      "mutation"
    );
    const result = await client.mutate({ mutation });

    // const result = await client.mutate({
    //   mutation: QUERY_DICT[dataType].update_,
    //   variables: { id: values["id"], ...updateParameter },
    // });

    // THE RELATED DATA IS ALWAYS IN THE FIRST KEY OF result.data
    const resultData = result.data[Object.keys(result.data)[0]];
    setMutationResult(resultData);
  };

  const updateValues = () => {
    Object.keys(mutationResult).forEach((key) => {
      if (key.includes("__type")) return;
      values[key] = mutationResult[key];
    });
    setRow(values);
    setRunFunc(null);
  };

  return (
    <>
      <ListWrapper>
        <Parent
          form={{
            arrInput: parseArrInput(arrInput, values, dataType),
            middlewareParse: [extractIdentifier],
            requiredArguments: [],
            cardWrapper: false,
            hideSubmitBtn: true,
            apiFunc: (dispatch, parameter) => setUpdateParamter(parameter),
          }}
        />
      </ListWrapper>
      <ButtonWrapper>
        <MyButton onClick={runMutation}>Speichern</MyButton>
      </ButtonWrapper>
    </>
  );
};

const parseArrInput = (arrInput, values, dataType) => {
  const handleInputType = (input) => {
    const { name, identifier, labelName, id } = input;

    if (typeof values[name] === "boolean") {
      input.default = {
        label: values[name] ? "Ja" : "Nein",
        value: values[name],
      };
    } else {
      const valueName = name.slice(0, -1);
      input.default = {
        [identifier]: values[valueName][id],
        [labelName]: values[valueName][labelName],
      };
    }
  };

  const loopArr = () => {
    arrInput.forEach((input) => {
      if (ignoreInputList.includes(input.name)) {
        return null;
      } else if (input.type === "input") {
        handleInputType(input);
      } else {
        input.default = values[input.name];
      }
      return arrInput_.push(input);
    });
  };

  const ignoreInputList = ["search", "id", dataType];
  let arrInput_ = [];
  loopArr();
  return arrInput_;
};
