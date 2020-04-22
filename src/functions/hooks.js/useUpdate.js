import { useMutation } from "react-apollo";
import { useSelector } from "react-redux";
import { useQueryBuilder } from "./useQueryBuilder";
import { useUpdateStore } from "./useUpdateStore";

export const useUpdate = ({
  queryList,
  type,
  onCompleted,
  dataType,
  idsToUpdate,
}) => {
  const currentSchema = useSelector((state) => state.base.currentSchema);
  const query = useQueryBuilder(queryList, type);
  const updateStore = useUpdateStore(dataType);

  // let query = query ? query :
  const [updateElement, { data, error, loading }] = useMutation(query, {
    update: (cache, { data }) => {
      updateStore(cache, data, {
        action: type,
        currentSchema,
        id: idsToUpdate,
      });
    },
    onCompleted,
  });

  return { updateElement, data, error, loading, query };
};
