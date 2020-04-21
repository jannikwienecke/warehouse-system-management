import { useQueryBuilder } from "./useQueryBuilder";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { findModelSchema } from "../../functions/utils";
import { useQuery } from "react-apollo";
import { setSchema, setInitData } from "../../baseComponents/store/actions";
import { INIT_TYPES } from "../../baseComponents/base";

export const useInitQuery = () => {
  const currentSchema = useSelector((state) => state.base.currentSchema);

  const [queryList, setQueryList] = useState([{ modelName: "__schema" }]);
  const [__schema, set__schema] = useState(null);
  const [loadingInitData, setLoading] = useState(true);
  const [options, setOptions] = useState({ queryName: "__schema" });

  const query = useQueryBuilder(queryList, "get", options);
  const { data, loading, error } = useQuery(query);

  const dispatch = useDispatch();

  useEffect(() => {
    if (data && data.__schema) {
      dispatch(setSchema(data.__schema));
      set__schema(data.__schema);
    } else if (data) {
      saveData();
    }
  }, [data]);

  useEffect(() => {
    if (__schema) {
      setSchemas();
    }
  }, [__schema]);

  useEffect(() => {
    if (currentSchema) {
      fetchData();
    }
  }, [currentSchema]);

  const setSchemas = () => {
    var schemaMapper = {};
    INIT_TYPES.forEach((type) => {
      const schema = findModelSchema(type, __schema);

      schemaMapper[type] = schema;
    });

    dispatch(setInitData({ currentSchema: schemaMapper }));
  };

  const fetchData = () => {
    const queryList_ = INIT_TYPES.map((type) => {
      return { modelName: type };
    });
    setOptions({});
    setQueryList(queryList_);
  };

  const saveData = () => {
    dispatch(
      setInitData({
        ...data,
      })
    );
    setLoading(false);
  };

  return { loadingInitData };
};
