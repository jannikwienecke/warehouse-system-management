import React, { useState, useEffect } from "react";
import { ListWrapper, ButtonWrapper } from "./StylesDetailView";
import { Parent } from "../baseComponents/Parent";
import {
  useQueryBuilder,
  useUpdateStore,
} from "../functions/hooks.js/useQueryBuilder";
import { extractIdentifier } from "../functions/middleware";
import { MyButton } from "../components/button/MyButton";
import { ValidateDeleteModal } from "./ValidateDeleteModal";
import { useMutation } from "react-apollo";
import { nullMutation } from "../queries";
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
  const [queryType, setQueryType] = useState(null);
  const [queryList, setQueryList] = useState();
  const query = useQueryBuilder(queryList, queryType);
  const updateStore = useUpdateStore(dataType);

  console.log("queryType = ", queryType);

  const [updateElement, { data, error, loading }] = useMutation(query, {
    update: (cache, { data }) => {
      updateStore(cache, data, {
        action: queryType,
        currentSchema,
        id: values.id,
      });
    },
  });

  const currentSchema = useSelector((state) => state.base.currentSchema);

  useEffect(() => {
    if (queryList && query) {
      setTimeout(() => {
        console.log("RUN UPDATE........");

        updateElement();
        setRow(null);
        setValues(null);
      }, 10);
    }
  }, [query]);

  useEffect(() => {
    if (data) {
    }
  }, [data]);

  // useEffect(() => {
  //   if (mutationResult) {
  //     updateValues();
  //   }
  // }, [mutationResult]);

  const runDelete = async () => {
    const id = parseInt(values["id"]);
    setQueryType("delete");
    setQueryList([
      {
        modelName: dataType,
        parameter: { id },
      },
    ]);
  };

  const runMutation = async () => {
    const id = parseInt(values["id"]);
    setQueryType("put");
    setQueryList([
      {
        modelName: dataType,
        parameter: { id, ...updateParameter },
      },
    ]);
  };

  const updateValues = () => {
    Object.keys(mutationResult).forEach((key) => {
      if (key.includes("__type")) return;
      values[key] = mutationResult[key];
    });
    setRow(values);
    setRunFunc(null);
  };

  console.log("INPUT = ", arrInput);

  return (
    <>
      <ValidateDeleteModal
        show={validateDelete}
        close={() => setValidateDelete(false)}
        submit={runDelete}
      />
      <ListWrapper>
        <ModularForm
          fullSize={true}
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
