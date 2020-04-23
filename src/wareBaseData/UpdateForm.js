import React, { useState, useEffect } from "react";
import { ListWrapper, ButtonWrapper } from "./StylesDetailView";
import { MyButton } from "../components/button/MyButton";
import { ValidateDeleteModal } from "./ValidateDeleteModal";
import ModularForm from "../components/form/ModularForm";
import { parseArrInput, isQuery } from "../functions/utils";
import { useUpdate } from "../functions/hooks.js/useUpdate";

export const UpdateForm = (props) => {
  const { setValues, setRow, dataType, arrInput, values } = props;
  const [updateParameter, setUpdateParamter] = useState(null);
  const [validateDelete, setValidateDelete] = useState(null);

  const [mutationParammeter, setMutationParameter] = useState({
    idsToUpdate: values.id,
    dataType,
  });

  const { updateElement, query } = useUpdate(mutationParammeter);

  useEffect(() => {
    if (isQuery(query)) {
      updateElement();
    }
  }, [query]);

  const onCompleted = () => {
    setRow(null);
    setValues(null);
  };

  const runMutation = (parameter, type) => {
    const id = parseInt(values["id"]);
    const queryList = [
      {
        modelName: dataType,
        parameter: { id, ...parameter },
      },
    ];
    setMutationParameter({
      ...mutationParammeter,
      type,
      queryList,
      onCompleted,
    });
  };

  const runDelete = () => {
    runMutation({}, "delete");
  };

  const runUpdate = () => {
    runMutation(updateParameter, "put");
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
          fullSize={true}
          arrInput={parseArrInput(arrInput, values, dataType)}
          submitFunc={(parameter) => setUpdateParamter(parameter)}
        />
      </ListWrapper>

      <ButtonWrapper>
        <MyButton color="#4caf50" onClick={runUpdate}>
          Speichern
        </MyButton>
        <MyButton onClick={() => setValidateDelete(true)}>Löschen</MyButton>
      </ButtonWrapper>
    </>
  );
};
