import { useMutation } from "react-apollo";
import { useSelector, useDispatch } from "react-redux";
import { useQueryBuilder } from "./useQueryBuilder";
import { useUpdateStore } from "./useUpdateStore";
import { useEffect, useState } from "react";
import { createErrListFromApiError } from "../utils";

export const useUpdate = ({
  queryList,
  type,
  onCompleted,
  dataType,
  idsToUpdate,
}) => {
  const dispatch = useDispatch();
  const currentSchema = useSelector((state) => state.base.currentSchema);
  const query = useQueryBuilder(queryList, type);
  const updateStore = useUpdateStore(dataType);
  const [errorParameter, setErrorParameter] = useState(null);

  const [updateElement, { data, error, loading }] = useMutation(query, {
    update: (cache, { data }) => {
      updateStore(cache, data, {
        action: type,
        currentSchema,
        id: idsToUpdate,
      });
    },
    onCompleted,
    onError: (err) => {
      const { errorParameter } = createErrListFromApiError(
        err,
        dispatch,
        "Update Auslagerung: "
      );

      setErrorParameter(errorParameter);
    },
  });

  return { updateElement, data, error, loading, query, errorParameter };
};
