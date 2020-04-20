import React, { useState, useEffect } from "react";
import { ListWrapper, ButtonWrapper } from "./StylesDetailView";
import { Parent } from "../baseComponents/Parent";
import { queryBuilder, updateStore } from "../queries/queryBuilder";
import { extractIdentifier } from "../functions/middleware";
import { MyButton } from "../components/button/MyButton";
import { ValidateDeleteModal } from "./ValidateDeleteModal";
import { useMutation } from "react-apollo";
import { nullMutation } from "../queries/queries";
import { useSelector } from "react-redux";
import { GraphQlForm } from "./GraphQlForm";
import ModularForm from "../components/form/ModularForm";

export const UpdateForm = ({
  setValues,
  setRow,
  dataType,
  arrInput,
  values,
  setRunFunc,
  fetchData,
}) => {
  const [updateParameter, setUpdateParamter] = useState(null);
  const [mutationResult, setMutationResult] = useState(null);
  const [validateDelete, setValidateDelete] = useState(null);
  const [mutation, setMutation] = useState({ mutation: nullMutation });
  const [updateElement, { data, error, loading }] = useMutation(
    mutation.mutation,
    mutation.options
  );

  const currentSchema = useSelector((state) => state.base.currentSchema);

  useEffect(() => {
    if (mutation && mutation.options) {
      updateElement();
    }
  }, [mutation]);

  useEffect(() => {
    if (data) {
      setRow(null);
      setValues(null);
      fetchData();
    }
  }, [data]);

  useEffect(() => {
    if (mutationResult) {
      updateValues();
    }
  }, [mutationResult]);

  const runDelete = async () => {
    const id = parseInt(values["id"]);
    const mutation_ = queryBuilder(
      [
        {
          modelName: dataType,
          parameter: { id },
        },
      ],
      "delete",
      currentSchema,
      ["id"]
    );
    setMutation({
      mutation: mutation_,
      options: {
        update: (cache, { data }) =>
          updateStore(cache, data, dataType, {
            action: "delete",
            id,
            currentSchema,
          }),
      },
    });
  };

  const runMutation = async () => {
    const id = parseInt(values["id"]);
    const mutation_ = queryBuilder(
      [
        {
          modelName: dataType,
          parameter: { id, ...updateParameter },
        },
      ],
      "put",
      currentSchema
    );

    setMutation({
      mutation: mutation_,
      options: {
        update: (cache, { data }) =>
          updateStore(cache, data, dataType, {
            action: "update",
            id,
            currentSchema,
          }),
      },
    });
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
      <ValidateDeleteModal
        show={validateDelete}
        close={() => setValidateDelete(false)}
        submit={runDelete}
      />
      <ListWrapper>
        <ModularForm
          arrInput={parseArrInput(arrInput, values, dataType)}
          submitFunc={(parameter) => setUpdateParamter(parameter)}
        />
      </ListWrapper>

      <ButtonWrapper>
        <MyButton color="#4caf50" onClick={runMutation}>
          Speichern
        </MyButton>
        <MyButton onClick={() => setValidateDelete(true)}>Löschen</MyButton>
      </ButtonWrapper>
    </>
  );
};

const parseArrInput = (arrInput, values, dataType) => {
  const handleInputType = (input) => {
    const { name, identifier, labelName, id } = input;
    const valueName = name.slice(0, -1);

    let identifierVal;
    let labelNameVal;

    if (typeof values[name] === "boolean") {
      identifierVal = values[name];
      labelNameVal = identifierVal ? "Ja" : "Nein";
    } else if (values[valueName]) {
      identifierVal = values[valueName][identifier];
      labelNameVal = values[valueName][labelName];
      // } else {
      //   identifierVal = values[identifier];
      //   labelNameVal = values[labelName];
    }

    input.default = {
      [identifier]: identifierVal,
      [labelName]: labelNameVal,
    };
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
