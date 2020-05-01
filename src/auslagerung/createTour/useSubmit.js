import { useUpdate } from "../../functions/hooks.js/useUpdate";
import { useState, useEffect } from "react";
import { isQuery } from "../../functions/utils";
import { useSelector } from "react-redux";

export const useSubmit = () => {
  const [mutationParammeter, setMutationParameter] = useState({});
  const [tours, setTours] = useState(null);
  const [completed, setCompleted] = useState(null);
  const { data, updateElement, query } = useUpdate(mutationParammeter);
  const customers = useSelector((state) => state.base.customers);

  useEffect(() => {
    if (data) {
      if ("createTour_0" in data) {
        createWithdrawals(data);
      } else if ("createWithdrawal_0_0" in data) {
        console.log("data = ", data);
        setCompleted(true);
      }
    }
  }, [data]);

  useEffect(() => {
    console.log("query = ", query);

    if (isQuery(query)) {
      updateElement();
    }
  }, [query]);

  const createWithdrawals = (newTours) => {
    let queryList = [];

    Object.keys(newTours).forEach((newTourAlias) => {
      const indexNewTour = parseInt(newTourAlias.split("_")[1]);
      const newTourId = newTours[newTourAlias].id;

      let tour = tours[indexNewTour];
      let subQueryList = tour.condensedOrders.map((order, indexOrder) => {
        return {
          modelName: "withdrawals",
          parameter: {
            tours: { id: newTours["createTour_" + indexNewTour].id },
            quantity: order.quantity,
            symbuildings: { id: order.buildingId },
            products: { id: order.productId },
            rows: { id: order.rowId },
            customers: {
              id: customers.find(
                (customer) => customer.customerId === "37HOSYMR00"
              ).id,
            },
          },
          alias: "createWithdrawal_" + indexNewTour + "_" + indexOrder,
        };
      });

      queryList.push(...subQueryList);
    });
    console.log("querylist", queryList);

    setMutationParameter({
      ...mutationParammeter,
      queryList,
      type: "post",
      dataType: "withdrawals",
    });
  };

  const submit = (tours) => {
    setTours(tours);
    console.log("submit...tours = ", tours);

    const queryList = tours.map((tour, index) => {
      return {
        modelName: "tours",

        parameter: {
          vehicles: { id: tour.lkw.id },
          employees: { id: tour.employee.id },
        },
        alias: "createTour_" + index,
      };
    });
    setMutationParameter({
      ...mutationParammeter,
      queryList,
      type: "post",
      dataType: "tours",
    });
  };

  return { submit, completed };
};
