import React, { useEffect, useState } from "react";
import { useGraphqlApi } from "../../functions/hooks.js/useGraphqlApi";
import {
  useQueryBuilder,
  useUpdateStore,
} from "../../functions/hooks.js/useQueryBuilder";
import { useMutation } from "react-apollo";
import { useSelector } from "react-redux";

const useUpdate = (mutationParameter) => {};

export const ValidationModal = ({ tour, isSubmitted, setValues }) => {
  const currentSchema = useSelector((state) => state.base.currentSchema);
  const [dataType, setDataType] = useState(null);
  const { tableData, fetchData } = useGraphqlApi(dataType);
  const [mutationParameter, setMutationParameter] = useState({});

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

  useEffect(() => {
    if (data) {
      console.log("done...", data);
      if (Object.keys(data)[0].includes("updateWithdrawal")) {
        setValues(null);
      } else {
        console.log("run widthdrawals....");
        runMutationWithdrawals();
      }
    }
  }, [data]);

  useEffect(() => {
    if (mutationParameter.queryList && query) {
      setTimeout(() => {
        updateElement();
      }, 10);
    }
  }, [query]);

  useEffect(() => {
    if (isSubmitted) {
      runMutation();
    }
  }, [isSubmitted]);

  useEffect(() => {
    setDataType("withdrawals");
  }, []);

  useEffect(() => {
    if (dataType) {
      fetchData({ tours: { id: tour.original.id } });
    }
  }, [dataType]);

  const runMutationWithdrawals = () => {
    let queryList = tableData.map((withdrawal, index) => {
      return {
        modelName: "withdrawals",
        parameter: {
          id: parseInt(withdrawal.id),
          isOpen: false,
        },
        alias: "updateWithdrawals_" + index,
      };
    });

    setMutationParameter({
      type: "put",
      queryList,
      dataType: "withdrawals",
      idsToUpdate: queryList.map((query) => query.parameter.id),
    });
  };

  const runMutation = () => {
    const id = parseInt(tour.original["id"]);
    setMutationParameter({
      type: "put",
      queryList: [
        {
          modelName: "tours",
          parameter: { id, isOpen: false },
        },
      ],
      dataType: "tours",
      idsToUpdate: id,
    });
  };

  return (
    <div>
      <h1>Tour Abschließen</h1>
    </div>
  );
};
