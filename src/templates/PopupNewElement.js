import React, { useState, useEffect } from "react";

import Popup from "../components/popup/Popup";
import { Button } from "react-bootstrap";
import { FormNewElement } from "./FormNewElement";
import {
  translate,
  createErrListFromApiError,
  removeErrors,
} from "../functions/utils";
import { queryBuilder, updateStore } from "../queries/queryBuilder";
import { useMutation } from "@apollo/react-hooks";
import { useDispatch, useSelector } from "react-redux";
import { nullQuery, QUERY_DICT, nullMutation } from "../queries/queries";

export const PopupNewElement = (props) => {
  const { show, close, arrInput, dataType, client, fetchData } = props;

  const dispatch = useDispatch();
  const [mutation, setMutation] = useState({ mutation: nullMutation });
  const [missingValues, setMissingValues] = useState(null);

  const [addElement, { data, error, loading }] = useMutation(
    mutation.mutation,
    mutation.options
  );

  const currentSchema = useSelector((state) => state.base.currentSchema);

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
      fetchData();
      removeErrors(arrInput);
      close();
    }
  }, [data]);

  const runCreateMutation = async (values) => {
    const mutation_ = queryBuilder(
      [
        {
          modelName: dataType,
          parameter: { ...values },
        },
      ],
      "post",
      currentSchema
    );

    setMutation({
      mutation: mutation_,
      options: {
        update: (cache, { data }) =>
          updateStore(cache, data, dataType, { action: "add", currentSchema }),
      },
    });

    setTimeout(() => {
      addElement();
    }, 10);
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
