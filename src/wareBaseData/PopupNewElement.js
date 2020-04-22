import React, { useState, useEffect } from "react";

import Popup from "../components/popup/Popup";
import { Button } from "react-bootstrap";
import { FormNewElement } from "./FormNewElement";
import {
  translate,
  createErrListFromApiError,
  removeErrors,
} from "../functions/utils";
import { useQueryBuilder } from "../functions/hooks.js/useQueryBuilder";
import { useMutation } from "@apollo/react-hooks";
import { useDispatch, useSelector } from "react-redux";
import { QUERY_DICT, nullMutation } from "../queries";
import { useUpdateStore } from "../functions/hooks.js/useUpdateStore";

export const PopupNewElement = (props) => {
  const currentSchema = useSelector((state) => state.base.currentSchema);
  const { show, close, arrInput, dataType, client, fetchData } = props;
  const dispatch = useDispatch();
  const [queryList, setQueryList] = useState(null);
  const [missingValues, setMissingValues] = useState(null);
  const query = useQueryBuilder(queryList, "post");
  const updateStore = useUpdateStore(dataType);

  const [addElement, { data, error, loading }] = useMutation(query, {
    update: (cache, { data }) => {
      updateStore(cache, data, { action: "post", currentSchema });
    },
  });

  useEffect(() => {
    if (error) {
      const { errorMsg, errorParameter } = createErrListFromApiError(
        error,
        dispatch
      );

      setMissingValues(errorParameter);
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      removeErrors(arrInput);
      close();
    }
  }, [data]);

  useEffect(() => {
    if (queryList) {
      setTimeout(() => {
        addElement();
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
