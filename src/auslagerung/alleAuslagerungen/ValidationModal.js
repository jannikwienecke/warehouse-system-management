import React, { useEffect, useState } from "react";
import { useGraphqlApi } from "../../functions/hooks.js/useGraphqlApi";
import { useUpdate } from "../../functions/hooks.js/useUpdate";

export const ValidationModal = ({ tour, isSubmitted, setValues }) => {
  const [dataType, setDataType] = useState("withdrawals");
  const [mutationParameter, setMutationParameter] = useState({});

  const { tableData, fetchData } = useGraphqlApi(dataType);
  const { data, updateElement, query } = useUpdate(mutationParameter);

  useEffect(() => {
    if (data) {
      validateMutationResult();
    }
  }, [data]);

  useEffect(() => {
    if (mutationParameter.queryList && query) {
      updateElement();
    }
  }, [query]);

  useEffect(() => {
    if (isSubmitted) {
      runMutation();
    }
  }, [isSubmitted]);

  useEffect(() => {
    if (dataType) {
      fetchData({ tours: { id: tour.id } });
    }
  }, [dataType]);

  const runMutationWithdrawals = () => {
    if (tableData.length === 0) {
      setValues(null);
      return;
    }

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

  const validateMutationResult = () => {
    if (data) {
      if (Object.keys(data)[0].includes("updateWithdrawal")) {
        setValues(null);
      } else {
        runMutationWithdrawals();
      }
    }
  };

  return (
    <div>
      <h1>Tour Abschließen</h1>
    </div>
  );
};
