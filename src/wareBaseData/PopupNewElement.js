import React, { useState, useEffect } from "react";
import Popup from "../components/popup/Popup";
import { FormNewElement } from "./FormNewElement";
import {
  translate,
  createErrListFromApiError,
  removeErrors,
} from "../functions/utils";
import { useDispatch } from "react-redux";
import { useUpdateStore } from "../functions/hooks.js/useUpdateStore";
import { useUpdate } from "../functions/hooks.js/useUpdate";

export const PopupNewElement = (props) => {
  const dispatch = useDispatch();

  const { show, close, arrInput, dataType } = props;
  const [queryList, setQueryList] = useState(null);
  const [missingValues, setMissingValues] = useState(null);
  const { data, error, updateElement } = useUpdate({
    dataType,
    type: "post",
    queryList,
  });

  useEffect(() => {
    if (error) {
      const { errorParameter } = createErrListFromApiError(error, dispatch);

      setMissingValues(errorParameter);
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (data) {
      removeErrors(arrInput);
      close();
    }
  }, [data, close, arrInput]);

  useEffect(() => {
    if (queryList) {
      setTimeout(() => {
        updateElement();
      });
    }
  }, [queryList]);

  const runCreateMutation = async (values) => {
    setQueryList([
      {
        modelName: dataType,
        parameter: { ...values },
      },
    ]);
  };

  if (!show) return null;
  return (
    <>
      <Popup
        visible={show}
        close={close}
        marginTop="2rem"
        marginTopHeader="2rem"
        height="80vh"
        heightHeader="35%"
        headline={`Neu Anlegen: ${translate(dataType)}`}
      >
        <FormNewElement
          missingValues={missingValues}
          submit={runCreateMutation}
          {...props}
        />
      </Popup>
    </>
  );
};
