import React, { useEffect, useState } from "react";
import { useGraphqlApi } from "../../functions/hooks.js/useGraphqlApi";
import { useUpdate } from "../../functions/hooks.js/useUpdate";

export const ValidationModal = ({ tour, isSubmitted, setValues, submit }) => {
  const [mutationParameter, setMutationParameter] = useState({});

  const { data, updateElement, query } = useUpdate(mutationParameter);

  useEffect(() => {
    if (data) {
      if (submit) submit();
      setValues(null);
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

  const runMutation = () => {
    let id;
    if (tour.original) {
      id = tour.original.id;
    } else {
      id = parseInt(tour.id);
    }
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
