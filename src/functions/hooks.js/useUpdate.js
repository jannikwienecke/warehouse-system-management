import { useMutation } from "react-apollo";
import { useSelector } from "react-redux";
import { useQueryBuilder } from "./useQueryBuilder";
import { useUpdateStore } from "./useUpdateStore";

export const useUpdate = (mutationParameter) => {
  mutationParameter = mutationParameter ? mutationParameter : {};

  const currentSchema = useSelector((state) => state.base.currentSchema);
  const query = useQueryBuilder(
    mutationParameter.queryList,
    mutationParameter.type
  );
  const updateStore = useUpdateStore(mutationParameter.dataType);

  const [updateElement, { data, error, loading }] = useMutation(query, {
    update: (cache, { data }) => {
      updateStore(cache, data, {
        action: mutationParameter.type,
        currentSchema,
        id: mutationParameter.idsToUpdate,
      });
    },
  });

  return { updateElement, data, query };
};
